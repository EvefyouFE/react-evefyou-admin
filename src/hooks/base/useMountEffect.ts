import * as React from 'react';

export const useMountEffect = (fn: React.EffectCallback) => React.useEffect(fn, []);
export default useMountEffect;