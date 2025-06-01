import * as Popover from '@radix-ui/react-popover'

type DropdownProps = Pick<
    Popover.PopoverContentProps,
    'sideOffset' | 'align'
> & {
    trigger: React.ReactNode
    content: React.ReactNode
}

export const Dropdown = ({trigger, content, ...props}: DropdownProps) => {
    return (
        <Popover.Root>
            <Popover.Trigger>{trigger}</Popover.Trigger>
            <Popover.Portal>
                <Popover.Content sideOffset={5} {...props}>
                    {content}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
