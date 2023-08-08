import { useUpdate } from 'ahooks'
import { equals, filter, findIndex, isNil, map, propEq } from 'ramda'
import {
    createContext,
    memo,
    useMemo,
    useRef
} from 'react'
import { useLocation } from 'react-router'
import { Children, KeepAliveComponentMemo as KeepAliveComponent } from './KeepAliveComponent'

export interface Context {
    destroy: (params: string[], render?: boolean) => void,
    isActive: boolean
}
export const KeepAliveContext = createContext<Context>({ destroy: () => { }, isActive: false })
interface Props {
    includes?: Array<string>
    excludes?: Array<string>
    maxLen?: number
    children: Children
    active?: boolean
}

const KeepAlive = ({ children, excludes, includes, maxLen = 5, active = true }: Props,) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const components = useRef<Array<{ name: string; ele: Children }>>([])
    const { pathname } = useLocation()
    const update = useUpdate()

    // 如果没有配置include，exclude 则不缓存
    if (isNil(excludes) && isNil(includes)) {
        components.current = [
            {
                name: pathname,
                ele: children,
            }
        ]
    } else {
        // 缓存超过上限的 干掉第一个缓存
        if (components.current.length >= maxLen) {
            components.current = components.current.slice(1)
        }
        components.current = filter(({ name }) => {
            if (excludes && excludes.includes(name)) {
                return false
            }
            if (includes) {
                return includes.includes(name)
            }
            return true
        }, components.current)
        const component = components.current.find((res) => equals(res.name, pathname))
        if (isNil(component)) {
            components.current = [
                ...components.current,
                {
                    name: pathname,
                    ele: children,
                },
            ]
        }
    }

    const activeIndex = findIndex(propEq('name', pathname))(components.current)
    const context = useMemo(() => {
        // 销毁缓存的路由 
        function destroy(params: string[], render = false) {
            components.current = filter(({ name }) => {
                if (params.includes(name)) {
                    return false
                }
                return true
            }, components.current)
            // 是否需要立即刷新 一般是不需要的
            if (render) {
                update()
            }
        }
        return {
            destroy,
            isActive: activeIndex !== -1
        }
    }, [activeIndex, update])

    if (!active) return children
    return (
        <>
            <div ref={containerRef} className="keep-alive" />
            <KeepAliveContext.Provider value={context}>
                {map(
                    ({ name, ele }) => (
                        <KeepAliveComponent active={equals(name, pathname)} renderDiv={containerRef} name={name} key={name} >
                            {ele}
                        </KeepAliveComponent>
                    ),
                    components.current
                )}
            </KeepAliveContext.Provider >
        </>
    )
}

export const KeepAliveMemo = memo(KeepAlive)