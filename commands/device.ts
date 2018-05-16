'use strict';

import { Argv } from 'yargs';

export const command = 'device <command>';
export const desc = 'Manage devices';
export const builder = (argv: Argv) => argv.commandDir('device');
export const handler = () => { };