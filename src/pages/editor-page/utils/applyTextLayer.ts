import type {CanvasDisplayParams, DragState} from '~/shared/types'
import type {TextLayer} from '~/shared/state'

export const applyTextLayer = (
    ctx: CanvasRenderingContext2D,
    layer: TextLayer,
    dragState: DragState,
    canvasDisplayParams: CanvasDisplayParams,
    defaultFontSize: number,
) => {
    const fontSize = layer.fontSize ?? defaultFontSize

    let x = layer.x
    let y = layer.y

    if (
        dragState.isDragging &&
        dragState.dragLayerId === layer.id &&
        dragState.dragDelta
    ) {
        const deltaCanvasX = dragState.dragDelta.x / canvasDisplayParams.scale
        const deltaCanvasY = dragState.dragDelta.y / canvasDisplayParams.scale
        x += deltaCanvasX
        y += deltaCanvasY
    }

    ctx.font = `${fontSize}px serif`
    ctx.fillText(layer.text, x, y)
}
