'use strict';

import { Argv } from 'yargs';

import { loginProfileManager } from '../../lib/Util';

const CONSOLE_WIDTH = 80;

export const command = 'info <id>';
export const desc = 'Gets the details for a device';
export const aliases = ['details']
export const builder = {};
export const handler = (argv: Argv) => {

    const deviceId: number = (argv as any).id
    console.log(`Logging in...`);

    loginProfileManager(argv).then(
        pm => {
            console.log(`Requesting details for device ${deviceId}...`);
            pm.getCompleteDeviceDetails(deviceId)
                .then(
                    devices => {
                        for (const device of devices) {
                            console.log(padRepeatText("┌─", "─", "─┐"));
                            console.log(padCenterText("│ ", device.DeviceName, " │"));
                            console.log(padRepeatText("├─", "─", "─┤"));
                            console.log(padCenterText("│ ", "General Info", " │"));
                            console.log(padRepeatText("│ ", " ", " │"));
                            console.log([
                                `Type:                    ${device.ModelName}`,
                                `Capacity:                ${device.DeviceCapacity ? device.DeviceCapacity.toFixed(2) : "Unknown"}`,
                                `Software Version:        ${device.OSVersion}`,
                                `Software Build Version:  ${device.BuildVersion}`,
                                `Serial Number:           ${device.SerialNumber}`,
                                `User Id:                 ${device.user_id}`,
                                `Supervised:              ${device.IsSupervised}`,
                                `Shared:                  ${device.is_multi_user}`,
                            ].map(x => padLeftText("│     ", x, " │")).join("\n"));
                            console.log(padRepeatText("├─", "─", "─┤"));
                            console.log(padCenterText("│ ", "Details", " │"));
                            console.log(padRepeatText("│ ", " ", " │"));
                            console.log([
                                `UDID:                    ${device.udid}`,
                                `Wi-Fi MAC:               ${device.WiFiMAC}`,
                                `Bluetooth MAC:           ${device.BluetoothMAC}`,
                                `Model Number:            ${device.Model}`,
                                `Last Checkin Time:       ${device.last_checkin_time ? new Date(device.last_checkin_time).toLocaleString() : "Never"}`,
                                `Available Capacity:      ${device.AvailableDeviceCapacity ? device.AvailableDeviceCapacity.toFixed(2) : "Unknown" }`,
                                `Remaining Battery Life:  ${(device.BatteryLevel * 100).toFixed(0)}%`,
                                `Signed in to iTunes:     ${device.iTunesStoreAccountIsActive}`,
                                `iCloud Backup:           ${device.IsCloudBackupEnabled}`,
                                `Last iCloud Backup:      TODO`,
                                `Do Not Disturb:          ${device.IsDoNotDisturbInEffect}`,
                                `Personal Hotspot:        TODO`,
                                `Lost Mode Enabled:       ${device.IsMDMLostModeEnabled}`,
                                `Diagnostics & Usage:     ${device.DiagnosticSubmissionEnabled}`,
                                `App Analytics:           ${device.AppAnalyticsEnabled}`,
                            ].map(x => padLeftText("│     ", x, " │")).join("\n"));
                            console.log(padRepeatText("├─", "─", "─┤"));
                            console.log(padCenterText("│ ", "TODO", " │"));
                            console.log(padRepeatText("└─", "─", "─┘"));
                        }
                    },
                    fail => console.log(fail)
                );
        },
        error => {
            console.log(`Error logging into Profile Manager: ${error}`);
        }
    );
 };


 function padCenterText(left: string, text: string, right: string, maxWidth: number = CONSOLE_WIDTH) {
    const workingWidth = Math.max(0, maxWidth - (left.length + right.length));
    const padding = Math.max(0, workingWidth - text.length) / 2;
    const paddingLeft = Math.floor(padding);
    const paddingRight = Math.ceil(padding);
    return left + " ".repeat(paddingLeft) + text + " ".repeat(paddingRight) + right;
 }

 function padLeftText(left: string, text: string, right: string, maxWidth: number = CONSOLE_WIDTH) {
    const workingWidth = Math.max(0, maxWidth - (left.length + right.length));
    const padding = Math.max(0, workingWidth - text.length);
    return left + text + " ".repeat(padding) + right;
 }
 function padRepeatText(left: string, text: string, right: string, maxWidth: number = CONSOLE_WIDTH) {
    const workingWidth = Math.max(0, maxWidth - (left.length + right.length));
    const repeatCount = Math.ceil( workingWidth / text.length );
    return left + text.repeat(repeatCount) + right;
 }