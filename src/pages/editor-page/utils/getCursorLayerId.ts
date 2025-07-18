import type {Layer} from '~/shared/state'

export const getCursorLayerId = (
    layers: Layer[],
    defaultFontSize: number,
    x: number,
    y: number,
): Layer['id'] | null => {
    // Check layers from top to bottom (reverse order)
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i]
        if (layer.hidden || layer.type === 'IMAGE') {
            continue
        }

        if (layer.type === 'TEXT') {
            const fontSize = layer.fontSize ?? defaultFontSize

            // Create a temporary canvas to measure text width
            const tempCanvas = document.createElement('canvas')
            const tempCtx = tempCanvas.getContext('2d')
            if (!tempCtx) {
                continue
            }

            tempCtx.font = `${fontSize}px serif`
            const textMetrics = tempCtx.measureText(layer.text)
            const textWidth = textMetrics.width

            const textLeft = layer.x
            const textRight = layer.x + textWidth
            const textTop = layer.y - fontSize * 0.8
            const textBottom = layer.y + fontSize * 0.2

            const isWithinBounds =
                x >= textLeft &&
                x <= textRight &&
                y >= textTop &&
                y <= textBottom

            if (isWithinBounds) {
                return layer.id
            }
        }

        if (layer.type === 'EMOJI') {
            const fontSize = layer.fontSize ?? defaultFontSize

            const halfSize = fontSize / 2
            const isWithinBounds =
                x >= layer.x - halfSize &&
                x <= layer.x + halfSize &&
                y >= layer.y - halfSize &&
                y <= layer.y + halfSize

            if (isWithinBounds) {
                return layer.id
            }
        }
    }

    // No layer found under cursor
    return null
}
