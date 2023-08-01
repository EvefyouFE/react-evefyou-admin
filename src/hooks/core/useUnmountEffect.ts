import * as React from 'react';

export const useUnmountEffect = (fn: () => void) => React.useEffect(() => fn, []);
export default useUnmountEffect;