const textMetricsCache = new Map<string, number>()

/**
 * Get cached text width measurement using canvas.
 * Uses a global cache to avoid expensive canvas operations.
 *
 * @param text - Text to measure
 * @param fontSize - Font size in pixels
 * @returns Text width in pixels
 */
export const getTextWidth = (text: string, fontSize: number): number => {
    const cacheKey = `${text}:${fontSize}`

    const cachedValue = textMetricsCache.get(cacheKey)
    if (cachedValue !== undefined) {
        return cachedValue
    }

    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')

    if (!tempCtx) {
        const fallbackWidth = text.length * fontSize * 0.6
        return fallbackWidth
    }

    tempCtx.font = `${fontSize}px serif`
    const textMetrics = tempCtx.measureText(text)
    const textWidth = textMetrics.width

    textMetricsCache.set(cacheKey, textWidth)

    return textWidth
}
