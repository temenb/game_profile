import dotenv from 'dotenv';
import { ProfileService } from './generated/profile';
import * as grpc from '@grpc/grpc-js';
import * as profileHandler from "./grpc/handlers/profile.handler";

dotenv.config();

const server = new grpc.Server();

server.addService(ProfileService, {
    Upsert: profileHandler.upsert,
    view: profileHandler.getProfile,
});

export default server;
