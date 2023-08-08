import * as React from 'react';
/* eslint-disable */
export const useMountEffect = (fn: React.EffectCallback) => React.useEffect(fn, []);
export default useMountEffect;