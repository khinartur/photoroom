import type {RefObject} from 'react'
import {observer} from 'mobx-react-lite'
import {
    useAppState,
    useEditorState,
    useHistoryState,
    useModalsState,
} from '~/shared/state'
import {
    DotsIcon,
    HomeIcon,
    ImagesIcon,
    ReverseIcon,
    TextIcon,
} from '~/shared/icons'
import {Button, Dropdown, DeleteMenuItem, Tool} from '~/shared/ui'
import {tcn} from '~/shared/utils'
import {ExportButton} from '~/widgets/export-button'

type HeaderProps = {
    canvasRef: RefObject<HTMLCanvasElement>
}

export const Header = observer(({canvasRef}: HeaderProps) => {
    const appState = useAppState()
    const editorState = useEditorState()
    const modalsState = useModalsState()
    const historyState = useHistoryState()

    const design = editorState.activeDesign

    return (
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
                        editorState.setSelectedLayerId(null)
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
            <div className="flex items-center gap-0.5">
                <Tool
                    icon={<TextIcon />}
                    onClick={() => editorState.selectTextTool()}
                >
                    Add text
                </Tool>
                <Tool
                    icon={<ImagesIcon />}
                    onClick={() => editorState.selectEmojiTool()}
                >
                    Add Emoji
                </Tool>
            </div>
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
    )
})
