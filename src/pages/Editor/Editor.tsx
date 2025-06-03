import {useCallback, useEffect, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import {
    useAppState,
    useDesignsState,
    useEditorState,
} from '../../providers/root'
import type {Layer} from '../../state/designs'
import {HomeIcon, ImagesIcon} from '../../icons'
import {Button} from '../../ui-kit/Button'
import {tcn} from '../../utils/tcn'
import {Tool} from '../../ui-kit/Tool'
import {ExportButton} from './ExportButton'
import {Sidebar} from './Sidebar'

export const EditorPage = observer(() => {
    const appState = useAppState()
    const designsState = useDesignsState()
    const editorState = useEditorState()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const design = designsState.activeDesign

    const redrawCanvas = useCallback(
        (canvas: HTMLCanvasElement, layers: Layer[]) => {
            const ctx = canvas.getContext('2d')
            if (!ctx || !design) {
                return
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(design.image, 0, 0)

            for (const layer of layers) {
                if (layer.type === 'EMOJI') {
                    // @todo: change font size
                    ctx.font = '124px serif'
                    ctx.fillText(layer.emoji, layer.x - 62, layer.y + 62)
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

        editorState.selectedTool(x, y)
    }

    return (
        <div className="flex flex-col h-full max-h-full w-full">
            <div
                className={tcn(
                    'min-h-16 w-full flex items-center justify-between px-4',
                    'bg-surface-high shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)]',
                )}
            >
                <Button
                    variant="secondary"
                    icon={<HomeIcon />}
                    onClick={() => {
                        appState.setActiveDesignId(null)
                        appState.goToDesignsPage()
                    }}
                />
                <Tool
                    icon={<ImagesIcon />}
                    onClick={() => editorState.selectEmojiTool()}
                >
                    Add Emoji
                </Tool>
                <ExportButton canvas={canvasRef.current} />
            </div>
            <div className="flex h-full w-full overflow-hidden">
                <div
                    className="flex justify-center flex-1 h-full min-w-0 bg-surface-low p-10"
                    onClick={() => editorState.resetTool()}
                >
                    <canvas
                        ref={canvasRef}
                        className={tcn('bg-white', {
                            'cursor-pointer': editorState.selectedTool !== null,
                        })}
                        onClick={onCanvasClick}
                        style={{
                            width: 'auto',
                            height: '100%',
                        }}
                    />
                </div>
                <Sidebar />
            </div>
        </div>
    )
})
