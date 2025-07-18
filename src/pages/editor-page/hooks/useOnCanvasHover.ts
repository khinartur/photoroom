import type {RefObject} from 'react'
import {useEditorState, type Design} from '~/shared/state'
import {getCursorLayerId} from '../utils'

export const useOnCanvasHover = (
    canvasRef: RefObject<HTMLCanvasElement>,
    design?: Design | null,
) => {
    const editorState = useEditorState()

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
