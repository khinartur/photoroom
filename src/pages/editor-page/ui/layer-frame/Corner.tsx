type CornerProps = {
    className: string
    styles: React.CSSProperties
}

export const Corner = ({className, styles}: CornerProps) => {
    return <div className={className} style={styles} />
}
