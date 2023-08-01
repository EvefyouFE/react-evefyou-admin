import { zhCN_global } from "./global";
import { zhCN_layout } from "./layout";
import { zhCN_login } from "./login";
import { zhCN_menu } from "./menu";
import { zhCN_result } from "./result";
import { zhCN_page } from "./page";
import { zhCN_locale } from "./locale";
import { zhCN_container } from "./container";
import { zhCN_view } from "./view";
import { zhCN_components } from "./components";
import { zhCN_common } from "./common";
import { zhCN_sys } from "./sys/indext";

export default {
  ...zhCN_login,
  ...zhCN_global,
  ...zhCN_layout,
  ...zhCN_menu,
  ...zhCN_result,
  ...zhCN_page,
  ...zhCN_locale,
  ...zhCN_container,
  ...zhCN_view,
  ...zhCN_components,
  ...zhCN_common,
  ...zhCN_sys
};
