import logger from "../utils/logger";
import prisma from '../utils/prisma';
import { broadcastEvent } from "../utils/kafka";

const startedAt = Date.now();

export const health = async () => {
  const [pgOk, kafkaOk] = await Promise.all([
    checkPostgres(),
    checkKafka(),
  ]);

  return {
    healthy: pgOk && kafkaOk,
    components: {
      postgres: pgOk ? 'ok' : 'fail',
      kafka: kafkaOk ? 'ok' : 'fail',
    },
  };
};

export const status = async () => {
  return {
    name: 'profile',
    version: process.env.BUILD_VERSION || 'dev',
    env: process.env.NODE_ENV || 'development',
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  };
};

export const livez = async () => {
  return {
    live: true,
  };
};

export const readyz = async () => {
  const [pgOk, kafkaOk] = await Promise.all([
    checkPostgres(),
    checkKafka(),
  ]);

  return {ready: pgOk && kafkaOk};
};

export const checkPostgres = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (err) {
    console.error('❌ Prisma/Postgres health check failed:', err);
    return false;
  }
};


export const checkKafka = async (): Promise<boolean> => {
  try {
    await broadcastEvent('healthcheck', [{ value: 'ping' }]);
    return true;
  } catch (err) {
    logger.error('❌ Kafka health check failed:', err);
    return false;
  }
};
