export interface Project {
    id: number;
    key: string;
    title: string;
    description?: string;
    createTime?: string;
    state: number;
    stateDesc?: string;
}