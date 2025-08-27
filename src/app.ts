import dotenv from 'dotenv';
import {ProfileService} from './generated/profile';
import * as grpc from '@grpc/grpc-js';
import * as profileHandler from "./grpc/handlers/profile.handler";
import kafkaConfig, {createUserConsumerConfig} from "./config/kafka.config";
import { createConsumer } from '@shared/kafka';
import logger from '@shared/logger';
import {userCreated} from "./utils/consumers";

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

createConsumer(kafkaConfig, {
  ...createUserConsumerConfig,
  handler: userCreated,
});

export default server;
