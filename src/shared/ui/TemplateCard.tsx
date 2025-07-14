import {tcn} from '../utils/tcn'

type TemplateCardProps = {
    imageSrc: string
    name: string
    onClick: () => void
}

export const TemplateCard = ({imageSrc, name, onClick}: TemplateCardProps) => {
    return (
        <div
            className="flex flex-col gap-1 w-[160px] cursor-pointer"
            onClick={onClick}
        >
            <div
                className={tcn(
                    'group relative flex items-center gap-2 size-[160px] border border-misc-border aspect-square rounded-[8px] cursor-pointer',
                    'overflow-hidden',
                )}
            >
                <img
                    className="w-full h-full object-contain"
                    src={imageSrc}
                    alt="Design preview"
                />
                <div className="absolute inset-0 border border-misc-border size-full bg-black-alpha-3 hidden group-hover:flex rounded-[8px]" />
            </div>
            <span className="text-content-secondary text-center text-xs font-medium">
                {name}
            </span>
        </div>
    )
}
