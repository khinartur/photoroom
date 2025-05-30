export const App = () => {
    return (
        <div className="flex">
            <div className="flex h-full flex-col p-4 w-[280px] overflow-y-auto border-r border-r-black">
                Left sidebar
            </div>
            <div className="flex-1 overflow-y-auto">Designs</div>
        </div>
    )
}
