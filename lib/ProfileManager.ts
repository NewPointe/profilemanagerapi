'use strict';

// NPM Packages
import * as request from 'request-promise-native';

// Local Libs
import * as Magic from './models/Magic';
import * as Device from './models/Device';

export class ProfileManager {

    protected lastRemoteKeyId = 0;

    constructor(protected profileManagerRootUrl: string, protected macServerSessionGuid: string) { }

    public async doMagic(requestData: Magic.Request): Promise<Magic.Result> {
        return request.post(
            {
                uri: `${this.profileManagerRootUrl}/webapi/magic/do_magic`,
                qs: { auth_token: this.macServerSessionGuid },
                body: requestData,
                json: true
            }
        );
    }

    public async doMagicForRemote(entity: Magic.EntityType | string, action: Magic.ActionType | string, ...parameters: (string | {})[]) {
        const remoteKeyId = "_" + this.lastRemoteKeyId++;
        return this.doMagic(Magic.makeMagic(entity, action, ...parameters, remoteKeyId))
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

    public async doMagicForResult(entity: Magic.EntityType | string, action: Magic.ActionType | string, ...parameters: (string | {})[]) {
        return this.doMagic(Magic.makeMagic(entity, action, ...parameters))
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
        return this.doMagicForRemote(Magic.EntityType.DEVICE, Magic.ActionType.FIND_ALL);
    }

    public async getDeviceDetails(ids: number | number[]): Promise<Device.Detail[]> {
        return this.doMagicForResult(Magic.EntityType.DEVICE, Magic.ActionType.GET_DETAILS, { ids }).then(result => result.retrieved);
    }

    public async getCompleteDeviceDetails(ids: number | number[]): Promise<Device.CompleteDetail[]> {
        return this.doMagicForResult(Magic.EntityType.DEVICE, Magic.ActionType.GET_COMPLETE_DETAILS, { ids }).then(result => result.retrieved);
    }
}