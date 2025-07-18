import {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {DotsIcon, SignLeftIcon} from '~/shared/icons'
import {tcn} from '~/shared/utils'
import {
    useAppState,
    useDesignsState,
    useFoldersState,
    useModalsState,
    useSelectionState,
} from '~/shared/state'
import {DeleteMenuItem, Dropdown, Checkbox, MenuItem} from '~/shared/ui'
import type {Design} from '~/shared/types'

type DesignPreviewCardProps = {
    designId: Design['id']
}

export const DesignPreviewCard = observer(
    ({designId}: DesignPreviewCardProps) => {
        const appState = useAppState()
        const foldersState = useFoldersState()
        const modalsState = useModalsState()
        const designsState = useDesignsState()
        const selectionState = useSelectionState()
        const [showMenu, setShowMenu] = useState(false)

        const design = designsState.designs.find(d => d.id === designId)

        if (!design) {
            return null
        }

        const activeFolder = foldersState.activeFolder
        const selectionMode = selectionState.selectionFolderId !== null
        const isSelected = selectionState.selection.includes(designId)

        return (
            <div
                className={tcn(
                    'group relative flex items-center gap-2 border border-misc-border aspect-square rounded-[8px] cursor-pointer overflow-hidden',
                    {
                        'border-[2px] border-content-accent': isSelected,
                    },
                )}
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
                        {flex: showMenu || selectionMode},
                        {
                            'bg-transparent': isSelected,
                        },
                    )}
                >
                    <div
                        className="flex items-center justify-center size-8 bg-background-inverted rounded-full absolute top-2 left-2"
                        onClick={e => e.stopPropagation()}
                    >
                        <Checkbox
                            id={`select-${design.id}`}
                            checked={isSelected}
                            onChange={() => {
                                if (isSelected) {
                                    selectionState.unselectDesign(design.id)
                                } else {
                                    selectionState.selectDesign(design.id)
                                }
                            }}
                        />
                    </div>
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
                                    {hidden: selectionMode},
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
                                {activeFolder && (
                                    <MenuItem
                                        label="Remove from folder"
                                        icon={<SignLeftIcon />}
                                        onClick={() => {
                                            foldersState.removeDesignFromFolder(
                                                activeFolder.id,
                                                design.id,
                                            )
                                        }}
                                    />
                                )}
                                <DeleteMenuItem
                                    onClick={() =>
                                        modalsState.openDeleteDesignModal([
                                            design.id,
                                        ])
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
