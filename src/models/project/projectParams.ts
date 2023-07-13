import { PageReq } from "..";

export interface ProjectReq extends PageReq {
    title?: string;
    state?: number;
    ltCreateTime?: string;
    gtCreateTime?: string;
}