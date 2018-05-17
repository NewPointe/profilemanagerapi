
export interface Detail {
    DeviceId?: number;
    DeviceName: string;
    IMEI?: string;
    MEID?: string;
    ProductName: string;
    SerialNumber: string;
    airplay_password?: string;
    created_at: string;
    id: number;
    identifier?: any;
    is_dep_device: boolean;
    last_checkin_time: string;
    mdm_target_type: MDMTargetType | string;
    udid: string;
    updated_at: string;
    user_id: number;
    vpp_last_invite_delivered?: string;
    vpp_last_invite_requested?: string;
    profile?: any;
    is_mac: boolean;
    is_ios: boolean;
    enrollment_state: EnrollmentState | string;
    has_complete_data: boolean;
}

export enum EnrollmentState {
    ENROLLED = 'enrolled'
}
export enum MDMTargetType {
    IOS = 'ios'
}

export interface CompleteDetail {
    BluetoothMAC: string;
    DeviceID?: any;
    DeviceName: string;
    EthernetMAC?: any;
    IMEI?: any;
    IsSupervised: boolean;
    MEID?: any;
    OSVersion: string;
    ProductName: string;
    SerialNumber: string;
    WiFiMAC: string;
    activation_lock_bypass_code: string;
    airplay_password?: any;
    assigned_dep_profile_uuid?: any;
    color?: any;
    created_at: string;
    dep_profile?: any;
    dep_profile_uuid?: any;
    first_push_time: string;
    hp_singleton_tasks: number;
    id: number;
    identifier?: any;
    is_dep_device: boolean;
    is_dep_enrolled: boolean;
    is_multi_user: boolean;
    last_auto_sync_media: string;
    last_auto_sync_profiles: string;
    last_checkin_time: string;
    last_mdm_refresh_ttl_days: number;
    last_push_time: string;
    last_update_info_time: string;
    library_item_type: string;
    lp_singleton_tasks: number;
    mdm_acl: number;
    mdm_activation_lock_bypass_code?: any;
    mdm_target_type: string;
    nn_singleton_tasks: number;
    order_name: string;
    os_version_int: number;
    pending_is_dep_enrolled: boolean;
    pending_user_id?: any;
    processing_tasks: boolean;
    push_avg_response_time: number;
    push_response_times: string;
    singleton_task_type: number;
    singleton_uuid: string;
    supported_asset_types: number;
    supported_device_type: number;
    udid: string;
    updated_at: string;
    updated_at_xid: number;
    user_id: number;
    vpp_last_invite_delivered?: any;
    vpp_last_invite_requested?: any;
    admin_session: string;
    temporary_id: number;
    profile?: any;
    is_mac: boolean;
    is_ios: boolean;
    enrollment_state: string;
    has_complete_data: boolean;
    has_FDE_PersonalRecoveryKeyCMS: boolean;
    SecurityInfo: {
        HardwareEncryptionCaps: number;
        PasscodePresent: boolean;
        PasscodeLockGracePeriod: number;
        PasscodeLockGracePeriodEnforced: number;
        PasscodeCompliantWithProfiles: boolean;
        PasscodeCompliant: boolean;
    };
    ModelName: string;
    DiagnosticSubmissionEnabled: boolean;
    VoiceRoamingEnabled: boolean;
    CertificateList: [
        {
            metadata: {
                issuer: string;
                is_root: boolean;
                CommonName: string;
                not_after: string;
                is_identity: boolean;
            };
            IsIdentity: boolean;
            CommonName: string;
            Data: string;
        }
    ];
    iTunesStoreAccountIsActive: boolean;
    ProfileRestrictions: {
        [key: string]: {}
    };
    IsDoNotDisturbInEffect: boolean;
    Books: any[];
    InstalledApplicationList: [
        {
            Name: string;
            ShortVersion: string;
            IsValidated: boolean;
            Version: string;
            Installing: boolean;
            BetaApp: boolean;
            ExternalVersionIdentifier: number;
            DynamicSize: number;
            AppStoreVendable: boolean;
            BundleSize: number;
            DeviceBasedVPP: boolean;
            Identifier: string;
            AdHocCodeSigned: boolean;
        }
    ];
    IsDeviceLocatorServiceEnabled: boolean;
    AppAnalyticsEnabled: boolean;
    BatteryLevel: number;
    CellularTechnology: number;
    IsMDMLostModeEnabled: boolean;
    GlobalRestrictions: {};
    IsRoaming: boolean;
    ManagedApplicationList: {
        [appKey: string]: {
            ManagementFlags: number;
            HasFeedback: boolean;
            IsValidated: boolean;
            Status: string;
            ExternalVersionIdentifier: number;
            HasConfiguration: boolean;
        }
    };
    BuildVersion: string;
    OrganizationInfo: {
        OrganizationEmail: string;
        OrganizationName: string;
        OrganizationMagic: string;
    };
    Model: string;
    OSUpdateStatus: [
        {
            ProductKey: string;
            Status: string;
            IsDownloaded: number;
            DownloadPercentComplete: number;
        }
    ];
    IsCloudBackupEnabled: boolean;
    DataRoamingEnabled: boolean;
    AvailableDeviceCapacity: number;
    EASDeviceIdentifier: string;
    DeviceCapacity: number;
    IsActivationLockEnabled: boolean;
    ProfileList: [
        {
            PayloadIdentifier: string;
            PayloadDisplayName: string;
            PayloadDescription?: string;
            IsEncrypted: boolean;
            HasRemovalPasscode: boolean;
            PayloadRemovalDisallowed: boolean;
            PayloadContent: [
                {
                    PayloadDisplayName: string;
                    PayloadType: string;
                    PayloadIdentifier: string;
                    PayloadVersion?: number;
                    PayloadDescription: string;
                    PayloadOrganization: string;
                }
            ];
            IsManaged: boolean;
            PayloadOrganization?: string;
            PayloadVersion: number;
            PayloadUUID: string;
        }
    ];
    certificate_metadata: [
        {
            issuer: string;
            is_root: boolean;
            CommonName: string;
            not_after: string;
            is_identity: boolean;
        }
    ];
    os_updates: any[];
    device_groups: any[];
    owner_assignable: boolean;
    admin_accounts: any[];
    device_cached_accounts: any[];
    enrollment_settings: {
        set_device_name: boolean;
        device_name_value: string;
        allow_activation_lock: string;
        created_at: string;
        dep_supervised_activation_lock: string;
        dep_unsupervised_activation_lock: string;
        id: number;
        library_item_id: number;
        updated_at: string;
        has_complete_data: boolean;
    };
    vpp_user_id?: any;
    apps: [
        {
            id: number;
            assignment_mode: string;
            installation_mode: string;
        }
    ];
    app_data: [
        {
            app_id: number;
            assigned: any[];
        }
    ];
    books: any[];
    book_data: any[];
    managed_apps: number[];
    managed_books: any[];
    has_unlock_token: boolean;
}