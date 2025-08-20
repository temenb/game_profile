import { PrismaClient } from '@prisma/client';
import { publishToExchange } from "../utils/ampq";
import config from '../config/config';

const prisma = new PrismaClient();

export async function findProfile(ownerId: string) {
    return prisma.profile.findUnique({ where: { ownerId } });
}


export async function upsertProfile(ownerId: string) {

    const existing = await prisma.profile.findUnique({ where: { ownerId } });

    if (existing) {
        return existing;
    }

    const nickname = generateGuestNickname();

    const profile = await prisma.profile.upsert({
        where: { ownerId },
        create: { ownerId },
        update: { nickname },
    });

    await publishToExchange(config.rabbitmqQueueProfileCreated!, {
        profileId: profile.id,
    });
    return profile;
}

export async function getProfile(ownerId: string) {
    return prisma.profile.findUnique({
        where: { ownerId: ownerId },
    });
}


function generateGuestNickname(): string {
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
  return `Guest${randomDigits}`;
}
