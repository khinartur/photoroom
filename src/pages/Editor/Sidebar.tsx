import {observer} from 'mobx-react-lite'
import {useDesignsState, useEditorState} from '../../providers/root'
import {Layer} from './Layer'
import {EmojiSelector} from './Tools/EmojiSelector'
import {tcn} from '../../utils/tcn'

export const Sidebar = observer(() => {
    const designsState = useDesignsState()
    const editorState = useEditorState()

    const getContent = () => {
        if (editorState.selectedTool !== null) {
            return <EmojiSelector />
        }

        const design = designsState.activeDesign
        if (!design) {
            return null
        }

        return (
            <div className="flex flex-col gap-2 w-full p-4">
                {design.layers.map(layer => (
                    <Layer
                        key={layer.id}
                        layer={layer}
                        onVisibilityChange={hidden => {
                            designsState.updateLayerVisibility(
                                design.id,
                                layer.id,
                                hidden,
                            )
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
