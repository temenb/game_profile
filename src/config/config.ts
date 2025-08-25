import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    kafkaTopicUserCreated: process.env.KAFKA_TOPIC_USER_CREATED || 'user.created',
    kafkaTopicProfileCreated: process.env.KAFKA_TOPIC_PROFILE_CREATED || 'profile.created',
    kafkaBrokers: process.env.KAFKA_BROKERS || 'kafka:9092',
    kafkaClientId: process.env.KAFKA_CLIENT_ID || 'profile-client',
};

export default config;