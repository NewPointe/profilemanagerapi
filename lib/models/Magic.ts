export interface Request {
    [key: string]: {
        [key: string]: (string | {})[][]
    }; 
}

export interface Result {
    remote?: any;
    result: any;
}

export enum EntityType {
    DEVICE = "device",
    AUTO_JOIN_PROFILE = "auto_join_profile",
    COMPLETED_LIBRARY_ITEM_TASK = "completed_library_item_task",
    DEVICE_GROUP = "device_group",
    EDU_CLASS = "edu_class",
    LIBRARY_ITEM_TASK = "library_item_task",
    SETTINGS = "settings",
    USER = "user",
    USER_GROUP = "user_group",
    XSAN_NETWORK = "xsan_network",
    UNIFIED_APPLICATION = "unified_application",
    UNIFIED_BOOK = "unified_book",
    PREFERENCE_PANE = "preference_pane"
}

export enum ActionType {
    FIND_ALL = "find_all",
    FIND_ALL_APPLE_TVS = "find_all_apple_tvs",
    FIND_ALL_COMPLETED = "find_all_completed",
    GET_DETAILS = "get_details",
    GET_COMPLETE_DETAILS = "get_complete_details",
    GET_SETTINGS = "get_settings",
    FIND_ME = "find_me"
}

export function makeMagic(entity: EntityType | string, action: ActionType | string, ...parameters: (string | {})[]): Request {
    let magic: Request = {};
    magic[entity] = {};
    magic[entity][action] = [[...parameters]];
    return magic
}
