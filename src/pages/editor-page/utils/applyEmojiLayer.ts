import type {CanvasDisplayParams, DragState} from '~/shared/types'
import type {EmojiLayer} from '~/shared/state'

export const applyEmojiLayer = (
    ctx: CanvasRenderingContext2D,
    layer: EmojiLayer,
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
    ctx.fillText(layer.emoji, x - fontSize / 2, y + fontSize / 2)
}
