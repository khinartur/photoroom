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
import {useLayerFramePosition} from '../../hooks'

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

        const fontSize = selectedLayer.fontSize ?? defaultFontSize
        const framePosition = useLayerFramePosition(
            selectedLayer,
            canvasDisplayParams,
            defaultFontSize,
        )

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
        }, [])

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
                    fontSize + fontSizeChange,
                )

                editorState.updateLayerFontSize(selectedLayer.id, newFontSize)
            },
            [
                fontSize,
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
                    top: framePosition.top,
                    left: framePosition.left,
                    width: framePosition.width,
                    height: framePosition.height,
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
