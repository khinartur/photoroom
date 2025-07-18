import {base64ToImage, imageToBase64} from './image'
import type {Design, EmojiLayer, ImageLayer, Layer, TextLayer} from '../types'

type SerializedImageLayer = Omit<ImageLayer, 'image'> & {
    image: string
}

type SerializedLayer = SerializedImageLayer | TextLayer | EmojiLayer

export type SerializedDesign = Omit<Design, 'image' | 'layers'> & {
    image: string
    layers: SerializedLayer[]
}

export const serializeDesign = (design: Design): SerializedDesign => {
    return {
        ...design,
        image: imageToBase64(design.image),
        layers: design.layers.map(layer => {
            if (layer.type === 'IMAGE') {
                return {
                    ...layer,
                    image: imageToBase64(layer.image),
                }
            }
            return layer
        }),
    }
}

export const deserializeDesign = async (
    serialized: SerializedDesign,
): Promise<Design> => {
    const image = await base64ToImage(serialized.image)
    const layers = (await Promise.all(
        serialized.layers.map(async layer => {
            if (layer.type === 'IMAGE') {
                const imageLayer = layer as SerializedImageLayer
                return {
                    ...imageLayer,
                    image: await base64ToImage(imageLayer.image),
                }
            }
            return layer
        }),
    )) as Layer[]

    return {
        ...serialized,
        image,
        layers,
    }
}
