import React from 'react'
import {observer} from 'mobx-react-lite'
import {useAppState, useDesignsState} from './providers/root'
import type {Design} from './state/designs'

export const ImageSelector = observer(
    React.forwardRef<HTMLInputElement>((_, ref) => {
        const appState = useAppState()
        const designsState = useDesignsState()

        const onImageChange = ({
            target,
        }: React.ChangeEvent<HTMLInputElement>) => {
            const file = target.files?.[0]
            if (!file) {
                return
            }

            const reader = new FileReader()
            reader.onload = () => {
                const img = new Image()
                img.onload = () => {
                    const newDesign: Design = {
                        id: crypto.randomUUID(),
                        image: img,
                        layers: [
                            {
                                type: 'IMAGE',
                                name: 'Photo',
                                image: img,
                            },
                        ],
                    }
                    designsState.addDesign(newDesign)
                    appState.setActiveDesignId(newDesign.id)
                }
                img.src = reader.result as string
            }
            reader.readAsDataURL(file)
            // Clear file input to have an ability to add the same file after its removing
            target.value = ''
        }

        return (
            <input
                ref={ref}
                type="file"
                className="hidden"
                onChange={onImageChange}
            />
        )
    }),
)
