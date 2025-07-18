import {useCallback, useState} from 'react'
import {MIN_FONT_SIZE} from '~/shared/constants'
import {useEditorState, type ChangeableLayer} from '~/shared/state'
import type {
    CanvasDisplayParams,
    LayerFrameCornerPosition,
    LayerFramePosition,
} from '~/shared/types'

export const useLayerFrameResizeHandlers = (
    selectedLayer: ChangeableLayer,
    canvasDisplayParams: CanvasDisplayParams,
    framePosition: LayerFramePosition,
) => {
    const editorState = useEditorState()
    const [isResizing, setIsResizing] = useState(false)

    const handleResizeStart = useCallback(() => {
        setIsResizing(true)
    }, [])

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false)
    }, [])

    const handleResize = useCallback(
        (
            position: LayerFrameCornerPosition,
            deltaX: number,
            deltaY: number,
        ) => {
            const canvasDeltaX = deltaX / canvasDisplayParams.scale
            const canvasDeltaY = deltaY / canvasDisplayParams.scale

            const currentFrameWidth =
                framePosition.width / canvasDisplayParams.scale
            const currentFrameHeight =
                framePosition.height / canvasDisplayParams.scale

            const currentFrameLeft =
                (framePosition.left - canvasDisplayParams.canvasOffsetX) /
                canvasDisplayParams.scale
            const currentFrameTop =
                (framePosition.top - canvasDisplayParams.canvasOffsetY) /
                canvasDisplayParams.scale

            // Calculate fixed point (opposite corner) and new dimensions
            let fixedX: number
            let fixedY: number
            let newWidth: number
            let newHeight: number
            let newLeft: number
            let newTop: number

            switch (position) {
                case 'bottom-right':
                    // Fixed point is top-left
                    fixedX = currentFrameLeft
                    fixedY = currentFrameTop
                    newWidth = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameWidth + canvasDeltaX,
                    )
                    newHeight = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameHeight + canvasDeltaY,
                    )
                    newLeft = fixedX
                    newTop = fixedY
                    break
                case 'top-left':
                    // Fixed point is bottom-right
                    fixedX = currentFrameLeft + currentFrameWidth
                    fixedY = currentFrameTop + currentFrameHeight
                    newWidth = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameWidth - canvasDeltaX,
                    )
                    newHeight = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameHeight - canvasDeltaY,
                    )
                    newLeft = fixedX - newWidth
                    newTop = fixedY - newHeight
                    break
                case 'top-right':
                    // Fixed point is bottom-left
                    fixedX = currentFrameLeft
                    fixedY = currentFrameTop + currentFrameHeight
                    newWidth = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameWidth + canvasDeltaX,
                    )
                    newHeight = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameHeight - canvasDeltaY,
                    )
                    newLeft = fixedX
                    newTop = fixedY - newHeight
                    break
                case 'bottom-left':
                    // Fixed point is top-right
                    fixedX = currentFrameLeft + currentFrameWidth
                    fixedY = currentFrameTop
                    newWidth = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameWidth - canvasDeltaX,
                    )
                    newHeight = Math.max(
                        MIN_FONT_SIZE / canvasDisplayParams.scale,
                        currentFrameHeight + canvasDeltaY,
                    )
                    newLeft = fixedX - newWidth
                    newTop = fixedY
                    break
                default:
                    return
            }

            // Calculate new font size based on the new frame size
            // Use the smaller dimension to maintain aspect ratio
            const minDimension = Math.min(newWidth, newHeight)
            const newFontSize = Math.max(MIN_FONT_SIZE, minDimension)

            let newLayerX: number
            let newLayerY: number

            switch (selectedLayer.type) {
                case 'TEXT':
                    newLayerX = newLeft
                    newLayerY = newTop + newFontSize * 0.8
                    break
                case 'EMOJI':
                    newLayerX = newLeft + newWidth / 2
                    newLayerY = newTop + newHeight / 2
                    break
                default:
                    return
            }

            editorState.updateLayerProperties(selectedLayer.id, {
                x: newLayerX,
                y: newLayerY,
                fontSize: newFontSize,
            })
        },
        [canvasDisplayParams, framePosition, selectedLayer, editorState],
    )

    return {
        handleResize,
        handleResizeStart,
        handleResizeEnd,
        isResizing,
    }
}
