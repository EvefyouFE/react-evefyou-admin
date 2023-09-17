import { zhCN_menu } from "./menu";
import { zhCN_locale } from "./locale";
import { zhCN_view } from "./view";
import appZhCN from 'react-evefyou-app/locales/zh_CN';
import { zhCN_components } from "./components";

export default {
  ...zhCN_menu,
  ...zhCN_locale,
  ...zhCN_view,
  ...zhCN_components,
  ...appZhCN
};
