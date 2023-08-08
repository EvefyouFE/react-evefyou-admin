/**
 * 增加，可带单位px
 * @param target 
 * @param delta 
 * @returns 
 */
export function increaseWithUnit(
    target: string | number,
    delta: number
): string | number {
    if (typeof target === 'number') return target + delta;
    const value = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || '';
    const unit = target.slice(value.length);
    const result = parseFloat(value) + delta;
    if (Number.isNaN(result)) return target;
    return `${result}${unit}`;
}
export function addWithUnit(
    target: string | number,
    delta: string | number
): string | number {
    if (typeof delta === 'number') return increaseWithUnit(target, delta);
    if (typeof target === 'number') return increaseWithUnit(delta, target);

    const targetValue = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || '';
    const deltaValue = delta.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || '';
    const unit = target.slice(targetValue.length);
    const result = parseFloat(targetValue) + parseFloat(deltaValue);
    if (Number.isNaN(result)) return target;
    return `${result}${unit}`;
}

export function decreaseWithUnit(
    target: string | number,
    delta: number
): string | number {
    if (typeof target === 'number') return target - delta;
    const value = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || '';
    const unit = target.slice(value.length);
    const result = parseFloat(value) - delta;
    if (Number.isNaN(result)) return target;
    return `${result}${unit}`;
}
export function subtractWithUnit(
    target: string | number,
    delta: string | number
): string | number {
    if (typeof delta === 'number') return decreaseWithUnit(target, delta);
    const deltaValue = delta.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || '';
    const unit = delta.slice(deltaValue.length);
    let result;
    if (typeof target === 'number') {
        result = target - parseFloat(deltaValue);
    } else {
        const targetValue = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || '';
        result = parseFloat(targetValue) - parseFloat(deltaValue);
    }
    if (Number.isNaN(result)) return target;
    return `${result}${unit}`;
}
export function subtractAllWithUnit(
    target: string | number,
    deltas: (string | number)[]
): string | number {
    return deltas.reduce((acc, d) => subtractWithUnit(acc, d), target)
}

export function totalWithUnit(
    arr: (string | number)[]
): string | number {
    if (!arr || arr.length === 0) return '';
    return arr.reduce((acc, val) => addWithUnit(acc, val), 0)
}
