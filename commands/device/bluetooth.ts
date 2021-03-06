'use strict';

import { Argv } from 'yargs';

export const command = 'bluetooth <command>';
export const desc = 'Change the bluetooth state on a device';
export const builder = (argv: Argv) => argv.commandDir('bluetooth');
export const handler = () => { };