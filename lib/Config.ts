'use strict';

export interface IConfig {
    server: string;
    username: string;
    password: string;
}

export function getConfig(argv: any) {
    const config: IConfig = require('../config.json');
    config.server = argv.server || process.env.PM_SERVER || config.server || 'http://localhost';
    config.username = argv.username || process.env.PM_USERNAME || config.username;
    config.password = argv.password || process.env.PM_PASSWORD || config.password;
    return config;
}