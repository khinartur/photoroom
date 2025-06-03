import {observer} from 'mobx-react-lite'
import {DotsIcon} from '../icons'
import {tcn} from '../utils/tcn'
import type {Design} from '../state/designs'
import {useAppState} from '../providers/root'

type DesignPreviewCardProps = {
    design: Design
}

export const DesignPreviewCard = observer(
    ({design}: DesignPreviewCardProps) => {
        const appState = useAppState()
        return (
            <div
                className="group relative flex items-center gap-2 border border-misc-border aspect-square rounded-[8px] cursor-pointer overflow-hidden"
                onClick={() => appState.goToEditorPage(design.id)}
            >
                <img
                    className="w-full h-full object-contain"
                    src={design.image.src}
                    alt="Design preview"
                />
                <div className="absolute inset-0 border border-misc-border size-full bg-black-alpha-3 hidden group-hover:flex rounded-[8px]">
                    <button
                        type="button"
                        className={tcn(
                            'absolute size-8 bg-background-inverted rounded-full right-2 top-2 flex items-center justify-center',
                            'cursor-pointer text-content-secondary hover:text-content-primary',
                        )}
                    >
                        <div className="flex items-center justify-center size-4">
                            <DotsIcon />
                        </div>
                    </button>
                </div>
            </div>
        )
    },
)
