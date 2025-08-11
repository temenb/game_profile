import server from './app';
import * as grpc from '@grpc/grpc-js';
import { consumeUserCreated } from './consumers/userCreated.consumer';


const PORT = process.env.PORT || 3000;

server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🚀 gRPC server running on port ${PORT}`);
});

consumeUserCreated();
