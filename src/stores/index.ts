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
      isDevMode() && console.info(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}