'use strict';

// NPM Packages
import * as request from 'request-promise-native';

// Consts
//const SESSION_COOKIE = "_session_id";
const CSRF_COOKIE = "csrf_token";

export class ProfileManager {

    protected cookieJar = request.jar();

    constructor(protected profileManagerRootUrl: string) { }

    public async authorize(macServerSessionGuid: string) {
        const result: request.FullResponse = await request.get(
            `${this.profileManagerRootUrl}/webapi/authentication/callback?auth_token=${macServerSessionGuid}`,
            {
                jar: this.cookieJar,
                followRedirect: false,
                simple: false,
                resolveWithFullResponse: true,
                timeout: 5000
            }
        );
        
        if(result.statusCode >= 200 && result.statusCode < 400) {
            return true;
        }
        else {
            throw new Error("Status code out of range.");
        }
    }

    public async doMagic(requestData: {}) {
        const csrf_token = this.cookieJar.getCookies(this.profileManagerRootUrl).find(c => c.key === CSRF_COOKIE);
        return request.post(
            `${this.profileManagerRootUrl}/webapi/magic/do_magic`,
            {
                json: true,
                body: requestData,
                headers: { "X-CSRF-Token": csrf_token ? csrf_token.value : "" },
                jar: this.cookieJar
            }
        );
    }
}