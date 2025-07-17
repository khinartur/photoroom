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
