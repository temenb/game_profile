import amqp from 'amqplib';
import { PrismaClient } from '@prisma/client';
import config from '../config/config';

const prisma = new PrismaClient();

export async function consumeUserCreated() {
    const conn = await amqp.connect(config.rabbitmqUrl);
    const channel = await conn.createChannel();
    await channel.assertQueue(config.rabbitmqQueueUserCreated, { durable: true });

    channel.consume('user.created', async (msg) => {
        if (!msg) return;

        const data = JSON.parse(msg.content.toString());
        await prisma.profile.create({
            data: {
                userId: data.userId,
                nickname: generateGuestNickname(),
            },
        });

        channel.ack(msg);
    });
}

function generateGuestNickname(): string {
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    return `Guest${randomDigits}`;
}