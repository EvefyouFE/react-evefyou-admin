export default function classNames(...args: string[]): string | undefined {
    if (args) {
        let classes: string[] = [];

        for (let i = 0; i < args.length; i += 1) {
            const className = args[i];

            if (className) {
                const type = typeof className;

                if (type === 'string' || type === 'number') {
                    classes.push(className);
                } else if (type === 'object') {
                    const clses = Array.isArray(className)
                        ? className :
                        Object.entries(className).map(([key, value]) => (value ? key : null));

                    classes = clses.length ? classes.concat(clses.filter((c) => !!c)) : classes;
                }
            }
        }

        return classes.join(' ').trim();
    }

    return undefined;
}