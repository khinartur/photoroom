import {useEffect, useRef, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useAppState} from '../../providers/app'
import {HomeIcon, ImagesIcon} from '../../icons'
import {Button} from '../../ui-kit/Button'
import {tcn} from '../../utils/tcn'
import {Tool} from '../../ui-kit/Tool'
import {ExportButton} from './ExportButton'
import {Sidebar} from './Sidebar'
import {useEditorState} from '../../providers/editor'

export const EditorPage = observer(() => {
    const appState = useAppState()
    const editorState = useEditorState()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [emojis, setEmojis] = useState<
        {x: number; y: number; emoji: string}[]
    >([])

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

        const newEmojis = [
            ...emojis,
            {x, y, emoji: editorState.selectedEmoji || ''},
        ]
        setEmojis(newEmojis)
        redrawCanvas(canvas, newEmojis)
    }

    const redrawCanvas = (
        canvas: HTMLCanvasElement,
        emojisToDraw: {x: number; y: number; emoji: string}[],
    ) => {
        const ctx = canvas.getContext('2d')
        if (!ctx || !appState.image || !editorState.selectedEmoji) {
            return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(appState.image, 0, 0)

        ctx.font = '124px serif'
        for (const emoji of emojisToDraw) {
            ctx.fillText(emoji.emoji, emoji.x, emoji.y)
        }
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
