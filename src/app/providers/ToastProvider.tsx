import {observer} from 'mobx-react-lite'
import * as ToastRadix from '@radix-ui/react-toast'
import type {ToastProviderProps} from '@radix-ui/react-toast'

import {Toast} from '~/shared/ui'
import {useToastState} from '~/shared/state'

export const ToastProvider = observer(({children}: ToastProviderProps) => {
    const toastState = useToastState()

    const onOpenChange = (open: boolean) => {
        if (!open) {
            toastState.setActiveToast(null)
        }
    }

    return (
        <ToastRadix.Provider swipeDirection="down">
            {children}
            {toastState.activeToast && (
                <Toast
                    toast={toastState.activeToast}
                    onOpenChange={onOpenChange}
                />
            )}
            <ToastRadix.Viewport className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 list-none outline-none flex flex-col gap-2.5 w-[400px] pb-8" />
        </ToastRadix.Provider>
    )
})
