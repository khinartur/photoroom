import {observer} from 'mobx-react-lite'
import {useEditorState} from '~/shared/state'
import {tcn} from '~/shared/utils'

export const TextSelector = observer(() => {
    const editorState = useEditorState()

    return (
        <div className="flex flex-col gap-3 p-4">
            <div className="text-xl font-semibold text-content-primary">
                Add Text
            </div>
            <div className="flex flex-wrap gap-2">
                {['NEW', 'COOL', 'SALE'].map(text => (
                    <div
                        key={text}
                        className={tcn(
                            'flex items-center justify-center w-40 h-20 rounded-[10px] text-4xl',
                            'cursor-pointer hover:bg-background-subdued border border-misc-border',
                            {
                                'bg-background-subdued':
                                    editorState.selectedText === text,
                            },
                        )}
                        onClick={() => editorState.selectText(text)}
                    >
                        {text}
                    </div>
                ))}
            </div>
        </div>
    )
})
