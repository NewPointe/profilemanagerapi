#!/usr/bin/env node
'use strict';

// import * as yargs from 'yargs'; // Can't use this because it breaks --help
import yargs = require('yargs');

yargs

    // Config options
    .options({
        's': {
            alias: 'server',
            demandOption: true,
            describe: 'The server to connect to.',
            type: 'string'
        },
        'u': {
            alias: 'username',
            describe: 'The username to login with.',
            type: 'string',
            conflicts: 'key',
            implies: 'password'
        },
        'p': {
            alias: 'password',
            describe: 'The password to login with.',
            type: 'string',
            conflicts: 'key',
            implies: 'username'
        },
        'k': {
            alias: 'key',
            describe: 'An existing session key to use (cc.collabd_session_guid).',
            type: 'string',
            conflicts: ['username', 'password']
        }
    })

    // Source the config.json file
    .config({
        extends: './config.json'
    })

    // Source PM_* environment variables
    .env('PM')

    // Use commands in ./commands
    .commandDir('commands')

    // Force using a command
    .demandCommand()

    // Recommend spelling fixes
    .recommendCommands()

    // Throw on invalid options/commands
    .strict()

    // Enable help
    .help('help')
    .alias('h', 'help')

    // Enable version
    .version('version')
    .alias('v', 'version')

    .parse();
