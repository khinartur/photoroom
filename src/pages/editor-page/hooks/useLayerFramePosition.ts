import {useMemo} from 'react'
import type {ChangeableLayer} from '~/shared/state'
import type {CanvasDisplayParams, LayerFramePosition} from '~/shared/types'

export const useLayerFramePosition = (
    layer: ChangeableLayer,
    canvasDisplayParams: CanvasDisplayParams,
    defaultFontSize: number,
): LayerFramePosition => {
    return useMemo(() => {
        const fontSize = layer.fontSize ?? defaultFontSize
        const displayFontSize = fontSize * canvasDisplayParams.scale

        const displayX =
            layer.x * canvasDisplayParams.scale +
            canvasDisplayParams.canvasOffsetX
        const displayY =
            layer.y * canvasDisplayParams.scale +
            canvasDisplayParams.canvasOffsetY

        if (layer.type === 'TEXT') {
            // Measure text width for accurate frame sizing
            const tempCanvas = document.createElement('canvas')
            const tempCtx = tempCanvas.getContext('2d')

            if (!tempCtx) {
                // Fallback to square frame if canvas context is not available
                return {
                    top: displayY - displayFontSize * 0.8,
                    left: displayX - displayFontSize / 2,
                    width: displayFontSize,
                    height: displayFontSize,
                }
            }

            tempCtx.font = `${fontSize}px serif`
            const textMetrics = tempCtx.measureText(layer.text)
            const textWidth = textMetrics.width
            const displayTextWidth = textWidth * canvasDisplayParams.scale

            return {
                top: displayY - displayFontSize * 0.8,
                left: displayX,
                width: displayTextWidth,
                height: displayFontSize,
            }
        }

        if (layer.type === 'EMOJI') {
            // Square frame centered around emoji position
            return {
                top: displayY - displayFontSize * 0.4,
                left: displayX - displayFontSize / 2,
                width: displayFontSize,
                height: displayFontSize,
            }
        }

        // Fallback for unknown types
        return {
            top: displayY - displayFontSize * 0.4,
            left: displayX - displayFontSize / 2,
            width: displayFontSize,
            height: displayFontSize,
        }
    }, [layer, canvasDisplayParams, defaultFontSize])
}
