import {useCallback, useRef} from 'react'
import {observer} from 'mobx-react-lite'
import {useEditorState} from '~/shared/state'
import {isChangeableLayer, tcn} from '~/shared/utils'
import {Sidebar} from './sidebar'
import {LayerFrame, LayerHoverFrame} from './layer-frame'
import {
    useCalculateCanvasDisplayParams,
    useOnCanvasClick,
    useOnCanvasHover,
    useRedrawCanvas,
} from '../hooks'
import {Header} from './header'
import {DragNDropProvider} from './providers'
import {EDITOR_PADDING} from '~/shared/constants'
import {useEditorPageRedirect} from '../hooks'

export const EditorPage = observer(() => {
    const editorState = useEditorState()
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasWrapperRef = useRef<HTMLDivElement>(null)

    const {selectedLayer, hoveredLayer, defaultFontSize} = editorState

    const canvasDisplayParams = useCalculateCanvasDisplayParams(
        containerRef,
        canvasWrapperRef,
    )

    const onCanvasClick = useOnCanvasClick(canvasRef)
    const {onCanvasHover, onCanvasLeave} = useOnCanvasHover(canvasRef)
    const onCanvasWrapperClick = useCallback(() => {
        editorState.resetTool()
    }, [editorState])

    useRedrawCanvas(canvasRef, canvasDisplayParams)

    useEditorPageRedirect()

    return (
        <DragNDropProvider canvasDisplayParams={canvasDisplayParams}>
            <div ref={containerRef} className="flex flex-1 flex-col">
                <Header canvasRef={canvasRef} />
                <div className="flex flex-1 overflow-hidden">
                    <div
                        ref={canvasWrapperRef}
                        className="relative flex justify-center items-center flex-1 bg-surface-low cursor-pointer"
                        style={{
                            padding: `${EDITOR_PADDING}px`,
                        }}
                        onClick={onCanvasWrapperClick}
                    >
                        <canvas
                            ref={canvasRef}
                            className={tcn('relatiive bg-white', {
                                'cursor-pointer':
                                    editorState.selectedTool !== null,
                            })}
                            style={{
                                width: canvasDisplayParams.width,
                                height: canvasDisplayParams.height,
                            }}
                            onClick={onCanvasClick}
                            onMouseMove={onCanvasHover}
                            onMouseLeave={onCanvasLeave}
                        />
                        {selectedLayer && isChangeableLayer(selectedLayer) && (
                            <LayerFrame
                                selectedLayer={selectedLayer}
                                defaultFontSize={defaultFontSize}
                                canvasDisplayParams={canvasDisplayParams}
                            />
                        )}
                        {hoveredLayer &&
                            isChangeableLayer(hoveredLayer) &&
                            hoveredLayer.id !== editorState.selectedLayerId && (
                                <LayerHoverFrame
                                    hoveredLayer={hoveredLayer}
                                    defaultFontSize={defaultFontSize}
                                    canvasDisplayParams={canvasDisplayParams}
                                />
                            )}
                    </div>
                    <Sidebar />
                </div>
            </div>
        </DragNDropProvider>
    )
})
