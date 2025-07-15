export type CanvasDisplayParams = {
    width: number
    height: number
    scale: number
    canvasOffsetX: number
    canvasOffsetY: number
}

export type DragState = {
    isDragging: boolean
    dragLayerId: string | null
    dragDelta: {x: number; y: number} | null
}
