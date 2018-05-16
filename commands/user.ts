'use strict';

import { Argv } from 'yargs';

export const command = 'user <command>';
export const desc = 'Manage users';
export const builder = (argv: Argv) => argv.commandDir('user');
export const handler = () => { };