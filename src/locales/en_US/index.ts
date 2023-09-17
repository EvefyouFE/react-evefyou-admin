/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:32
 * @FilePath: \react-evefyou-admin\src\locales\en-us\index.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { enUS_menu } from "./menu";
import { enUS_locale } from "./locale";
import { enUS_view } from "./view";
import { enUS_components } from "./components";
import appEnUS from 'react-evefyou-app/locales/en_US';


export default {
  ...enUS_menu,
  ...enUS_locale,
  ...enUS_view,
  ...enUS_components,
  ...appEnUS
};
