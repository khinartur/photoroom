import type {RefObject} from 'react'
import {useEditorState, type Design} from '~/shared/state'

export const useOnCanvasClick = (
    canvasRef: RefObject<HTMLCanvasElement>,
    design?: Design | null,
) => {
    const editorState = useEditorState()

    return (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.stopPropagation()
        const canvas = canvasRef.current
        if (!canvas || !design?.image) {
            return
        }

        const rect = canvas.getBoundingClientRect()

        const scaleX = design.image.width / rect.width
        const scaleY = design.image.height / rect.height

        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        if (editorState.selectedTool !== null) {
            editorState.applyTool(x, y)
            return
        }

        for (let i = design.layers.length - 1; i >= 0; i--) {
            const layer = design.layers[i]
            if (layer.hidden) {
                continue
            }

            if (layer.type === 'TEXT') {
                const fontSize = layer.fontSize ?? editorState.defaultFontSize

                // Create a temporary canvas to measure text width
                const tempCanvas = document.createElement('canvas')
                const tempCtx = tempCanvas.getContext('2d')
                if (!tempCtx) {
                    continue
                }

                tempCtx.font = `${fontSize}px serif`
                const textMetrics = tempCtx.measureText(layer.text)
                const textWidth = textMetrics.width

                const textLeft = layer.x
                const textRight = layer.x + textWidth
                const textTop = layer.y - fontSize * 0.8
                const textBottom = layer.y + fontSize * 0.2

                const isWithinBounds =
                    x >= textLeft &&
                    x <= textRight &&
                    y >= textTop &&
                    y <= textBottom

                if (isWithinBounds) {
                    editorState.setSelectedLayerId(layer.id)
                    return
                }
            }

            if (layer.type === 'EMOJI') {
                const fontSize = layer.fontSize ?? editorState.defaultFontSize

                const halfSize = fontSize / 2
                const isWithinBounds =
                    x >= layer.x - halfSize &&
                    x <= layer.x + halfSize &&
                    y >= layer.y - halfSize &&
                    y <= layer.y + halfSize

                if (isWithinBounds) {
                    editorState.setSelectedLayerId(layer.id)
                    return
                }
            }
        }

        // Reset selection if no layer was clicked
        editorState.setSelectedLayerId(null)
    }
}
