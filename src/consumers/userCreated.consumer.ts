import amqp from 'amqplib';
import { PrismaClient } from '@prisma/client';
import config from '../config/config';
import getChannel from '../utils/ampq';

const prisma = new PrismaClient();

export async function consumeUserCreated() {
    const channel = await getChannel(config.rabbitmqQueueUserCreated);

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