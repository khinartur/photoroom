import {
    DndContext,
    type DragEndEvent,
    type DragMoveEvent,
    type DragStartEvent,
} from '@dnd-kit/core'
import {useCallback} from 'react'
import {useEditorState} from '~/shared/state'
import type {CanvasDisplayParams} from '~/shared/types'

type DragNDropProviderProps = {
    children: React.ReactNode
    canvasDisplayParams: CanvasDisplayParams
}

export const DragNDropProvider = ({
    children,
    canvasDisplayParams,
}: DragNDropProviderProps) => {
    const editorState = useEditorState()

    const handleDragStart = useCallback(
        (event: DragStartEvent) => {
            const {active} = event
            const layerData = active.data.current

            if (!layerData || !layerData.layer) {
                return
            }

            editorState.setDragState({
                isDragging: true,
                dragLayerId: layerData.layer.id,
                dragDelta: {x: 0, y: 0},
            })
        },
        [editorState],
    )

    const handleDragMove = useCallback(
        (event: DragMoveEvent) => {
            const {delta} = event

            editorState.setDragState({
                dragDelta: delta,
            })
        },
        [editorState],
    )

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const {active, delta} = event
            const layerData = active.data.current

            if (!layerData || !layerData.layer) {
                editorState.setDragState({
                    isDragging: false,
                    dragLayerId: null,
                    dragDelta: null,
                })
                return
            }

            const layer = layerData.layer

            const deltaCanvasX = delta.x / canvasDisplayParams.scale
            const deltaCanvasY = delta.y / canvasDisplayParams.scale

            const newCanvasX = layer.x + deltaCanvasX
            const newCanvasY = layer.y + deltaCanvasY

            editorState.updateLayerProperties(layer.id, {
                x: newCanvasX,
                y: newCanvasY,
            })

            editorState.setDragState({
                isDragging: false,
                dragLayerId: null,
                dragDelta: null,
            })
        },
        [editorState, canvasDisplayParams.scale],
    )

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
        >
            {children}
        </DndContext>
    )
}
