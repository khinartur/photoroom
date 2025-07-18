import {useCallback, useEffect, useState, type RefObject} from 'react'
import type {CanvasDisplayParams} from '~/shared/types'
import {EDITOR_PADDING} from '~/shared/constants'
import {useEditorState} from '~/shared/state'

export const useCalculateCanvasDisplayParams = (
    containerRef: RefObject<HTMLDivElement>,
    canvasWrapperRef: RefObject<HTMLDivElement>,
): CanvasDisplayParams => {
    const editorState = useEditorState()
    const design = editorState.activeDesign
    const [canvasDisplayParams, setCanvasDisplayParams] =
        useState<CanvasDisplayParams>({
            width: 0,
            height: 0,
            scale: 0,
            canvasOffsetX: 0,
            canvasOffsetY: 0,
        })

    const calculateCanvasDisplayParams = useCallback(() => {
        if (!design?.image || !canvasWrapperRef.current) {
            return
        }

        const containerRect = canvasWrapperRef.current.getBoundingClientRect()

        const padding = EDITOR_PADDING * 2
        const maxWidth = containerRect.width - padding
        const maxHeight = containerRect.height - padding

        const imageWidth = design.image.width
        const imageHeight = design.image.height

        const scaleX = maxWidth / imageWidth
        const scaleY = maxHeight / imageHeight
        const scale = Math.min(scaleX, scaleY, 1)

        const canvasWidth = imageWidth * scale
        const canvasHeight = imageHeight * scale

        const canvasOffsetX = (containerRect.width - canvasWidth) / 2
        const canvasOffsetY = (containerRect.height - canvasHeight) / 2

        setCanvasDisplayParams({
            width: canvasWidth,
            height: canvasHeight,
            scale,
            canvasOffsetX,
            canvasOffsetY,
        })
    }, [design?.image, canvasWrapperRef])

    useEffect(() => {
        calculateCanvasDisplayParams()

        if (!containerRef.current) {
            return
        }

        const resizeObserver = new ResizeObserver(() => {
            // Delay to give the browser time to reflow
            requestAnimationFrame(() => {
                calculateCanvasDisplayParams()
            })
        })

        resizeObserver.observe(containerRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [calculateCanvasDisplayParams, containerRef])

    return canvasDisplayParams
}
