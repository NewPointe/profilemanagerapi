'use strict';

import { Argv } from 'yargs';

export const command = 'enable <id>';
export const desc = 'Enables bluetooth on a group of devices';
export const builder = {};
export const handler = (argv: Argv) => {
    console.log(`Enabling bluetooth on device ${(argv as any).id}`);
    console.warn(`Not implimented yet`);
 };