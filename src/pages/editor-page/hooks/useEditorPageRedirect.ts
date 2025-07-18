import {useEffect} from 'react'
import {useAppState, useEditorState} from '~/shared/state'

export const useEditorPageRedirect = () => {
    const appState = useAppState()
    const editorState = useEditorState()
    const design = editorState.activeDesign

    useEffect(() => {
        if (!design) {
            appState.goToDesignsPage()
        }
    }, [design, appState])
}
