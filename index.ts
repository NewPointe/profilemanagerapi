#!/usr/bin/env node
'use strict';

//import * as yargs from 'yargs';
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
        extends: './config.json',
        logLevel: 'verbose'
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
//    .strict()

    .help()
    .version()
    .argv

console.dir(argv);



/*
import { MacServerAuth } from './lib/MacServerAuth';
import { ProfileManager } from './lib/ProfileManager';
import { getConfig } from './lib/Config';

const config = getConfig(argv);










async function dostuff() {

    // First, get an authorized session from the macserver itself
    const macServerAuth = new MacServerAuth(config.server);
    const sessionGuid = await macServerAuth.getAuthorizedSessionGuid(config.username, config.password);

    // Then, pass that on to get an authorized session from Profile Manager
    const profileManager = new ProfileManager(`${config.server}/devicemanagement`);
    await profileManager.authorize(sessionGuid);

    // Then, do magic things :D

    // Lock a device
    await profileManager.doMagic({"library_item_task":{"start_task":[[{"target_class":"Device","target_id":28,"params":{},"task_type":"DeviceLock"},"something"]]}});

    // Locks all devices in a group
    // await profileManager.doMagic({"library_item_task":{"start_task":[[{"target_class":"DeviceGroup","target_id":23,"params":{},"task_type":"DeviceLock"},"something"]]}});

    // Restarts a device
    // await profileManager.doMagic({"library_item_task":{"start_task":[[{"target_class":"Device","target_id":28,"params":{},"task_type":"RestartDevice"},"something"]]}});

    // Restarts all devices in a group
    // await profileManager.doMagic({"library_item_task":{"start_task":[[{"target_class":"DeviceGroup","target_id":23,"params":{},"task_type":"RestartDevice"},"something"]]}});

    // Note: These are just adding tasks to be executed, there's no way to know if it succeeded or not without making another query
}

dostuff().then(
    success => console.dir(success),
    fail => console.log(fail)
);

*/