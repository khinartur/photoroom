import {observer} from 'mobx-react-lite'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import type {ChangeableLayer} from '~/shared/state'
import {useEditorState} from '~/shared/state'
import type {CanvasDisplayParams} from '../../types'
import {Corner} from './Corner'

type LayerFrameProps = {
    selectedLayer: ChangeableLayer
    canvasDisplayParams: CanvasDisplayParams
}

export const LayerFrame = observer(
    ({selectedLayer, canvasDisplayParams}: LayerFrameProps) => {
        const editorState = useEditorState()
        const defaultFontSize = editorState.defaultFontSize

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
            })

        const cornerClassName =
            'absolute w-3.5 h-3.5 rounded-full bg-background-white border-[2px] border-content-accent'

        return (
            <div
                ref={setNodeRef}
                className="absolute border-[2px] border-content-accent cursor-move select-none touch-none"
                style={{
                    top: displayY - displayFontSize * 0.4,
                    left: displayX - displayFontSize / 2,
                    width: displayFontSize,
                    height: displayFontSize,
                    transform: CSS.Transform.toString(transform),
                    transition: isDragging ? 'none' : 'all 0.1s ease-out',
                }}
                {...listeners}
                {...attributes}
            >
                <Corner
                    className={cornerClassName}
                    styles={{
                        top: '-7px',
                        left: '-7px',
                    }}
                />
                <Corner
                    className={cornerClassName}
                    styles={{
                        top: '-7px',
                        right: '-7px',
                    }}
                />
                <Corner
                    className={cornerClassName}
                    styles={{
                        bottom: '-7px',
                        left: '-7px',
                    }}
                />
                <Corner
                    className={cornerClassName}
                    styles={{
                        bottom: '-7px',
                        right: '-7px',
                    }}
                />
            </div>
        )
    },
)
