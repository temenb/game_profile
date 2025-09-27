import dotenv from 'dotenv';
import {ProfileService} from './generated/profile';
import * as grpc from '@grpc/grpc-js';
import * as profileHandler from "./handlers/profile.handler";
import * as healthHandler from "./handlers/health.handler";

dotenv.config();

const server = new grpc.Server();

server.addService(ProfileService, {
  upsert: profileHandler.upsert,
  view: profileHandler.getProfile,
  health: healthHandler.health,
  status: healthHandler.status,
  livez: healthHandler.livez,
  readyz: healthHandler.readyz,
});

export default server;

