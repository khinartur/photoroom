import React, {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {AppStateContext} from './state/app'

export const ImageSelector = observer(
    React.forwardRef<HTMLInputElement>((_, ref) => {
        const appState = useContext(AppStateContext)

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
                    appState.image = img
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
