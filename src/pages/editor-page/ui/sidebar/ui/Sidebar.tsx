import {observer} from 'mobx-react-lite'
import {useCallback} from 'react'
import {useEditorState, type Layer as LayerType} from '~/shared/state'
import {tcn} from '~/shared/utils'
import {EmojiSelector, TextSelector} from '../../tools'
import {Layer} from './Layer'

export const Sidebar = observer(() => {
    const editorState = useEditorState()

    const onLayerClick = useCallback(
        (layerId: LayerType['id']) => {
            editorState.setSelectedLayerId(layerId)
        },
        [editorState],
    )

    const onLayerDelete = useCallback(
        (layerId: LayerType['id']) => {
            editorState.deleteLayer(layerId)
        },
        [editorState],
    )

    const getContent = () => {
        if (editorState.selectedTool?.type === 'TEXT') {
            return <TextSelector />
        }

        if (editorState.selectedTool?.type === 'EMOJI') {
            return <EmojiSelector />
        }

        const design = editorState.activeDesign
        if (!design) {
            return null
        }

        return (
            <div className="flex flex-col gap-2 w-full p-4">
                {design.layers.map(layer => (
                    <Layer
                        key={layer.id}
                        layer={layer}
                        selected={editorState.selectedLayerId === layer.id}
                        onClick={onLayerClick}
                        onDelete={onLayerDelete}
                        onVisibilityChange={hidden => {
                            editorState.updateLayerVisibility(layer.id, hidden)
                        }}
                    />
                ))}
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
