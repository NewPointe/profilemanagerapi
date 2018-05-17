'use strict';

import { Argv } from 'yargs';

import { loginProfileManager } from '../../lib/Util';

export const command = 'lock <id>';
export const desc = 'Locks a group of devices';
export const builder = {};
export const handler = (argv: Argv) => {

    const deviceGroupId: number = (argv as any).id
    console.log(`Logging in...`);

    loginProfileManager(argv).then(
        pm => {
            console.log(`Starting lock task for device group ${deviceGroupId}...`);
            pm.doMagic({
                "library_item_task": {
                    "start_task": [[
                        {
                            "target_class": "DeviceGroup",
                            "target_id": deviceGroupId,
                            "params": {},
                            "task_type": "DeviceLock"
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