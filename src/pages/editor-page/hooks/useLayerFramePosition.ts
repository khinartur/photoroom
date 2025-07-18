import {useMemo} from 'react'
import type {ChangeableLayer} from '~/shared/types'
import type {CanvasDisplayParams, LayerFramePosition} from '~/shared/types'
import {getTextWidth} from '~/shared/utils'

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
            const textWidth = getTextWidth(layer.text, fontSize)
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
