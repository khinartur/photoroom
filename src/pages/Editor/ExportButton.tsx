import {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {DownloadIcon} from '../../icons'
import {Button} from '../../ui-kit/Button'
import {tcn} from '../../utils/tcn'
import {Dropdown} from '../../ui-kit/Dropdown'
import {Input} from '../../ui-kit/Input'

export const ExportButton = observer(
    ({canvas}: {canvas: HTMLCanvasElement | null}) => {
        const [fileName, setFileName] = useState('')

        const onExport = () => {
            if (!canvas || !fileName) {
                // @todo: add validation for file name
                return
            }
            setFileName('')

            const imageURL = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.download = fileName
            link.href = imageURL
            link.click()
        }

        return (
            <Dropdown
                align="end"
                trigger={<Button variant="accent" icon={<DownloadIcon />} />}
                content={
                    <div
                        className={tcn(
                            'flex flex-col gap-4 w-[360px] bg-background-primary outline-none p-4',
                            'border border-misc-border rounded-[10px]',
                        )}
                    >
                        <span className="text-[17px] text-content-primary font-bold">
                            Download
                        </span>
                        <div className="flex flex-col gap-6">
                            <Input
                                label="File name"
                                value={fileName}
                                onChange={e => setFileName(e.target.value)}
                            />
                            <Button onClick={onExport}>Download</Button>
                        </div>
                    </div>
                }
            />
        )
    },
)
