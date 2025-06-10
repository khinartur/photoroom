import {useCallback, useEffect, useRef} from 'react'
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

export const EditorPage = observer(() => {
    const appState = useAppState()
    const designsState = useDesignsState()
    const editorState = useEditorState()
    const modalsState = useModalsState()
    const historyState = useHistoryState()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const design = designsState.activeDesign

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
                    const fontSize = design.image.width / 10
                    ctx.font = `${fontSize}px serif`
                    ctx.fillText(
                        layer.emoji,
                        layer.x - fontSize / 2,
                        layer.y + fontSize / 2,
                    )
                }
            }
        },
        [design],
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
        if (!canvas || editorState.selectedTool === null) {
            return
        }
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

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
            <div className="flex h-full w-full overflow-hidden">
                <div
                    className="flex justify-center flex-1 h-full min-w-0 bg-surface-low p-10 overflow-hidden"
                    onClick={() => editorState.resetTool()}
                >
                    <canvas
                        ref={canvasRef}
                        className={tcn('bg-white', {
                            'cursor-pointer': editorState.selectedTool !== null,
                        })}
                        onClick={onCanvasClick}
                    />
                </div>
                <Sidebar />
            </div>
        </div>
    )
})
