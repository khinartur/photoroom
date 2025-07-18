import {observer} from 'mobx-react-lite'
import type {CanvasDisplayParams, ChangeableLayer} from '~/shared/types'
import {useLayerFramePosition} from '../../hooks'

type LayerHoverFrameProps = {
    hoveredLayer: ChangeableLayer
    defaultFontSize: number
    canvasDisplayParams: CanvasDisplayParams
}

export const LayerHoverFrame = observer(
    ({
        hoveredLayer,
        canvasDisplayParams,
        defaultFontSize,
    }: LayerHoverFrameProps) => {
        const framePosition = useLayerFramePosition(
            hoveredLayer,
            canvasDisplayParams,
            defaultFontSize,
        )

        return (
            <div
                className="absolute border-[2px] border-content-accent border-dashed pointer-events-none select-none opacity-60"
                style={{
                    top: framePosition.top,
                    left: framePosition.left,
                    width: framePosition.width,
                    height: framePosition.height,
                    transition: 'all 0.1s ease-out',
                }}
            />
        )
    },
)
