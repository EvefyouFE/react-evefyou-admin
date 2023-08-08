import {
    useEffect,
    useMemo,
    useState
} from 'react';
import { ConfigurableWindow, defaultWindow } from '../configurable';

export const useMediaQuery = (
    query: string,
    options: ConfigurableWindow = {}
) => {
    const { window = defaultWindow } = options;
    const isSupported = useMemo(
        () =>
            window &&
            'matchMedia' in window &&
            typeof window.matchMedia === 'function',
        [window]
    );

    const [matches, setMatches] = useState(false);

    useEffect(() => {
        let mediaQuery: MediaQueryList | undefined;
        let updateMatches = () => { };
        if (isSupported) {
            updateMatches = () => {
                mediaQuery = window!.matchMedia(query);
                setMatches(!!mediaQuery?.matches)
            };
            updateMatches();
            mediaQuery &&
                'addEventListener' in mediaQuery &&
                mediaQuery.addEventListener('change', updateMatches);
        }
        return () => {
            if (isSupported) {
                mediaQuery &&
                    'removeEventListener' in mediaQuery &&
                    mediaQuery.removeEventListener('change', updateMatches);
            }
        };
    }, [isSupported, query, window]);

    return matches;
};
export default useMediaQuery;