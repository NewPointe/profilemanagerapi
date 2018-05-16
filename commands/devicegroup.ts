'use strict';

import { Argv } from 'yargs';

export const command = 'devicegroup <command>';
export const desc = 'Manage device groups';
export const builder = (argv: Argv) => argv.commandDir('devicegroup');
export const handler = () => { };