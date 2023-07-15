import { useDesign, useMountEffect, useUnmountEffect } from "@/hooks";
import { MouseEventHandler, forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollContainerBase, ScrollContainerProps } from "./ScrollContainerBase";
import { classNames } from "./utils";
import './index.less'
import { addClass, removeClass, getHeight } from "@/utils";

export interface ScrollContainerMethods {
    props: ScrollContainerProps,
    refresh: () => void,
    getElement: () => HTMLElement | null,
    getContent: () => HTMLElement | null,
    getXBar: () => HTMLElement | null,
    getYBar: () => HTMLElement | null,
}

export const ScrollContainer = forwardRef<ScrollContainerMethods, ScrollContainerProps>((inProps, ref) => {
    const props = ScrollContainerBase.getProps(inProps);

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const xBarRef = useRef<HTMLDivElement>(null);
    const yBarRef = useRef<HTMLDivElement>(null);
    const isXBarClicked = useRef(false);
    const isYBarClicked = useRef(false);
    const lastPageX = useRef<number|null>(null);
    const lastPageY = useRef<number|null>(null);
    const scrollXRatio = useRef<number|null>(null);
    const scrollYRatio = useRef<number|null>(null);
    const frame = useRef<number|null>(null);
    const initialized = useRef(false);
    const {prefixCls} = useDesign('scroll-container')

    const calculateContainerHeight = () => {
        const containerStyles = getComputedStyle(containerRef.current!);
        const xBarStyles = getComputedStyle(xBarRef.current!);
        const pureContainerHeight = getHeight(containerRef.current!) - parseInt(xBarStyles.height, 10);

        if (containerStyles.maxHeight !== 'none' && pureContainerHeight === 0) {
            if (contentRef.current!.offsetHeight + parseInt(xBarStyles.height, 10) > parseInt(containerStyles.maxHeight, 10)) {
                containerRef.current!.style.height = containerStyles.maxHeight;
            } else {
                containerRef.current!.style.height =
                    contentRef.current!.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
            }
        }
    };

    const moveBar = () => {
        // horizontal scroll
        const totalWidth = contentRef.current!.scrollWidth;
        const ownWidth = contentRef.current!.clientWidth;
        scrollXRatio.current =  ownWidth / totalWidth;

        const bottom = (containerRef.current!.clientHeight - xBarRef.current!.clientHeight) * -1;


        // vertical scroll
        const totalHeight = contentRef.current!.scrollHeight;
        const ownHeight = contentRef.current!.clientHeight;
        scrollYRatio.current =  ownHeight / totalHeight;
        
        const right = (containerRef.current!.clientWidth - yBarRef.current!.clientWidth) * -1;


        frame.current =  window.requestAnimationFrame(() => {
            if (scrollXRatio.current! >= 1) {
                addClass(xBarRef.current!, 'scroll-container-hidden');
            } else {
                removeClass(xBarRef.current!, 'scroll-container-hidden');
                xBarRef.current!.style.cssText = 'width:' + Math.max(scrollXRatio.current! * 100, 10) + '%; left:' + (contentRef.current!.scrollLeft / totalWidth) * 100 + '%;bottom:' + bottom + 'px;';
            }

            if (scrollYRatio.current! >= 1) {
                addClass(yBarRef.current!, 'scroll-container-hidden');
            } else {
                removeClass(yBarRef.current!, 'scroll-container-hidden');
                yBarRef.current!.style.cssText = 'height:' + Math.max(scrollYRatio.current! * 100, 10) + '%; top: calc(' + (contentRef.current!.scrollTop / totalHeight) * 100 + '% - ' + xBarRef.current!.clientHeight + 'px);right:' + right + 'px;';
            }
        });
    };

    const onYBarMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        isYBarClicked.current =  true;
        lastPageY.current =  event.pageY;
        addClass(yBarRef.current!, 'scroll-container-grabbed');
        addClass(document.body, 'scroll-container-grabbed');

        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('mouseup', onDocumentMouseUp);
        event.preventDefault();
    };

    const onXBarMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        isXBarClicked.current =  true;
        lastPageX.current =  event.pageX;
        addClass(xBarRef.current!, 'scroll-container-grabbed');
        addClass(document.body, 'scroll-container-grabbed');

        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('mouseup', onDocumentMouseUp);
        event.preventDefault();
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
        if (isXBarClicked.current!) {
            onMouseMoveForXBar(event);
        } else if (isYBarClicked.current!) {
            onMouseMoveForYBar(event);
        } else {
            onMouseMoveForXBar(event);
            onMouseMoveForYBar(event);
        }
    };

    const onMouseMoveForXBar = (event: MouseEvent) => {
        const deltaX = event.pageX - lastPageX.current!;

        lastPageX.current =  event.pageX;

        frame.current =  window.requestAnimationFrame(() => {
            contentRef.current!.scrollLeft += deltaX / scrollXRatio.current!;
        });
    };

    const onMouseMoveForYBar = (event: MouseEvent) => {
        const deltaY = event.pageY - lastPageY.current!;

        lastPageY.current =  event.pageY;

        frame.current =  window.requestAnimationFrame(() => {
            contentRef.current!.scrollTop += deltaY / scrollYRatio.current!;
        });
    };

    const onDocumentMouseUp = () => {
        removeClass(yBarRef.current!, 'scroll-container-grabbed');
        removeClass(xBarRef.current!, 'scroll-container-grabbed');
        removeClass(document.body, 'scroll-container-grabbed');

        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);
        isXBarClicked.current =  false;
        isYBarClicked.current =  false;
    };

    const refresh = () => {
        moveBar();
    };

    useMountEffect(() => {
        moveBar();
        window.addEventListener('resize', moveBar);
        calculateContainerHeight();
        initialized.current =  true;
    });

    useUnmountEffect(() => {
        if (initialized.current!) {
            window.removeEventListener('resize', moveBar);
        }

        if (frame.current!) {
            window.cancelAnimationFrame(frame.current!);
        }
    });

    useImperativeHandle(ref, () => ({
        props,
        refresh,
        getElement: () => containerRef.current,
        getContent: () => contentRef.current,
        getXBar: () => xBarRef.current,
        getYBar: () => yBarRef.current
    }));

    const otherProps = ScrollContainerBase.getOtherProps(props);
    const className = classNames("scroll-container component clearfix",prefixCls, props.className);

    return (
        <div ref={containerRef} id={props.id} className={className} style={props.style} {...otherProps}>
            <div className="scroll-container-wrapper">
                <div ref={contentRef} className="scroll-container-content" onScroll={moveBar} onMouseEnter={moveBar}>
                    {props.children}
                </div>
            </div>
            <div ref={xBarRef} className="scroll-container-bar scroll-container-bar-x" onMouseDown={onXBarMouseDown}></div>
            <div ref={yBarRef} className="scroll-container-bar scroll-container-bar-y" onMouseDown={onYBarMouseDown}></div>
        </div>
    );
});
