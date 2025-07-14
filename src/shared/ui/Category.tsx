type CategoryProps = {
    title: string
    content: React.ReactNode
}

export const Category = ({title, content}: CategoryProps) => {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-[20px] font-semibold text-content-primary">
                {title}
            </span>
            {content}
        </div>
    )
}
