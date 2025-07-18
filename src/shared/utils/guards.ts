import type {ChangeableLayer, Layer} from '../types'

export const isChangeableLayer = (layer: Layer): layer is ChangeableLayer => {
    return layer.type !== 'IMAGE'
}
