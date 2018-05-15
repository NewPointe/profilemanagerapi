'use strict';

import { createHash } from 'crypto';

export function compareCaseInsensitive(str1: string, str2: string) {
    return str1.localeCompare(str2, 'en', { 'sensitivity': 'base' })
}

export function equalsCaseInsensitive(str1: string, str2: string) {
    return compareCaseInsensitive(str1,str2) === 0;
}

export function findValue(kvArray: string[][], key: string) {
    const rslt = kvArray.find(v => compareCaseInsensitive(v[0], key) === 0);
    return rslt ? rslt[1] : void 0;
}

export function md5(data: string) {
    return createHash('md5').update(data).digest("hex");
}