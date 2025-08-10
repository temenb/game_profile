import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import * as ProfileService from '../../services/profile.service';
import {Request, Response} from "express";

export const Upsert = async (
    call: grpc.ServerUnaryCall<ProfileGrpc.UpsertRequest, ProfileGrpc.ProfileResponse>,
    callback: grpc.sendUnaryData<PrfileGrpc.ProfileResponse>
) => {
    const { userId } = call.request;

    try {
        const result = await ProfileService.upsert(userId);


        callback(null, {
            profile_id: result.id,
            user_id: result.user_id,
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

export const View = async (
    call: grpc.ServerUnaryCall<ProfileGrpc.ViewRequest, ProfileGrpc.ProfileResponse>,
    callback: grpc.sendUnaryData<PrfileGrpc.ProfileResponse>
) => {
    const { userId } = call.request;

    try {
        const result = await ProfileService.view(userId);


        callback(null, {
            profile_id: result.id,
            user_id: result.user_id,
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
