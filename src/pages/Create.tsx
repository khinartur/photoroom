import {useCallback, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import {PageLayout} from '../ui-kit/PageLayout'
import {Category} from '../ui-kit/Category'
import {TemplateCard} from '../ui-kit/TemplateCard'
import {ImageSelector} from '../ImageSelector'

export const CreatePage = observer(() => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onTemplateClick = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    return (
        <PageLayout title="Create">
            <Category
                title="Classics"
                content={
                    <TemplateCard
                        imageSrc="/emojis.png"
                        name="Add Emojis"
                        onClick={onTemplateClick}
                    />
                }
            />
            <ImageSelector ref={fileInputRef} />
        </PageLayout>
    )
})
