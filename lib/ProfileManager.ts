'use strict';

// NPM Packages
import * as request from 'request-promise-native';

export class ProfileManager {

    constructor(protected profileManagerRootUrl: string, protected macServerSessionGuid: string) { }

    public async doMagic(requestData: {}): Promise<{}> {
        return request.post(
            {
                uri: `${this.profileManagerRootUrl}/webapi/magic/do_magic`,
                qs: { auth_token: this.macServerSessionGuid },
                body: requestData,
                json: true
            }
        );
    }
}