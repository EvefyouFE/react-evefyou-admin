/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Form\src\hooks\useFormProps.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { useProps } from "react-evefyou-hooks"
import { BasicFormProps } from "../props"
import { UseFormPropsReturnType } from "../types/formHooks"

export function useFormProps(props: BasicFormProps): UseFormPropsReturnType {
    return useProps(props)
}