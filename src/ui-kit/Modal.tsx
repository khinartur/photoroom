import * as Dialog from '@radix-ui/react-dialog'
import {CloseIcon} from '../icons'
import {tcn} from '../utils/tcn'

type ModalProps = React.PropsWithChildren<{
    className?: string
    title?: string
    onClose: () => void
    mountNode: HTMLElement | null
}>

export const Modal = ({
    className,
    title,
    onClose,
    mountNode,
    children,
}: ModalProps) => {
    return (
        <Dialog.Root open>
            <Dialog.Portal container={mountNode}>
                <Dialog.Overlay
                    className="fixed inset-0 h-screen w-screen bg-background-overlay"
                    onClick={onClose}
                />
                <Dialog.Content
                    className={tcn(
                        className,
                        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-higher rounded-lg',
                        'flex flex-1 flex-col gap-8 outline-none overflow-hidden',
                    )}
                >
                    {title && (
                        <Dialog.Title className="text-content-primary text-2xl font-bold">
                            {title}
                        </Dialog.Title>
                    )}
                    <Dialog.Description className="h-full w-full">
                        {children}
                    </Dialog.Description>
                    <Dialog.Close asChild onClick={onClose}>
                        <div
                            className={tcn(
                                'absolute top-4 right-4 flex items-center justify-center rounded-full size-8 cursor-pointer',
                                'bg-background-default text-content-inverted',
                            )}
                        >
                            <div className="size-4 flex items-center justify-center">
                                <CloseIcon />
                            </div>
                        </div>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
