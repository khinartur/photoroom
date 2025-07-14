import {observer} from 'mobx-react-lite'
import {useEditorState} from '~/shared/state'
import {tcn} from '~/shared/utils'

export const EmojiSelector = observer(() => {
    const editorState = useEditorState()

    return (
        <div className="flex flex-col gap-3 p-4">
            <div className="text-xl font-semibold text-content-primary">
                Select an emoji
            </div>
            <div className="flex flex-wrap gap-2">
                {['❤️', '🥹', '🪄', '👀', '👍', '🔥'].map(emoji => (
                    <div
                        key={emoji}
                        className={tcn(
                            'flex items-center justify-center size-40 rounded-[10px] text-4xl',
                            'cursor-pointer hover:bg-background-subdued border border-misc-border',
                            {
                                'bg-background-subdued':
                                    editorState.selectedEmoji === emoji,
                            },
                        )}
                        onClick={() => editorState.selectEmoji(emoji)}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
        </div>
    )
})
