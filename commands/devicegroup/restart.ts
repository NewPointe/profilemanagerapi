'use strict';

import { Argv } from 'yargs';

import { loginProfileManager } from '../../lib/Util';

export const command = 'restart <id>';
export const desc = 'Restarts a group of devices';
export const builder = {};
export const handler = (argv: Argv) => {

    const deviceGroupId: number = (argv as any).id
    console.log(`Attempting to restart device group ${deviceGroupId}...`);

    loginProfileManager(argv).then(
        pm => {
            pm.doMagic({
                "library_item_task": {
                    "start_task": [[
                        {
                            "target_class": "DeviceGroup",
                            "target_id": deviceGroupId,
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