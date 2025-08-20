import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    rabbitmqUrl: process.env.RABBITMQ_URL || '',
    rabbitmqExchangeUserCreated: process.env.RABBITMQ_EXCHANGE_USER_CREATED || 'owner.created',
    rabbitmqQueueProfileCreated: process.env.RABBITMQ_QUEUE_PROFILE_CREATED || 'profile.created',
    rabbitmqQueueOwnerCreated: process.env.RABBITMQ_QUEUE_OWNER_CREATED || 'owner.created.profile.init',
};

export default config;