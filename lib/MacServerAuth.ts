'use strict';

// Built-ins
import { randomBytes } from 'crypto';

// NPM Packages
import * as request from 'request-promise-native';
import { Cookie } from 'request';
import * as authorization from '@mitmaro/http-authorization-header';

// Local Libs
import { Collabdproxy } from './Collabdproxy';
import { equalsCaseInsensitive, findValue, md5 } from './Util';

// Consts
const SERVER_CALLADB_COOKIE = "cc.collabd_session_guid";

export class MacServerAuth {

    constructor(protected serverUrl: string) { }

    protected async newSessionGuid() {

        // Create a new cookie jar
        const cookieJar = request.jar();

        const loginPage = `${this.serverUrl}/auth`;

        // GET the login page (just to get a session cookie).
        await request.get(loginPage, { jar: cookieJar });

        // Get the cookies
        const cookies: Cookie[] = cookieJar.getCookies(loginPage);

        // Find the session cookie
        const sessionCookie: Cookie | undefined = cookies.find(c => c.key === SERVER_CALLADB_COOKIE);

        if (!sessionCookie) {
            throw new Error(`Failed to get a macOS Server session cookie. Expected a cookie named '${SERVER_CALLADB_COOKIE}'.\n Recieved cookies:\n ${cookies.map(c => c.key + ": " + c.value).join("\n")}`);
        }

        return sessionCookie.value;
    }

    protected getChallengeResponse(challengeString: string, username: string, password: string) {

        // Parse the challenge
        const challenge = authorization.parse(challengeString.trim());

        // Make sure we're dealing with Digest auth
        if (!equalsCaseInsensitive(challenge.scheme, "digest")) {
            throw new Error(`Unknown challenge scheme. Expected "Digest", got "${challenge.scheme}".`);
        }

        // Make sure we got the challenge parameters
        if (!challenge.values || challenge.values.length === 0) {
            throw new Error(`No challenge parameters found.`);
        }

        // Calculate the challenge response
        const challengeRealm = findValue(challenge.values, 'realm');
        const challengeNonce = findValue(challenge.values, 'nonce');
        const challengeUri = "/";
        const challengeQoP = findValue(challenge.values, 'qop');
        const challengeNc = "00000001";
        const challengeCnonce = randomBytes(24).toString('hex');
        const challengeAlgorithm = findValue(challenge.values, 'algorithm');

        // Make sure we at least have the 'relm' and 'nonce' parameters
        if (!challengeRealm) {
            throw new Error(`No challenge realm provided.`);
        }
        if (!challengeNonce) {
            throw new Error(`No challenge nonce provided.`);
        }

        // Calculate HA1
        let HA1;
        if (!challengeAlgorithm || equalsCaseInsensitive(challengeAlgorithm, "md5")) {
            HA1 = md5(`${username}:${challengeRealm}:${password}`);
        }
        else if (equalsCaseInsensitive(challengeAlgorithm, "md5-sess")) {
            HA1 = md5(`${username}:${challengeRealm}:${password}`);
            HA1 = md5(`${HA1}:${challengeNonce}:${challengeCnonce}`);
        }
        else {
            throw new Error(`Unknown challenge algorithm: '${challengeAlgorithm}'`);
        }

        // Calculate HA2
        let HA2;
        if (!challengeQoP || equalsCaseInsensitive(challengeQoP, "auth")) {
            // HA2 = md5(challengeUri);
            // Not to spec, just copying what https://github.com/MagerValp/Profile-Manager-CLI/ does
            HA2 = md5(`AUTHENTICATE:${challengeUri}`);
        }
        else {
            throw new Error(`Unknown challenge QoP: '${challengeQoP}'`);
        }

        // Calculate response
        let challengeResponse;
        if (!challengeQoP) {
            challengeResponse = md5(`${HA1}:${challengeNonce}:${HA2}`);
        }
        else if (equalsCaseInsensitive(challengeQoP, "auth")) {
            challengeResponse = md5(`${HA1}:${challengeNonce}:${challengeNc}:${challengeCnonce}:${challengeQoP}:${HA2}`);
        }
        else {
            throw new Error(`Unknown challenge QoP: '${challengeQoP}'`);
        }

        // Build the response string
        return authorization.create(
            'Digest',
            [
                ['username', username],
                ['realm', challengeRealm],
                ['nonce', challengeNonce],
                ['uri', challengeUri],
                ['qop', challengeQoP],
                ['nc', challengeNc],
                ['cnonce', challengeCnonce],
                ['algorithm', challengeAlgorithm],
                ['response', challengeResponse]
            ] as any
        );

    }

    public async getAuthorizedSessionGuid(username: string, password: string) {

        // Get a new session guid
        const sessionGuid = await this.newSessionGuid();

        // Setup the proxy for auth
        const collabdproxy = new Collabdproxy(`${this.serverUrl}/collabdproxy`, sessionGuid);

        // Request an authentication challenge
        const challengeString = await collabdproxy.challengeForUsername(username);

        // Calculate the challenge response
        const challengeResponse = this.getChallengeResponse(challengeString, username, password);

        // Submit the challenge
        const submitReply = await collabdproxy.validateUsernameAndPasswordDigest(challengeResponse);

        // If the response was accepted, the session is now authenticated
        if (submitReply === true) {
            return sessionGuid;
        }
        else {
            throw new Error(`Problem submitting challenge response:\n ${submitReply}`);
        }
    }
}
