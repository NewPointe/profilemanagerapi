#!/usr/bin/env node
'use strict';

// import * as yargs from 'yargs';
import yargs = require('yargs')

const argv = yargs

    // Config options
    .options({
        'server': {
            alias: 's',
            demandOption: true,
            describe: 'The server to connect to.',
            type: 'string'
        },
        'username': {
            alias: 'u',
            describe: 'The username to login with.',
            type: 'string',
            conflicts: 'key',
            implies: 'password'
        },
        'password': {
            alias: 'p',
            describe: 'The password to login with.',
            type: 'string',
            conflicts: 'key',
            implies: 'username'
        },
        'key': {
            alias: 'k',
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

    .help()
    .version()
    .argv
