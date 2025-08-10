import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function findProfile(userId: string) {
    return prisma.profile.findUnique({ where: { userId } });
}

export function upsert(userId: string) {
    return prisma.profile.upsert({
        where: { userId },
        create: { userId },
    });
}

export function upsert(userId: string, nickname: string) {
    return prisma.profile.findUnique({
        where: { user_id: userId },
    });
}
