import {observer} from 'mobx-react-lite'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import type {CanvasDisplayParams, ChangeableLayer} from '~/shared/types'
import {Corner} from './Corner'
import {tcn} from '~/shared/utils'
import {useLayerFramePosition, useLayerFrameResizeHandlers} from '../../hooks'

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
        const framePosition = useLayerFramePosition(
            selectedLayer,
            canvasDisplayParams,
            defaultFontSize,
        )

        const {isResizing, handleResizeStart, handleResizeEnd, handleResize} =
            useLayerFrameResizeHandlers(
                selectedLayer,
                canvasDisplayParams,
                framePosition,
            )

        const {attributes, listeners, setNodeRef, transform, isDragging} =
            useDraggable({
                id: `layer-${selectedLayer.id}`,
                data: {
                    layer: selectedLayer,
                },
                disabled: isResizing,
            })

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
