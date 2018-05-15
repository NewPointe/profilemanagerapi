#!/usr/bin/env node
'use strict';

import { MacServerAuth } from './lib/MacServerAuth';
import { ProfileManager } from './lib/ProfileManager';

const SERVER_ROOT = "https://npmdm.newpointe.org";
const PROFILEMANAGER_ROOT = `${SERVER_ROOT}/devicemanagement`;

const config = require('./config.json');

async function dostuff() {

    // First, get an authorized session from the macserver itself
    const macServerAuth = new MacServerAuth(SERVER_ROOT);
    const sessionGuid = await macServerAuth.getAuthorizedSessionGuid(config.username, config.password);

    // Then, pass that on to get an authorized session from Profile Manager
    const profileManager = new ProfileManager(PROFILEMANAGER_ROOT);
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