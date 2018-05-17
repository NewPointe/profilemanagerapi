'use strict';

import { Argv } from 'yargs';

export const command = 'wipe <id>';
export const desc = 'Wipes a group of devices';
export const builder = {};
export const handler = (argv: Argv) => {
    console.log(`Wiping device ${(argv as any).id}`);
    console.warn(`Not implimented yet`);
 };