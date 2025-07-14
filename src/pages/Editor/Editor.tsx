import {useCallback, useEffect, useRef, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {
    useAppState,
    useDesignsState,
    useEditorState,
    useHistoryState,
    useModalsState,
} from '../../providers/root'
import type {Layer} from '../../state/designs'
import {DotsIcon, HomeIcon, ImagesIcon, ReverseIcon} from '../../icons'
import {Button} from '../../ui-kit/Button'
import {tcn} from '../../utils/tcn'
import {Tool} from '../../ui-kit/Tool'
import {Dropdown} from '../../ui-kit/Dropdown'
import {DeleteMenuItem} from '../../ui-kit/DeleteMenuItem'
import {ExportButton} from './ExportButton'
import {Sidebar} from './Sidebar'
import {LayerFrame} from './LayerFrame'

export type CanvasDisplayParams = {
    width: number
    height: number
    scale: number
    canvasOffsetX: number
    canvasOffsetY: number
}

const EDITOR_PADDING = 40

export const EditorPage = observer(() => {
    const appState = useAppState()
    const designsState = useDesignsState()
    const editorState = useEditorState()
    const modalsState = useModalsState()
    const historyState = useHistoryState()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [canvasDisplayParams, setCanvasDisplayParams] =
        useState<CanvasDisplayParams>({
            width: 0,
            height: 0,
            scale: 0,
            canvasOffsetX: 0,
            canvasOffsetY: 0,
        })

    const design = designsState.activeDesign
    const defaultFontSize = editorState.defaultFontSize

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

    const calculateCanvasDisplayParams = useCallback(() => {
        if (!design?.image || !containerRef.current || !canvasRef.current) {
            return
        }

        const containerRect = containerRef.current.getBoundingClientRect()
        const canvasRect = canvasRef.current.getBoundingClientRect()

        const canvasOffsetX = canvasRect.left - containerRect.left
        const canvasOffsetY = canvasRect.top - containerRect.top

        const padding = EDITOR_PADDING * 2
        const maxWidth = containerRect.width - padding
        const maxHeight = containerRect.height - padding

        const imageWidth = design.image.width
        const imageHeight = design.image.height

        const scaleX = maxWidth / imageWidth
        const scaleY = maxHeight / imageHeight
        const scale = Math.min(scaleX, scaleY, 1)

        setCanvasDisplayParams({
            width: imageWidth * scale,
            height: imageHeight * scale,
            scale,
            canvasOffsetX,
            canvasOffsetY,
        })
    }, [design?.image])

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
    }, [calculateCanvasDisplayParams])

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
                    ctx.font = `${fontSize}px serif`
                    ctx.fillText(
                        layer.emoji,
                        layer.x - fontSize / 2,
                        layer.y + fontSize / 2,
                    )
                }
            }
        },
        [design, defaultFontSize],
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
        if (!canvas || editorState.selectedTool === null || !design?.image) {
            return
        }

        const rect = canvas.getBoundingClientRect()

        const scaleX = design.image.width / rect.width
        const scaleY = design.image.height / rect.height

        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        editorState.applyTool(x, y)
    }

    return (
        <div className="flex flex-col h-full max-h-full w-full">
            <div
                className={tcn(
                    'min-h-16 w-full flex items-center justify-between px-4',
                    'bg-surface-high shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)]',
                )}
            >
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        icon={<HomeIcon />}
                        onClick={() => {
                            editorState.resetTool()
                            designsState.setSelectedLayerId(null)
                            appState.goToDesignsPage()
                        }}
                    />
                    <div className="flex items-center gap-0.5">
                        <Button
                            variant="ghost"
                            disabled={!historyState.canUndo}
                            icon={<ReverseIcon />}
                            onClick={() => historyState.undo()}
                        />
                        <Button
                            variant="ghost"
                            disabled={!historyState.canRedo}
                            icon={<ReverseIcon />}
                            iconClassName="scale-x-[-1]"
                            onClick={() => historyState.redo()}
                        />
                    </div>
                </div>
                <Tool
                    icon={<ImagesIcon />}
                    onClick={() => editorState.selectEmojiTool()}
                >
                    Add Emoji
                </Tool>
                <div className="flex items-center gap-2">
                    <Dropdown
                        align="end"
                        trigger={<Button variant="ghost" icon={<DotsIcon />} />}
                        content={
                            <div
                                className={tcn(
                                    'w-[240px] bg-background-primary outline-none p-1',
                                    'border border-misc-border rounded-[10px]',
                                )}
                                onClick={e => e.stopPropagation()}
                            >
                                <DeleteMenuItem
                                    onClick={() => {
                                        if (design) {
                                            modalsState.openDeleteDesignModal([
                                                design.id,
                                            ])
                                        }
                                    }}
                                />
                            </div>
                        }
                    />
                    <ExportButton canvas={canvasRef.current} />
                </div>
            </div>
            <div className="flex flex-1">
                <div
                    ref={containerRef}
                    className="relative flex justify-center items-center flex-1 h-full min-w-0 bg-surface-low overflow-hidden"
                    style={{
                        padding: `${EDITOR_PADDING}px`,
                    }}
                    onClick={() => editorState.resetTool()}
                >
                    <canvas
                        ref={canvasRef}
                        className={tcn('relatiive bg-white', {
                            'cursor-pointer': editorState.selectedTool !== null,
                        })}
                        style={{
                            width: canvasDisplayParams.width,
                            height: canvasDisplayParams.height,
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                        onClick={onCanvasClick}
                    />
                    <LayerFrame canvasDisplayParams={canvasDisplayParams} />
                </div>
                <Sidebar />
            </div>
        </div>
    )
})
