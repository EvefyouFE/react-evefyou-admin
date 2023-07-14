/** user's device */
export enum DeviceTypeEnum {
    /** telephone */
    MOBILE = 'MOBILE',
    /** computer */
    DESKTOP = 'DESKTOP'
}

export type Device = keyof typeof DeviceTypeEnum;