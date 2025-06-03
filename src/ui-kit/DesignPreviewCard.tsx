import {observer} from 'mobx-react-lite'
import {DotsIcon, TrashIcon} from '../icons'
import {tcn} from '../utils/tcn'
import type {Design} from '../state/designs'
import {useAppState, useModalsState} from '../providers/root'
import {Dropdown} from './Dropdown'
import {MenuItem} from './MenuItem'
import {useState} from 'react'

type DesignPreviewCardProps = {
    design: Design
}

export const DesignPreviewCard = observer(
    ({design}: DesignPreviewCardProps) => {
        const appState = useAppState()
        const modalsState = useModalsState()
        const [showMenu, setShowMenu] = useState(false)

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
                <div
                    className={tcn(
                        'absolute inset-0 border border-misc-border size-full bg-black-alpha-3 hidden group-hover:flex rounded-[8px]',
                        {flex: showMenu},
                    )}
                >
                    <Dropdown
                        open={showMenu}
                        onOpenChange={setShowMenu}
                        align="start"
                        triggerAsChild
                        trigger={
                            <button
                                type="button"
                                className={tcn(
                                    'absolute size-8 bg-background-inverted rounded-full right-2 top-2 flex items-center justify-center',
                                    'cursor-pointer text-content-secondary hover:text-content-primary',
                                )}
                                onClick={e => {
                                    e.stopPropagation()
                                    setShowMenu(show => !show)
                                }}
                            >
                                <div className="flex items-center justify-center size-4">
                                    <DotsIcon />
                                </div>
                            </button>
                        }
                        content={
                            <div
                                className={tcn(
                                    'w-[240px] bg-background-primary outline-none p-1',
                                    'border border-misc-border rounded-[10px]',
                                )}
                                onClick={e => e.stopPropagation()}
                            >
                                <MenuItem
                                    className="rounded-[6px]"
                                    iconClassName="text-content-negative dark:group-hover:text-content-negative"
                                    labelClassName="text-content-negative"
                                    label="Delete"
                                    icon={<TrashIcon />}
                                    onClick={() =>
                                        modalsState.openDeleteDesignModal(
                                            design.id,
                                        )
                                    }
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        )
    },
)
