import {logger} from '@shared/logger';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function seedProfiles() {
  const profiles = await Promise.all(
    [...Array(100)].map(async (_, i) => ({
      id: `user-${i + 1}`,
      ownerId: `profile-${i + 1}`,
      nickname: `Guest${i + 1}`,
      level: 1,
    }))
  );

  // Создаём профили только если их ещё нет
  for (const profile of profiles) {
    const exists = await prisma.profile.findUnique({ where: { id: profile.id } });
    if (!exists) {
      await prisma.profile.create({ data: profile });
    }
  }

  logger.log('👤 Profiles are created');
}
