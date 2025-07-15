import {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {DownloadIcon} from '~/shared/icons'
import {tcn} from '~/shared/utils'
import {Button, Dropdown, Input} from '~/shared/ui'

export const ExportButton = observer(
    ({canvas}: {canvas: HTMLCanvasElement | null}) => {
        const [fileName, setFileName] = useState('')

        const onExport = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

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
                trigger={
                    <Button variant="accent" icon={<DownloadIcon />}>
                        Export
                    </Button>
                }
                content={
                    <div
                        className={tcn(
                            'flex flex-col gap-4 w-[360px] bg-background-primary outline-none p-4',
                            'border border-misc-border rounded-[10px]',
                        )}
                    >
                        <span className="text-[17px] text-content-primary font-bold">
                            Export
                        </span>
                        <form onSubmit={onExport}>
                            <div className="flex flex-col gap-6">
                                <Input
                                    label="Enter file name"
                                    value={fileName}
                                    onChange={e => setFileName(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    disabled={fileName.length === 0}
                                >
                                    Export
                                </Button>
                            </div>
                        </form>
                    </div>
                }
            />
        )
    },
)
