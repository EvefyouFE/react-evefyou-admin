import { RoleEnum } from "@/enums";

export type Role = `${RoleEnum}`;

export interface LoginByUsernameReq {
    username: string,
    password: string,
}
export interface LoginByMessageReq {
    mobile: string,
    captcha: string,
}


export interface LoginRes {
    /** auth token */
    token: string;
    username: string;
    role: Role;
}