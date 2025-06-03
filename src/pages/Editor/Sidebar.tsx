import {observer} from 'mobx-react-lite'
import {useAppState} from '../../providers/app'
import {useEditorState} from '../../providers/editor'
import {Layer} from './Layer'
import {EmojiSelector} from './Tools/EmojiSelector'
import {tcn} from '../../utils/tcn'

export const Sidebar = observer(() => {
    const appState = useAppState()
    const editorState = useEditorState()

    const getContent = () => {
        if (editorState.selectedTool === 'EMOJI') {
            return <EmojiSelector />
        }

        return (
            <div className="w-full p-4">
                <Layer name="Photo" src={appState.image?.src || ''} />
            </div>
        )
    }

    return (
        <div
            className={tcn(
                'w-[360px] h-full shrink-0 shadow-[-1px_0_0_0] shadow-neutral-2',
                'dark:shadow-[rgba(255,255,255,0.1)]',
            )}
        >
            {getContent()}
        </div>
    )
})
