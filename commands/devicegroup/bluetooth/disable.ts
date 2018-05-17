'use strict';

import { Argv } from 'yargs';

export const command = 'disable <id>';
export const desc = 'Disables bluetooth on a group of devices';
export const builder = {};
export const handler = (argv: Argv) => {
    console.log(`Disabling bluetooth on device ${(argv as any).id}`);
    console.warn(`Not implimented yet`);
 };