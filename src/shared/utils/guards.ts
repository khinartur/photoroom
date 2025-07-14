import type {ChangeableLayer, Layer} from '../state/designs'

export const isChangeableLayer = (layer: Layer): layer is ChangeableLayer => {
    return layer.type !== 'IMAGE'
}
