type PageLayoutProps = {
    title: string
    headerRight?: React.ReactNode
    children: React.ReactNode
}

export const PageLayout = ({title, children, headerRight}: PageLayoutProps) => {
    return (
        <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-[100px]">
            <div className="flex h-24 items-center justify-between mb-6">
                <span className="text-content-primary font-bold text-[29px]">
                    {title}
                </span>
                {headerRight}
            </div>
            {children}
        </div>
    )
}
