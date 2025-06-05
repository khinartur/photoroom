import {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useFoldersState, useModalsState, useToastState} from '../providers/root'
import * as RadioGroup from '@radix-ui/react-radio-group'
import type {CommonModalProps} from '.'
import type {Folder} from '../state/folders'
import {Modal} from '../ui-kit/Modal'
import {Button} from '../ui-kit/Button'
import {MenuItem} from '../ui-kit/MenuItem'
import {FolderIcon, NewFolderIcon} from '../icons'
import {RadioItem} from '../ui-kit/RadioItem'
import {DesignsAddedToFolderToast} from '../toasts'

type AddToFolderModalProps = CommonModalProps

export const AddToFolderModal = observer(
    ({mountNode}: AddToFolderModalProps) => {
        const modalsState = useModalsState()
        const foldersState = useFoldersState()
        const toastState = useToastState()

        const [selectedFolderId, setSelectedFolderId] = useState<
            Folder['id'] | null
        >(null)

        const onAdd = () => {
            if (!selectedFolderId) {
                return
            }
            foldersState.addSelectedDesignsToFolder(selectedFolderId)
            toastState.setActiveToast(DesignsAddedToFolderToast)
            modalsState.closeModal()
        }

        return (
            <Modal
                className="w-[480px] p-10"
                mountNode={mountNode}
                title="Add to folder"
                showCloseButton
                onClose={() => modalsState.closeModal()}
            >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-0.5">
                        <MenuItem
                            className="hover:bg-background-accent-subdued"
                            label="New folder"
                            labelClassName="text-content-accent"
                            icon={<NewFolderIcon />}
                            iconClassName="text-content-accent dark:group-hover:text-content-accent"
                            onClick={() => modalsState.openNewFolderModal(true)}
                        />
                        <RadioGroup.Root onValueChange={setSelectedFolderId}>
                            {foldersState.folders.map(folder => (
                                <MenuItem
                                    key={folder.id}
                                    label={
                                        <label
                                            htmlFor={folder.id}
                                            className="text-content-primary text-[14px] font-medium cursor-pointer"
                                        >
                                            {folder.name}
                                        </label>
                                    }
                                    icon={<FolderIcon />}
                                    onClick={() => {}}
                                    right={
                                        <RadioItem
                                            id={folder.id}
                                            value={folder.id}
                                        />
                                    }
                                />
                            ))}
                        </RadioGroup.Root>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => modalsState.closeModal()}
                        >
                            Cancel
                        </Button>
                        <Button onClick={onAdd}>Add</Button>
                    </div>
                </div>
            </Modal>
        )
    },
)
