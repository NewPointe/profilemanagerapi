'use strict';

import { Argv } from 'yargs';
import { confirm } from '../../lib/Util';

export const command = 'shutdown <id>';
export const desc = 'Shuts down a device';
export const builder = {};
export const handler = (argv: Argv) => {
    confirm("Are you sure?").then(
        rslt => {
            if(rslt) {
                console.log(`Shutting down device ${(argv as any).id}`);
                console.warn(`Not implimented yet`);
            }
        },
        () => {}
    );
 };