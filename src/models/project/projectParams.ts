import { PageReq } from "react-evefyou-app";

export interface ProjectReq extends PageReq {
    title?: string;
    state?: number;
    ltCreateTime?: string;
    gtCreateTime?: string;
}