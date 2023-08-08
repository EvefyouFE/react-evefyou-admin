import * as React from 'react';
/* eslint-disable */
export const useUnmountEffect = (fn: () => void) => React.useEffect(() => fn, []);
export default useUnmountEffect;