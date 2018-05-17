'use strict';

import { Argv } from 'yargs';

import { loginProfileManager } from '../../lib/Util';

export const command = 'info <id>';
export const desc = 'Gets the details for a device';
export const aliases = ['details']
export const builder = {};
export const handler = (argv: Argv) => {

    const deviceId: number = (argv as any).id
    console.log(`Logging in...`);

    loginProfileManager(argv).then(
        pm => {
            console.log(`Requesting details for device ${deviceId}...`);
            pm.getCompleteDeviceDetails(deviceId)
                .then(
                    success => console.dir(success),
                    fail => console.log(fail)
                );
        },
        error => {
            console.log(`Error logging into Profile Manager: ${error}`);
        }
    );
 };