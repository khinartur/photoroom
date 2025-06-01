import {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {AppStateContext} from '../../state/app'
import {EditorStateContext} from '../../state/editor'
import {Layer} from './Layer'

export const Sidebar = observer(() => {
    const appState = useContext(AppStateContext)
    const editorState = useContext(EditorStateContext)

    const getContent = () => {
        if (editorState.selectedTool === 'EMOJI') {
            return <div>Emoji selector</div>
        }

        return (
            <div className="w-full p-4">
                <Layer name="Photo" src={appState.image?.src || ''} />
            </div>
        )
    }

    return (
        <div className="w-[360px] h-full shrink-0 shadow-[-1px_0_0_0] shadow-neutral-2">
            {getContent()}
        </div>
    )
})
