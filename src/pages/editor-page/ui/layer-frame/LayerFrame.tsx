import {observer} from 'mobx-react-lite'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import {useCallback, useState} from 'react'
import type {ChangeableLayer} from '~/shared/state'
import {useEditorState} from '~/shared/state'
import type {CanvasDisplayParams} from '~/shared/types'
import {Corner, type CornerPosition} from './Corner'
import {MIN_FONT_SIZE} from '~/shared/constants'
import {tcn} from '~/shared/utils'

type LayerFrameProps = {
    selectedLayer: ChangeableLayer
    defaultFontSize: number
    canvasDisplayParams: CanvasDisplayParams
}

export const LayerFrame = observer(
    ({
        selectedLayer,
        canvasDisplayParams,
        defaultFontSize,
    }: LayerFrameProps) => {
        const editorState = useEditorState()
        const [isResizing, setIsResizing] = useState(false)
        const [initialFontSize, setInitialFontSize] = useState<number>(0)

        const fontSize = selectedLayer.fontSize ?? defaultFontSize
        const displayFontSize = fontSize * canvasDisplayParams.scale

        const displayX =
            selectedLayer.x * canvasDisplayParams.scale +
            canvasDisplayParams.canvasOffsetX
        const displayY =
            selectedLayer.y * canvasDisplayParams.scale +
            canvasDisplayParams.canvasOffsetY

        const {attributes, listeners, setNodeRef, transform, isDragging} =
            useDraggable({
                id: `layer-${selectedLayer.id}`,
                data: {
                    layer: selectedLayer,
                },
                disabled: isResizing,
            })

        const handleResizeStart = useCallback(() => {
            setIsResizing(true)
            setInitialFontSize(fontSize)
        }, [fontSize])

        const handleResizeEnd = useCallback(() => {
            setIsResizing(false)
        }, [])

        const handleResize = useCallback(
            (position: CornerPosition, deltaX: number, deltaY: number) => {
                let scaleDelta = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

                switch (position) {
                    case 'bottom-right':
                        if (deltaX < 0 || deltaY < 0) scaleDelta = -scaleDelta
                        break
                    case 'top-left':
                        if (deltaX > 0 || deltaY > 0) scaleDelta = -scaleDelta
                        break
                    case 'top-right':
                        if (deltaX < 0 || deltaY > 0) scaleDelta = -scaleDelta
                        break
                    case 'bottom-left':
                        if (deltaX > 0 || deltaY < 0) scaleDelta = -scaleDelta
                        break
                }

                const sensitivity = 1
                const fontSizeChange =
                    (scaleDelta * sensitivity) / canvasDisplayParams.scale
                const newFontSize = Math.max(
                    MIN_FONT_SIZE,
                    initialFontSize + fontSizeChange,
                )

                editorState.updateLayerFontSize(selectedLayer.id, newFontSize)
            },
            [
                initialFontSize,
                canvasDisplayParams.scale,
                editorState,
                selectedLayer.id,
            ],
        )

        const cornerClassName =
            'absolute w-3.5 h-3.5 rounded-full bg-background-white border-[2px] border-content-accent'

        return (
            <div
                ref={setNodeRef}
                className="absolute border-[2px] border-content-accent cursor-move select-none"
                style={{
                    top: displayY - displayFontSize * 0.4,
                    left: displayX - displayFontSize / 2,
                    width: displayFontSize,
                    height: displayFontSize,
                    transform: CSS.Transform.toString(transform),
                    transition:
                        isDragging || isResizing ? 'none' : 'all 0.1s ease-out',
                }}
                {...(isResizing ? {} : listeners)}
                {...attributes}
            >
                <Corner
                    className={tcn(
                        cornerClassName,
                        'cursor-nwse-resize top-[-7px] left-[-7px]',
                    )}
                    position="top-left"
                    onResize={handleResize}
                    onResizeStart={handleResizeStart}
                    onResizeEnd={handleResizeEnd}
                />
                <Corner
                    className={tcn(
                        cornerClassName,
                        'cursor-nesw-resize top-[-7px] right-[-7px]',
                    )}
                    position="top-right"
                    onResize={handleResize}
                    onResizeStart={handleResizeStart}
                    onResizeEnd={handleResizeEnd}
                />
                <Corner
                    className={tcn(
                        cornerClassName,
                        'cursor-nesw-resize bottom-[-7px] left-[-7px]',
                    )}
                    position="bottom-left"
                    onResize={handleResize}
                    onResizeStart={handleResizeStart}
                    onResizeEnd={handleResizeEnd}
                />
                <Corner
                    className={tcn(
                        cornerClassName,
                        'cursor-nwse-resize bottom-[-7px] right-[-7px]',
                    )}
                    position="bottom-right"
                    onResize={handleResize}
                    onResizeStart={handleResizeStart}
                    onResizeEnd={handleResizeEnd}
                />
            </div>
        )
    },
)
