type CommonLayerProps = {
    id: string
    hidden: boolean
}

export type ImageLayer = CommonLayerProps & {
    type: 'IMAGE'
    name: 'Photo'
    image: HTMLImageElement
}

export type TextLayer = CommonLayerProps & {
    type: 'TEXT'
    name: 'Text'
    text: string
    x: number
    y: number
    fontSize?: number
}

export type EmojiLayer = CommonLayerProps & {
    type: 'EMOJI'
    name: 'Emoji'
    emoji: string
    x: number
    y: number
    fontSize?: number
}

export type Layer = ImageLayer | TextLayer | EmojiLayer

export type ChangeableLayer = TextLayer | EmojiLayer

export type Design = {
    id: string
    image: HTMLImageElement
    layers: Layer[]
}
