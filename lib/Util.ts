'use strict';

import { createHash } from 'crypto';
import { createInterface } from "readline";

import { ProfileManager } from './ProfileManager';
import { MacServerAuth } from './MacServerAuth';

export function compareCaseInsensitive(str1: string, str2: string) {
    return str1.localeCompare(str2, 'en', { 'sensitivity': 'base' })
}

export function equalsCaseInsensitive(str1: string, str2: string) {
    return compareCaseInsensitive(str1,str2) === 0;
}

export function findValue(kvArray: string[][], key: string) {
    const rslt = kvArray.find(v => compareCaseInsensitive(v[0], key) === 0);
    return rslt ? rslt[1] : void 0;
}

export function md5(data: string) {
    return createHash('md5').update(data).digest("hex");
}

export async function prompt(question: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question, answer => {
            rl.close();
            if (!answer || answer.trim().length === 0) {
                reject(new Error("No response"));
            }
            else {
                resolve(answer);
            }
        });
    });
}

export async function confirm(question: string, defaultChoice?: boolean, maxTries: number = 4): Promise<boolean> {
    const hasDefault = typeof defaultChoice !== 'undefined' && defaultChoice !== null;
    const prompt = hasDefault ? (defaultChoice ? "(Y/n)" : "(y/N)") : "(y/n)";

    return new Promise<boolean>((resolve, reject) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question + " " + prompt, answer => {
            rl.close();

            if (answer && (equalsCaseInsensitive(answer, 'y') || equalsCaseInsensitive(answer, 'yes'))) {
                resolve(true);
            }
            else if (answer && (equalsCaseInsensitive(answer, 'n') || equalsCaseInsensitive(answer, 'no'))) {
                resolve(false);
            }
            else {
                if (!hasDefault) {
                    if(maxTries < 0) {
                        reject(new Error("Too many tries"));
                    }
                    else {
                        resolve(confirm(question, defaultChoice, maxTries--));
                    }
                }
                else {
                    resolve(defaultChoice);
                }
            }
        });
    });
}

export async function loginProfileManager(options: any) {
    if(!options.key) {
        const macServerAuth = new MacServerAuth(options.server);
        options.key = await macServerAuth.getAuthorizedSessionGuid(options.username, options.password);
    }
    const profileManager = new ProfileManager(`${options.server}/devicemanagement`);
    await profileManager.authorize(options.key);
    return profileManager;
}