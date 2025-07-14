import type {Layer as LayerType} from '~/shared/state/designs'
import {Button} from '~/shared/ui'
import {EyeCrossedIcon, EyeIcon} from '~/shared/icons'
import {tcn} from '~/shared/utils'

type LayerProps = {
    layer: LayerType
    selected: boolean
    onClick: (layerId: LayerType['id']) => void
    onVisibilityChange: (hidden: boolean) => void
}

export const Layer: React.FC<LayerProps> = ({
    layer,
    selected,
    onClick,
    onVisibilityChange,
}) => {
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
                'bg-background-subdued cursor-pointer border border-transparent',
                selected && 'border-content-accent',
            )}
            onClick={() => onClick(layer.id)}
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
