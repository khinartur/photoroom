import {useContext, useEffect, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import {HomeIcon, ImagesIcon} from '../../icons'
import {Button} from '../../ui-kit/Button'
import {AppStateContext} from '../../state/app'
import {EditorStateContext} from '../../state/editor'
import {tcn} from '../../utils/tcn'
import {Tool} from '../../ui-kit/Tool'
import {ExportButton} from './ExportButton'
import {Sidebar} from './Sidebar'

export const EditorPage = observer(() => {
    const appState = useContext(AppStateContext)
    const editorState = useContext(EditorStateContext)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !appState.image) {
            return
        }
        canvas.width = appState.image.width
        canvas.height = appState.image.height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(appState.image, 0, 0)
    }, [appState.image])

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

        const emoji = {x, y, emoji: '😊'}
        redrawCanvas(canvas, emoji)
    }

    const redrawCanvas = (
        canvas: HTMLCanvasElement,
        emoji: {x: number; y: number; emoji: string},
    ) => {
        const ctx = canvas.getContext('2d')
        if (!ctx || !appState.image) {
            return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(appState.image, 0, 0)

        ctx.font = '32px serif'
        ctx.fillText(emoji.emoji, emoji.x, emoji.y)
    }

    return (
        <div className="flex flex-col h-full max-h-full w-full">
            <div
                className={tcn(
                    'min-h-16 w-full flex items-center justify-between px-4',
                    'bg-surface-high shadow-[0_1px_0_0_rgba(0,0,0,0.05)]',
                )}
            >
                <Button
                    variant="secondary"
                    icon={<HomeIcon />}
                    onClick={() => {
                        appState.image = null
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
