import { isEmpty } from "ramda"

export function isSubList(sub?: Value[], list?: Value[],): boolean {
    return !!sub?.every((v) => list?.includes(v))
}

export function converListToTree<
    Item extends object,
    IDN extends string = 'id',
    PIDN extends string = 'pId',
    ID extends number | string = number,
    T extends TreeList<Item, IDN, PIDN, ID> = TreeList<Item, IDN, PIDN, ID>,
>(list: T[], topId: ID, idName: IDN = 'id' as IDN, pIdName: PIDN = 'pId' as PIDN) {
    if (isEmpty(list)) return [];
    const topChildren: TreeNode<T>[] = []
    const pIdMap = list.reduce((acc, t) => {
        if (!acc.has(t[pIdName])) {
            acc.set(t[pIdName], [t])
        } else {
            const children = acc.get(t[pIdName])
            children?.push(t)
        }
        if (t[pIdName] === topId) {
            topChildren.push(t)
        }
        return acc
    }, new Map<ID, T[]>())
    const top = {
        children: topChildren
    } as TreeNode<T>

    const stack = [top]
    while (stack.length) {
        const pop = stack.pop() as TreeNode<T>
        const children = pop?.children
        if (children?.length) {
            for (const child of children) {
                const id = child[idName]
                const nodes = pIdMap.get(id)
                if (nodes?.length) {
                    child.children = nodes
                    stack.push(pop)
                    stack.push(child)
                    pIdMap.delete(id)
                }
            }
        }
    }
    return top.children as TreeNode<T>[]
}