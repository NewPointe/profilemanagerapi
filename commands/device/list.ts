'use strict';

import { Argv } from 'yargs';

import { loginProfileManager } from '../../lib/Util';

export const command = 'list';
export const desc = 'Lists all devices';
export const builder = {};
export const handler = (argv: Argv) => {

    console.log(`Logging in...`);

    loginProfileManager(argv).then(
        pm => {
            console.log(`Requesting device list...`);
            pm.getDeviceIds()
                .then(ids => pm.getDeviceDetails(ids))
                .then(
                    devices => console.table(
                        devices.map(
                            device => ({ 
                                Id: device.id,
                                Name: device.DeviceName,
                                Product: device.ProductName,
                                SerialNumber: device.SerialNumber
                            })
                        )
                    ),
                    fail => console.log(fail)
                );
        },
        error => {
            console.log(`Error logging into Profile Manager: ${error}`);
        }
    );

};