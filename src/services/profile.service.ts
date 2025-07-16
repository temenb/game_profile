import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function findProfile(userId: string) {
    return prisma.profile.findUnique({ where: { userId } });
}

export function upsertUserProfile(userId: string, nickname: string) {
    return prisma.profile.upsert({
        where: { userId },
        update: { nickname },
        create: { userId, nickname },
    });
}
