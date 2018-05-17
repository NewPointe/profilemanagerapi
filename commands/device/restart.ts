'use strict';

import { Argv } from 'yargs';

import { loginProfileManager } from '../../lib/Util';

export const command = 'restart <id>';
export const desc = 'Restarts a device';
export const builder = {};
export const handler = (argv: Argv) => {

    const deviceId: number = (argv as any).id
    console.log(`Logging in...`);

    loginProfileManager(argv).then(
        pm => {
            console.log(`Starting restart task for device ${deviceId}...`);
            pm.doMagic({
                "library_item_task": {
                    "start_task": [[
                        {
                            "target_class": "Device",
                            "target_id": deviceId,
                            "params": {},
                            "task_type": "RestartDevice"
                        }, 
                        "something"
                    ]]
                }
            }).then(
                () => console.log("Task successfully queued."),
                fail => console.log(fail)
            );
        },
        error => {
            console.log(`Error logging into Profile Manager: ${error}`);
        }
    );

};