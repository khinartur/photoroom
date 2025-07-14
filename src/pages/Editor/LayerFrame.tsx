import {observer} from 'mobx-react-lite'
import {useEditorState} from '../../providers/root'
import type {CanvasDisplayParams} from './Editor'

type LayerFrameProps = {
    canvasDisplayParams: CanvasDisplayParams
}

export const LayerFrame = observer(({canvasDisplayParams}: LayerFrameProps) => {
    const editorState = useEditorState()
    const selectedLayer = editorState.selectedLayer
    const defaultFontSize = editorState.defaultFontSize

    if (
        !selectedLayer ||
        selectedLayer.type !== 'EMOJI' ||
        canvasDisplayParams.width === 0 ||
        canvasDisplayParams.height === 0
    ) {
        return null
    }

    const fontSize = selectedLayer.fontSize ?? defaultFontSize
    const displayFontSize = fontSize * canvasDisplayParams.scale

    const displayX =
        selectedLayer.x * canvasDisplayParams.scale +
        canvasDisplayParams.canvasOffsetX
    const displayY =
        selectedLayer.y * canvasDisplayParams.scale +
        canvasDisplayParams.canvasOffsetY

    return (
        <div
            className="absolute border-[2px] border-content-accent pointer-events-none cursor-move"
            style={{
                top: displayY - displayFontSize * 0.4,
                left: displayX - displayFontSize / 2,
                width: displayFontSize,
                height: displayFontSize,
            }}
        />
    )
})
