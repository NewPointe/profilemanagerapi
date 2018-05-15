'use strict';

import httprequest = require('request-promise-native');

export interface RequestBatch {
    type: string;
    requests: Request[];
}

export interface Request {
    type: string;
    arguments: any[];
    sessionGUID: string;
    serviceName: string;
    methodName: string;
    expandReferencedObjects: boolean;
}

export interface ResponseBatch {
    type: string;
    responses: Response[];
}

export interface Response {
    succeeded: boolean;
    executionTime: number;
    response: any;
    type: string;
    referencedObjects: any[];
    responseStatus: string;
}

export class Collabdproxy {

    constructor(protected dbProxyUrl: string, protected sessionGuid: string) { }

    public async makeRequest(request: Request) {
        return (await this.makeRequests([request]))[0];
    }

    public async makeRequests(requests: Request[]) {
        let responseBatch: ResponseBatch = JSON.parse(await httprequest(
            this.dbProxyUrl,
            {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "type": "com.apple.BatchServiceRequest",
                    "requests": requests
                }),
                timeout: 5000
            }
        ));

        // Sanity checking
        if (!responseBatch.responses) {
            throw new Error(`Invalid response from server: No responses.\n ${JSON.stringify(responseBatch, null, 4)}`);
        }
        if (responseBatch.responses.length !== requests.length) {
            throw new Error(`Invalid response from server: Expected ${requests.length} response, got ${responseBatch.responses.length}.\n ${JSON.stringify(responseBatch, null, 4)}`);
        }

        return responseBatch.responses;
    }

    public async challengeForUsername(username: string) {
        return (await this.makeRequest(
            {
                "type": "com.apple.ServiceRequest",
                "arguments": [username, true],
                "sessionGUID": this.sessionGuid,
                "serviceName": "AuthService",
                "methodName": "challengeForUsername:advanced:",
                "expandReferencedObjects": false
            }
        )).response;
    }

    public async validateUsernameAndPasswordDigest(challengeResponse: string) {
        return (await this.makeRequest(
            {
                "type": "com.apple.ServiceRequest",
                "arguments": [challengeResponse, true],
                "sessionGUID": this.sessionGuid,
                "serviceName": "AuthService",
                "methodName": "validateUsernameAndPasswordDigest:remember:",
                "expandReferencedObjects": false
            }
        )).response;
    }

}