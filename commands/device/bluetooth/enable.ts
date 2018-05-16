'use strict';

import { Argv } from 'yargs';

export const command = 'enable <id>';
export const desc = 'Enables bluetooth on a device';
export const builder = {};
export const handler = (argv: Argv) => {
    console.log(`Enabling bluetooth on device ${(argv as any).id}`)
 };