import {tcn} from '../../utils/tcn'
import type {Layer as LayerType} from '../../state/designs'
import {Button} from '../../ui-kit/Button'
import {EyeCrossedIcon, EyeIcon} from '../../icons'

type LayerProps = {
    layer: LayerType
    onVisibilityChange: (hidden: boolean) => void
}

export const Layer: React.FC<LayerProps> = ({layer, onVisibilityChange}) => {
    const leftContent = () => {
        if (layer.type === 'IMAGE') {
            return (
                <img
                    className="w-10"
                    src={layer.image.src}
                    alt={layer.image.src}
                />
            )
        }
        if (layer.type === 'EMOJI') {
            return (
                <div className="flex items-center justify-center size-10">
                    <span className="text-2xl">{layer.emoji}</span>
                </div>
            )
        }
        return null
    }

    return (
        <div
            className={tcn(
                'flex items-center justify-between h-14 rounded-[10px] p-2',
                'bg-background-subdued',
            )}
        >
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center overflow-hidden size-10">
                    {leftContent()}
                </div>
                <span className="text-sm font-medium text-content-primary">
                    {layer.name}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    icon={layer.hidden ? <EyeCrossedIcon /> : <EyeIcon />}
                    onClick={() => {
                        onVisibilityChange(!layer.hidden)
                    }}
                />
            </div>
        </div>
    )
}
