import {useLayoutEffect, useState} from 'react'
import * as ToastRadix from '@radix-ui/react-toast'
import type {Toast as ToastType} from '../state/toast'
import {CloseIcon} from '../icons'

type ToastProps = {
    toast: ToastType
    onOpenChange: (open: boolean) => void
}

export const Toast = ({toast, onOpenChange}: ToastProps) => {
    const [open, setOpen] = useState(false)

    useLayoutEffect(() => {
        setOpen(true)
    }, [])

    return (
        <ToastRadix.Root
            className="flex items-center h-14 bg-background-primary border border-misc-border rounded-lg px-4 py-3"
            onOpenChange={onOpenChange}
            open={open}
        >
            <ToastRadix.Description className="flex flex-1 items-center">
                {toast.description}
            </ToastRadix.Description>
            <ToastRadix.Close className="flex items-center justify-center size-6 rounded-full bg-background-subdued cursor-pointer">
                <div className="flex items-center justify-center size-4">
                    <CloseIcon />
                </div>
            </ToastRadix.Close>
        </ToastRadix.Root>
    )
}
