import { enUS_global } from "./global";
import { enUS_layout } from "./layout";
import { enUS_login } from "./login";
import { enUS_menu } from "./menu";
import { enUS_result } from "./result";
import { enUS_page } from "./page";
import { enUS_locale } from "./locale";
import { enUS_view } from "./view";
import { enUS_components } from "./components";


export default {
  ...enUS_login,
  ...enUS_global,
  ...enUS_layout,
  ...enUS_menu,
  ...enUS_result,
  ...enUS_page,
  ...enUS_locale,
  ...enUS_view,
  ...enUS_components,
};
