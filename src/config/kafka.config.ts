import dotenv from 'dotenv';
dotenv.config();

export const kafkaConfig = {
    topicUserCreated: process.env.KAFKA_TOPIC_USER_CREATED || 'user.created',
    topicProfileCreated: process.env.KAFKA_TOPIC_PROFILE_CREATED || 'profile.created',
    brokers: process.env.KAFKA_BROKERS || 'kafka:9092',
    clientId: process.env.KAFKA_CLIENT_ID || 'profile-client',
};

export default kafkaConfig;