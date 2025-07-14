import * as Popover from '@radix-ui/react-popover'

type DropdownProps = Pick<Popover.PopoverContentProps, 'sideOffset' | 'align'> &
    Pick<Popover.PopoverProps, 'open' | 'onOpenChange'> & {
        trigger: React.ReactNode
        content: React.ReactNode
        triggerAsChild?: boolean
    }

export const Dropdown = ({
    trigger,
    content,
    open,
    onOpenChange,
    triggerAsChild = false,
    ...contentProps
}: DropdownProps) => {
    return (
        <Popover.Root open={open} onOpenChange={onOpenChange}>
            <Popover.Trigger asChild={triggerAsChild}>
                {trigger}
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content sideOffset={5} {...contentProps}>
                    {content}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
