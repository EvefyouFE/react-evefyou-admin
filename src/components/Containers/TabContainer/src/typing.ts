import { TabsProps } from "antd";

export type TabItem = Required<TabsProps>['items'][number];
export type TargetKey = React.MouseEvent | React.KeyboardEvent | string;