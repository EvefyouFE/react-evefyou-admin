import { is, multiply } from "ramda";

export function getNumByPercent(num: number, percent: string|number) {
    try {
        if(is(String, percent)) {
            const p = percent.replace('%', '')
            if(!(/^\d+$/.test(p))) throw new Error('percent is not number')
            const percentage = parseFloat(p) / 100;
            if(percentage > 1) throw new Error('percent is over 100%')
            return multiply(num, percentage);
        } else {
            if(percent > 1) throw new Error('percent is over 100%')
            return multiply(num, percent);
        }
    } catch (error) {
        
    }
}