import type {RefObject} from 'react'
import {useEditorState} from '~/shared/state'
import {getCursorLayerId} from '../utils'

export const useOnCanvasHover = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const editorState = useEditorState()
    const design = editorState.activeDesign

    const onCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas || !design?.image) {
            editorState.setHoveredLayerId(null)
            return
        }

        const rect = canvas.getBoundingClientRect()

        const scaleX = design.image.width / rect.width
        const scaleY = design.image.height / rect.height

        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        const layerId = getCursorLayerId(
            design.layers,
            editorState.defaultFontSize,
            x,
            y,
        )
        editorState.setHoveredLayerId(layerId)
    }

    const onCanvasLeave = () => {
        editorState.setHoveredLayerId(null)
    }

    return {onCanvasHover, onCanvasLeave}
}
