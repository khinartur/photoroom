import type {RefObject} from 'react'
import {useEditorState} from '~/shared/state'
import {getCursorLayerId} from '../utils'

export const useOnCanvasClick = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const editorState = useEditorState()
    const design = editorState.activeDesign

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

        const layerId = getCursorLayerId(
            design.layers,
            editorState.defaultFontSize,
            x,
            y,
        )
        editorState.setSelectedLayerId(layerId)
    }
}
