/* eslint-disable */
export default class ObjectUtils {
    static getMergedProps(props: any, defaultProps: any): any {
        return { ...defaultProps, ...props };
    }

    static getDiffProps(props: any, defaultProps: any): any {
        return this.findDiffKeys(props, defaultProps);
    }

    static findDiffKeys(obj1: any, obj2: any): any {
        if (!obj1 || !obj2) {
            return {};
        }

        return Object.keys(obj1)
            .filter((key) => !obj2.hasOwnProperty(key))
            .reduce((result: any, current: any) => {
                result[current] = obj1[current];
                return result;
            }, {});
    }
}
