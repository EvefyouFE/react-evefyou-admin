import React, { JSXElementConstructor, ReactElement, RefObject, memo, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';

export type Children = ReactElement<any, string | JSXElementConstructor<any>> | null
export interface ComponentProps {
    active: boolean
    children: Children
    name: string
    renderDiv: RefObject<HTMLDivElement>
}

const KeepAliveComponent: React.FC<ComponentProps> = ({ active, children, name, renderDiv }) => {
    const [targetElement] = useState(() => document.createElement('div'))
    const activatedRef = useRef(false)
    activatedRef.current = activatedRef.current || active
    useEffect(() => {
        if (active) {
            // 渲染匹配的组件
            if (renderDiv.current?.firstChild) {
                renderDiv.current?.replaceChild(targetElement, renderDiv.current?.firstChild)
            } else {
                renderDiv.current?.appendChild(targetElement)
            }
        }
    }, [active, renderDiv, targetElement])
    useEffect(() => {
        // 添加一个id 作为标识 并没有什么太多作用 
        targetElement.setAttribute('id', name)
    }, [name, targetElement])
    // 把vnode 渲染到document.createElement('div') 里面
    return activatedRef.current ? ReactDOM.createPortal(children, targetElement) : children
}

export const KeepAliveComponentMemo = memo(KeepAliveComponent)