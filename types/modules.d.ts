import { SortOrder, SorterResult } from "antd/es/table/interface"
import React from "react"
import { GetRecoilValue, RecoilState, RecoilValue } from "recoil"
import { RouteObject } from 'react-router'

declare global {
    declare type MGetRecoilValue = GetRecoilValue
    declare type MRecoilValue<T> = RecoilValue<T>
    declare type MRecoilState<T> = RecoilState<T>
    declare type MSortOrder = SortOrder
    declare type MSorterResult<T> = SorterResult<T>
    declare type MReactNode = React.ReactNode
    declare type MRouteObject = RouteObject
}