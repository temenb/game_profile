import * as grpc from '@grpc/grpc-js';
import * as ProfileGrpc from '../../generated/profile';
import * as ProfileService from '../../services/profile.service';
import {Request, Response} from "express";

export const upsert = async (
    call: grpc.ServerUnaryCall<ProfileGrpc.UpsertRequest, ProfileGrpc.ProfileResponse>,
    callback: grpc.sendUnaryData<ProfileGrpc.ProfileResponse>
) => {
    const { userId } = call.request;

    try {
        const result = await ProfileService.upsert(userId);


        callback(null, {
            profileId: result.id,
            userId: result.userId,
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
    const { userId } = call.request;

    try {
        const result = await ProfileService.getProfile(userId);
        
        if (!result) {
            throw new Error("Expected result, but got null");
        }

        callback(null, {
            profileId: result.id,
            userId: result.userId,
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
