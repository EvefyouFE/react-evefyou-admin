/*
 * @Author: EvefyouFE
 * @Date: 2023-08-05 16:34:39
 * @FilePath: \react-evefyou-admin\src\stores\index.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { useEffect } from "react";
import { MutableSnapshot, useRecoilSnapshot } from "recoil";
import { DEFAULT_APP_STATE, appAtom } from "./app";
import { isDevMode } from "@/utils/env";


export function initializeState({ set }: MutableSnapshot) {
  set(appAtom, DEFAULT_APP_STATE);
}

export function DebugObserver(): JSX.Element | null {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    isDevMode() && console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      const state = snapshot.getLoadable(node)
      isDevMode() && console.info(node.key, state);
    }
  }, [snapshot]);

  return null;
}