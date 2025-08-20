import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import * as ProfileService from '../../services/profile.service';
import * as heathService from '../../services/health.service';

export const callbackError = (callback: grpc.sendUnaryData<any>, err: unknown) => {
    const message = err instanceof Error ? err.message : 'Unknown error';
    callback({ code: grpc.status.INTERNAL, message }, null);
};


export const upsert = async (
    call: grpc.ServerUnaryCall<ProfileGrpc.UpsertRequest, ProfileGrpc.ProfileResponse>,
    callback: grpc.sendUnaryData<ProfileGrpc.ProfileResponse>
) => {
    const { ownerId } = call.request;

    try {
        const result = await ProfileService.upsertProfile(ownerId);

        callback(null, {
            profileId: result.id,
            ownerId: result.ownerId,
            nickname: result.nickname,
            level: result.level,
            rating: result.rating,
            experience: result.experience,
        });

    } catch (err: any) {
        callback({
            code: grpc.status.INTERNAL,
            message: err.message,
        }, null);
    }
};

export const getProfile = async (
    call: grpc.ServerUnaryCall<ProfileGrpc.ViewRequest, ProfileGrpc.ProfileResponse>,
    callback: grpc.sendUnaryData<ProfileGrpc.ProfileResponse>
) => {
    const { ownerId } = call.request;

    try {
        const result = await ProfileService.getProfile(ownerId);
        
        if (!result) {
            throw new Error("Expected result, but got null");
        }

        callback(null, {
            profileId: result.id,
            ownerId: result.ownerId,
            nickname: result.nickname,
            level: result.level,
            rating: result.rating,
            experience: result.experience,
        });

    } catch (err: any) {
        callback({
            code: grpc.status.INTERNAL,
            message: err.message,
        }, null);
    }
};

export const health = async (
  call: grpc.ServerUnaryCall<ProfileGrpc.Empty, ProfileGrpc.HealthReport>,
  callback: grpc.sendUnaryData<ProfileGrpc.HealthReport>
) => {
    try {
        const response = await heathService.health();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};

export const status = async (
  call: grpc.ServerUnaryCall<ProfileGrpc.Empty, ProfileGrpc.StatusInfo>,
  callback: grpc.sendUnaryData<ProfileGrpc.StatusInfo>
) => {
    try {
        const response = await heathService.status();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};

export const livez = async (
  call: grpc.ServerUnaryCall<ProfileGrpc.Empty, ProfileGrpc.LiveStatus>,
  callback: grpc.sendUnaryData<ProfileGrpc.LiveStatus>
) => {
    try {
        const response = await heathService.livez();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};

export const readyz = async (
  call: grpc.ServerUnaryCall<ProfileGrpc.Empty, ProfileGrpc.ReadyStatus>,
  callback: grpc.sendUnaryData<ProfileGrpc.ReadyStatus>
) => {
    try {
        const response = await heathService.readyz();

        callback(null, response);

    } catch (err: any) {
        callbackError(callback, err);
    }
};
