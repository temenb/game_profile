import dotenv from 'dotenv';
import {ProfileService} from './generated/profile';
import * as grpc from '@grpc/grpc-js';
import * as profileHandler from "./grpc/handlers/profile.handler";

dotenv.config();

const server = new grpc.Server();

server.addService(ProfileService, {
  upsert: profileHandler.upsert,
  view: profileHandler.getProfile,
  health: profileHandler.health,
  status: profileHandler.status,
  livez: profileHandler.livez,
  readyz: profileHandler.readyz,
});

export default server;
