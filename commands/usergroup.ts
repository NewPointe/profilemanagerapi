'use strict';

import { Argv } from 'yargs';

export const command = 'usergroup <command>';
export const desc = 'Manage user groups';
export const builder = (argv: Argv) => argv.commandDir('usergroup');
export const handler = () => { };