import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    rabbitmqUrl: process.env.RABBITMQ_URL || '',
    rabbitmqQueueUserCreated: process.env.RABBITMQ_QUEUE_USER_CREATED || '',
};

export default config;
