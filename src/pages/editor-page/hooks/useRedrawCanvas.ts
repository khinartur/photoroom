import {useCallback, useEffect, type RefObject} from 'react'
import {useEditorState} from '~/shared/state'
import type {Layer} from '~/shared/types'
import {applyEmojiLayer, applyTextLayer} from '../utils'
import type {CanvasDisplayParams} from '~/shared/types'

export const useRedrawCanvas = (
    canvasRef: RefObject<HTMLCanvasElement>,
    canvasDisplayParams: CanvasDisplayParams,
) => {
    const editorState = useEditorState()
    const design = editorState.activeDesign
    const dragState = editorState.dragState
    const defaultFontSize = editorState.defaultFontSize

    const redrawCanvas = useCallback(
        (canvas: HTMLCanvasElement, layers: Layer[]) => {
            const ctx = canvas.getContext('2d')
            if (!ctx || !design) {
                return
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(design.image, 0, 0)

            for (const layer of layers) {
                if (layer.hidden) {
                    continue
                }

                if (layer.type === 'TEXT') {
                    applyTextLayer(
                        ctx,
                        layer,
                        dragState,
                        canvasDisplayParams,
                        defaultFontSize,
                    )
                    continue
                }

                if (layer.type === 'EMOJI') {
                    applyEmojiLayer(
                        ctx,
                        layer,
                        dragState,
                        canvasDisplayParams,
                        defaultFontSize,
                    )
                }
            }
        },
        [design, dragState, canvasDisplayParams, defaultFontSize],
    )

    // biome-ignore lint/correctness/useExhaustiveDependencies: should redraw canvas on every layers and image change
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !design) {
            return
        }
        canvas.width = design.image.width
        canvas.height = design.image.height
        redrawCanvas(canvas, design.layers)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasRef, design?.image, design?.layers, redrawCanvas])
}
