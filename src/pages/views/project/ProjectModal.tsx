import { BasicForm, BasicFormInstance, BasicFormProps } from "@/components/Form";
import { BasicModal, BasicModalProps, useModalContext } from "@/components/Modal";
import { ModalContextData, ModalInstance } from "@/components/Modal/src/typing";
import { useCompInstance } from "@/hooks";
import { formatById } from "@/locales";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { modalItems } from "./list.data";

interface ProjectModalProps {
    onSuccess: () => void;
}

export const ModalForm = () => {
    const modalFormProps: BasicFormProps = useMemo(() => ({
        baseColProps: {
            span: 24
        },
        items: modalItems,
    }), [])
    const [formRef, formInstance = {} as BasicFormInstance] = useCompInstance<BasicFormInstance>(modalFormProps)
    return (
        <BasicForm ref={formRef} name='projectmodal'/>
    )
}


export const ProjectModal = forwardRef<Partial<ModalInstance>, ProjectModalProps>((props, ref) => {
    const {
        onSuccess,
        ...rest
    } = props;
    const [isUpdate, setUpdate] = useState(false)
    const {dataMap,setOpenMap} = useModalContext();
    const [modalRef, modalInstance = {} as ModalInstance] = useCompInstance<ModalInstance>()
    const {openOkLoading, closeOkLoading, closeModal} = modalInstance;

    useImperativeHandle(ref, () => modalInstance, [modalInstance])

    useEffect(() => {
        dataMap && handleDataChange(dataMap)
    },[dataMap])

    const propsValue: BasicModalProps = {
        name: 'projectmodal',
        footerProps: {
            onOk: handleSubmit
        },
        headerProps: {
            title: isUpdate 
                ? formatById('view.edit', { target: formatById('view.project') }) 
                : formatById('view.add', { target: formatById('view.project') }) 
        },
        ...rest
    }

    async function handleSubmit() {
        try {
            //   const values = await validate();
            openOkLoading?.();
            closeModal?.();
            onSuccess?.();
        } finally {
            closeOkLoading?.();
        }
    }
    async function handleDataChange(data: ModalContextData) {
        // resetFields();
        setUpdate(!!data?.isUpdate)

        if (isUpdate) {
            //   setFieldsValue({
            //     ...data.record,
            //   });
        }
        // const treeData = await getDeptList();
        // updateSchema({
        //   field: 'parentDept',
        //   componentProps: { treeData },
        // });
    }
    return (
        <BasicModal ref={modalRef} {...propsValue} >
            <ModalForm />
        </BasicModal>
    )
})