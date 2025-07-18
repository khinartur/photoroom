import {useCallback, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import {PageLayout, Category, TemplateCard} from '~/shared/ui'
import {ImageSelector} from '~/widgets/image-selector'

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
                    <div className="flex gap-2 overflow-x-scroll">
                        <TemplateCard
                            imageSrc="/text.png"
                            name="Add Text"
                            onClick={onTemplateClick}
                        />
                        <TemplateCard
                            imageSrc="/emojis.png"
                            name="Add Emojis"
                            onClick={onTemplateClick}
                        />
                    </div>
                }
            />
            <ImageSelector ref={fileInputRef} />
        </PageLayout>
    )
})
