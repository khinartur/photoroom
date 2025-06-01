import {tcn} from '../../utils/tcn'

type LayerProps = {
    name: string
    src: string
}

export const Layer: React.FC<LayerProps> = ({name, src}) => {
    return (
        <div
            className={tcn(
                'flex items-center gap-3 h-14 rounded-[10px] p-2',
                'bg-background-subdued',
            )}
        >
            <img className="w-10" src={src} alt={src} />
            <span className="text-sm font-medium text-content-primary">
                {name}
            </span>
        </div>
    )
}
