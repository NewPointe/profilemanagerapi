'use strict';

import { Argv } from 'yargs';

export const command = 'rename <id> <name>';
export const desc = 'Renames a device';
export const builder = {};
export const handler = (argv: Argv) => {
    console.log(`Renaming device ${(argv as any).id} to '${(argv as any).name}'`);
    console.warn(`Not implimented yet`);
 };