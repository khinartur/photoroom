import type {DragState} from '../types'

export const EDITOR_PADDING = 40

export const DEFAULT_DRAG_STATE: DragState = {
    isDragging: false,
    dragLayerId: null,
    dragDelta: null,
}
