import type React from 'react'
import {useCallback, useRef} from 'react'

export type CornerPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'

type CornerProps = {
    className: string
    position: CornerPosition
    onResize: (position: CornerPosition, deltaX: number, deltaY: number) => void
    onResizeStart: () => void
    onResizeEnd: () => void
}

export const Corner = ({
    className,
    position,
    onResize,
    onResizeStart,
    onResizeEnd,
}: CornerProps) => {
    const isDraggingRef = useRef(false)
    const startPosRef = useRef({x: 0, y: 0})

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            isDraggingRef.current = true
            startPosRef.current = {x: e.clientX, y: e.clientY}

            onResizeStart()

            const handleMouseMove = (moveEvent: MouseEvent) => {
                if (!isDraggingRef.current) return

                const deltaX = moveEvent.clientX - startPosRef.current.x
                const deltaY = moveEvent.clientY - startPosRef.current.y

                onResize(position, deltaX, deltaY)
            }

            const handleMouseUp = () => {
                isDraggingRef.current = false

                onResizeEnd()

                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        },
        [onResize, onResizeStart, onResizeEnd, position],
    )

    return <div className={className} onMouseDown={handleMouseDown} />
}
