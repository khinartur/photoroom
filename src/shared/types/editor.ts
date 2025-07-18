export type EditorToolType = 'TEXT' | 'EMOJI'

export type EditorToolCallback = (clickX: number, clickY: number) => void

export type EditorTool = {
    type: EditorToolType
    tool: EditorToolCallback
}

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
