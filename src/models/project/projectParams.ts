import { PageReq } from "../base";

export interface ProjectReq extends PageReq {
    title?: string;
    state?: number;
    ltCreateTime?: string;
    gtCreateTime?: string;
}