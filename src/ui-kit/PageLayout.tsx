import {tcn} from '../utils/tcn'

type PageLayoutProps = {
    className?: string
    title: string | React.ReactNode
    headerRight?: React.ReactNode
    children: React.ReactNode
}

export const PageLayout = ({
    className,
    title,
    children,
    headerRight,
}: PageLayoutProps) => {
    return (
        <div
            className={tcn(
                'flex flex-1 flex-col overflow-y-auto px-8 pb-[100px]',
                className,
            )}
        >
            <div className="flex h-24 items-center justify-between mb-6">
                {typeof title === 'string' ? (
                    <span className="text-content-primary font-bold text-[29px]">
                        {title}
                    </span>
                ) : (
                    title
                )}
                {headerRight}
            </div>
            {children}
        </div>
    )
}
