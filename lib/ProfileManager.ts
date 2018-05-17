'use strict';

// NPM Packages
import * as request from 'request-promise-native';

export class ProfileManager {

    protected lastRemoteKeyId = 0;

    constructor(protected profileManagerRootUrl: string, protected macServerSessionGuid: string) { }

    public async doMagic(requestData: MagicRequest): Promise<MagicResult> {
        return request.post(
            {
                uri: `${this.profileManagerRootUrl}/webapi/magic/do_magic`,
                qs: { auth_token: this.macServerSessionGuid },
                body: requestData,
                json: true
            }
        );
    }

    public async doMagicForRemote(entity: MagicEntityType | string, action: MagicActionType | string, ...parameters: (string | {})[]) {
        const remoteKeyId = "_" + this.lastRemoteKeyId++;
        return this.doMagic(makeMagic(entity, action, ...parameters, remoteKeyId))
            .then(
                response => {
                    // Sanity check all the things
                    if(!response.remote) {
                        throw new Error(`Query did not return a remote.\nResponse Data:\n${response}`);
                    }
                    if(!response.remote[remoteKeyId]) {
                        throw new Error(`Remote result did not include our query. Expected to find a key of '${remoteKeyId}'.\nResponse Data:\n${response}`);
                    }
                    if(!response.remote[remoteKeyId][0] && Array.isArray(response.remote[remoteKeyId][0])) {
                        throw new Error(`Remote result is not in the expected format. Expected a double array like [[ result ]].\nResponse Data:\n${response}`);
                    }
                    const recievedEntity = response.remote[remoteKeyId][0].shift();
                    if(recievedEntity !== entity) {
                        throw new Error(`Remote result was not for the requested entity. Expected '${entity}', got '${recievedEntity}'.\nResponse Data:\n${response}`);
                    }
                    return response.remote[remoteKeyId][0];
                }
            );
    }

    public async doMagicForResult(entity: MagicEntityType | string, action: MagicActionType | string, ...parameters: (string | {})[]) {
        return this.doMagic(makeMagic(entity, action, ...parameters))
            .then(
                response => {
                    // Sanity check all the things
                    if(!response.result) {
                        throw new Error(`Query did not return a result.\nResponse Data:\n${response}`);
                    }
                    if(!response.result[entity]) {
                        throw new Error(`Result did not include our query. Expected to find a key of '${entity}'.\nResponse Data:\n${response}`);
                    }
                    return response.result[entity];
                }
            );
    }

    public async getDeviceIds(): Promise<number[]> {
        return this.doMagicForRemote(MagicEntityType.DEVICE, MagicActionType.FIND_ALL);
    }

    public async getDeviceDetails(ids: number | number[]): Promise<{}> {
        return this.doMagicForResult(MagicEntityType.DEVICE, MagicActionType.GET_DETAILS, { ids });
    }

    public async getDeviceCompleteDetails(ids: number | number[]): Promise<{}> {
        return this.doMagicForResult(MagicEntityType.DEVICE, MagicActionType.GET_COMPLETE_DETAILS, { ids });
    }
}

export interface MagicRequest {
    [key: string]: {
        [key: string]: (string | {})[][]
    }; 
}

export interface MagicResult {
    remote?: any;
    result: any;
}

export function makeMagic(entity: MagicEntityType | string, action: MagicActionType | string, ...parameters: (string | {})[]): MagicRequest {
    let magic: MagicRequest = {};
    magic[entity] = {};
    magic[entity][action] = [[...parameters]];
    return magic
}

export enum MagicEntityType {
    DEVICE = "device",
    AUTO_JOIN_PROFILE = "auto_join_profile",
    COMPLETED_LIBRARY_ITEM_TASK = "completed_library_item_task",
    DEVICE_GROUP = "device_group",
    EDU_CLASS = "edu_class",
    LIBRARY_ITEM_TASK = "library_item_task",
    SETTINGS = "settings",
    USER = "user",
    USER_GROUP = "user_group",
    XSAN_NETWORK = "xsan_network",
    UNIFIED_APPLICATION = "unified_application",
    UNIFIED_BOOK = "unified_book",
    PREFERENCE_PANE = "preference_pane"
}

export enum MagicActionType {
    FIND_ALL = "find_all",
    FIND_ALL_APPLE_TVS = "find_all_apple_tvs",
    FIND_ALL_COMPLETED = "find_all_completed",
    GET_DETAILS = "get_details",
    GET_COMPLETE_DETAILS = "get_complete_details",
    GET_SETTINGS = "get_settings",
    FIND_ME = "find_me"
}