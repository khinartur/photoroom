import {useCallback, useEffect, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import type {Layer} from '~/shared/state'
import {useAppState, useEditorState} from '~/shared/state'
import {isChangeableLayer, tcn} from '~/shared/utils'
import {Sidebar} from './sidebar'
import {LayerFrame} from './layer-frame'
import {useCalculateCanvasDisplayParams, useOnCanvasClick} from '../hooks'
import {Header} from './header'
import {applyEmojiLayer} from '../utils'
import {DragNDropProvider} from './providers'
import {EDITOR_PADDING} from '~/shared/constants'

export const EditorPage = observer(() => {
    const appState = useAppState()
    const editorState = useEditorState()
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasWrapperRef = useRef<HTMLDivElement>(null)

    const design = editorState.activeDesign
    const dragState = editorState.dragState
    const selectedLayer = design?.layers.find(
        layer => layer.id === editorState.selectedLayerId,
    )
    const defaultFontSize = editorState.defaultFontSize

    const canvasDisplayParams = useCalculateCanvasDisplayParams(
        containerRef,
        canvasWrapperRef,
        design,
    )

    const onCanvasClick = useOnCanvasClick(canvasRef, design)

    useEffect(() => {
        if (!design) {
            appState.goToDesignsPage()
        }
    }, [design, appState])

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

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !design?.image) {
            return
        }
        canvas.width = design.image.width
        canvas.height = design.image.height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(design.image, 0, 0)
    }, [design?.image])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !design?.layers) {
            return
        }
        redrawCanvas(canvas, design.layers)
    }, [design?.layers, redrawCanvas])

    return (
        <DragNDropProvider canvasDisplayParams={canvasDisplayParams}>
            <div ref={containerRef} className="flex flex-1 flex-col">
                <Header canvasRef={canvasRef} />
                <div className="flex flex-1 overflow-hidden">
                    <div
                        ref={canvasWrapperRef}
                        className="relative flex justify-center items-center flex-1 bg-surface-low cursor-pointer"
                        style={{
                            padding: `${EDITOR_PADDING}px`,
                        }}
                        onClick={() => editorState.resetTool()}
                    >
                        <canvas
                            ref={canvasRef}
                            className={tcn('relatiive bg-white', {
                                'cursor-pointer':
                                    editorState.selectedTool !== null,
                            })}
                            style={{
                                width: canvasDisplayParams.width,
                                height: canvasDisplayParams.height,
                            }}
                            onClick={onCanvasClick}
                        />
                        {design &&
                            selectedLayer &&
                            isChangeableLayer(selectedLayer) && (
                                <LayerFrame
                                    selectedLayer={selectedLayer}
                                    defaultFontSize={defaultFontSize}
                                    canvasDisplayParams={canvasDisplayParams}
                                />
                            )}
                    </div>
                    <Sidebar />
                </div>
            </div>
        </DragNDropProvider>
    )
})
