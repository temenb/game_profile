import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    rabbitmqUrl: process.env.RABBITMQ_URL || '',
    rabbitmqExchangeUserCreated: process.env.RABBITMQ_EXCHANGE_USER_CREATED || 'owner.created',
    rabbitmqExchangeProfileCreated: process.env.RABBITMQ_EXCHANGE_PROFILE_CREATED || 'profile.created',
    rabbitmqQueueProfileCreated: process.env.RABBITMQ_QUEUE_USER_CREATED_PROFILE_INIT || 'owner.created.profile.init',
};

export default config;