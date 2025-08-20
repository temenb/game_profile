import server from './app';
import * as grpc from '@grpc/grpc-js';
import { createConsumer } from './consumers/userCreated.consumer';
import config from './config/config';


const PORT = config.port;

server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🚀 gRPC server running on port ${PORT}`);
});

createConsumer(config.rabbitmqExchangeUserCreated, config.rabbitmqExchangeProfileCreated);
