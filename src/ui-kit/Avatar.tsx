type AvatarProps = {
    firstName: string
}

export const Avatar = ({firstName}: AvatarProps) => {
    return (
        <div className="size-10 flex items-center justify-center rounded-full">
            <span>{firstName[0]}</span>
        </div>
    )
}
