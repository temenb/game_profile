import { getChannel, getConnection } from '../utils/ampq';
import { upsertProfile } from '../services/profile.service'
import { publishToQueue } from '../utils/ampq';
import logger from "../utils/logger";
import config from "../config/config";

export async function createConsumer(event: string, queue: string) {
    const channel = await getChannel();

    await channel.assertExchange(event, 'fanout', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, event, '');
    await channel.prefetch(5);

    await channel.consume(queue, async (msg) => {
        if (!msg) return;

        try {
            const data = JSON.parse(msg.content.toString());
            if (!data.ownerId) throw new Error('Missing ownerId');

            const profile = await upsertProfile(data.ownerId);
            logger.log(`[${queue}] Processed ownerId=${data.ownerId}`);
            channel.ack(msg);

        } catch (err) {
            logger.error(`[${queue}] Error:`, err);
            channel.nack(msg, false, true); // включаем повторную доставку
        }
    });

    process.on('SIGINT', async () => {
        console.log(`[!] Shutting down "${queue}" consumer...`);
        await channel.close();
        const connection = await getConnection();
        connection.close();
        process.exit(0);
    });
}