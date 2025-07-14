import {useCallback, useEffect, useRef, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {
    DndContext,
    type DragEndEvent,
    type DragStartEvent,
    type DragMoveEvent,
} from '@dnd-kit/core'
import {useAppState, useDesignsState, useEditorState} from '~/shared/state'
import {isChangeableLayer, tcn} from '~/shared/utils'
import type {Layer} from '~/shared/state/designs'
import {Sidebar} from './sidebar'
import {LayerFrame} from './layer-frame'
import {EDITOR_PADDING} from '../constants'
import type {DragState} from '../types'
import {useCalculateCanvasDisplayParams} from '../hooks'
import {Header} from './header/ui/Header'

export const EditorPage = observer(() => {
    const appState = useAppState()
    const designsState = useDesignsState()
    const editorState = useEditorState()
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasWrapperRef = useRef<HTMLDivElement>(null)

    const [dragState, setDragState] = useState<DragState>({
        isDragging: false,
        dragLayerId: null,
        dragDelta: null,
    })

    const design = designsState.activeDesign
    const selectedLayer = editorState.selectedLayer
    const defaultFontSize = editorState.defaultFontSize

    const canvasDisplayParams = useCalculateCanvasDisplayParams(
        containerRef,
        canvasWrapperRef,
        design,
    )

    useEffect(() => {
        if (!design?.image) {
            return
        }
        const defaultFontSize =
            Math.min(design.image.width, design.image.height) / 10
        editorState.setDefaultFontSize(defaultFontSize)
    }, [design?.image, editorState])

    useEffect(() => {
        if (!design) {
            appState.goToDesignsPage()
        }
    }, [design, appState])

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const {active} = event
        const layerData = active.data.current

        if (!layerData || !layerData.layer) {
            return
        }

        setDragState({
            isDragging: true,
            dragLayerId: layerData.layer.id,
            dragDelta: {x: 0, y: 0},
        })
    }, [])

    const handleDragMove = useCallback((event: DragMoveEvent) => {
        const {delta} = event

        setDragState(prev => ({
            ...prev,
            dragDelta: delta,
        }))
    }, [])

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const {active, delta} = event
            const layerData = active.data.current

            if (!layerData || !layerData.layer) {
                setDragState({
                    isDragging: false,
                    dragLayerId: null,
                    dragDelta: null,
                })
                return
            }

            const layer = layerData.layer

            const deltaCanvasX = delta.x / canvasDisplayParams.scale
            const deltaCanvasY = delta.y / canvasDisplayParams.scale

            const newCanvasX = layer.x + deltaCanvasX
            const newCanvasY = layer.y + deltaCanvasY

            designsState.updateLayerPosition(layer.id, newCanvasX, newCanvasY)

            setDragState({
                isDragging: false,
                dragLayerId: null,
                dragDelta: null,
            })
        },
        [designsState, canvasDisplayParams],
    )

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
                    const fontSize = layer.fontSize ?? defaultFontSize

                    let x = layer.x
                    let y = layer.y

                    if (
                        dragState.isDragging &&
                        dragState.dragLayerId === layer.id &&
                        dragState.dragDelta
                    ) {
                        const deltaCanvasX =
                            dragState.dragDelta.x / canvasDisplayParams.scale
                        const deltaCanvasY =
                            dragState.dragDelta.y / canvasDisplayParams.scale
                        x += deltaCanvasX
                        y += deltaCanvasY
                    }

                    ctx.font = `${fontSize}px serif`
                    ctx.fillText(
                        layer.emoji,
                        x - fontSize / 2,
                        y + fontSize / 2,
                    )
                }
            }
        },
        [design, defaultFontSize, dragState, canvasDisplayParams],
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

    const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
                const fontSize = layer.fontSize ?? defaultFontSize

                const halfSize = fontSize / 2
                const isWithinBounds =
                    x >= layer.x - halfSize &&
                    x <= layer.x + halfSize &&
                    y >= layer.y - halfSize &&
                    y <= layer.y + halfSize

                if (isWithinBounds) {
                    designsState.setSelectedLayerId(layer.id)
                    return
                }
            }
        }

        // Reset selection if no layer was clicked
        designsState.setSelectedLayerId(null)
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
        >
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
                        {selectedLayer && isChangeableLayer(selectedLayer) && (
                            <LayerFrame
                                selectedLayer={selectedLayer}
                                canvasDisplayParams={canvasDisplayParams}
                            />
                        )}
                    </div>
                    <Sidebar />
                </div>
            </div>
        </DndContext>
    )
})
