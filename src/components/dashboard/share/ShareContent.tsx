import { useEffect, useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react"
import { FiFolder, FiFile } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import useFolder from "@/hooks/use-folder"
import type { ShareAccessResponse, ShareFile, ShareFolder } from "@/types/payload/share-items-types"

interface Props {
    token: string
    allowDownload?: boolean
    prefetchedData?: ShareAccessResponse | null
}

const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const ShareContent = ({ token, allowDownload, prefetchedData }: Props) => {
    const [data, setData] = useState<ShareAccessResponse | null>(prefetchedData ?? null)
    const [folderOpen, setFolderOpen] = useState(true)
    const [fileOpen, setFileOpen] = useState(true)

    const { useShareAccess } = useFolder()
    const { mutate, isPending } = useShareAccess({ token })

    useEffect(() => {
        if (!prefetchedData) {
            mutate({ password: "" }, {
                onSuccess: (res) => {
                    if (res?.success) setData(res)
                },
            })
        }
    }, [])

    if (isPending || !data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    const files: ShareFile[] = data.files ?? []
    const folders: ShareFolder[] = data.folders ?? []
    const canDownload = allowDownload ?? data.allowDownload

    return (
        <div className="space-y-6">
            {/* FOLDERS */}
            {folders.length > 0 && (
                <Collapsible open={folderOpen} onOpenChange={setFolderOpen}>
                    <CollapsibleTrigger className="w-full flex items-center justify-between rounded-lg border bg-card px-4 py-3 hover:bg-muted/60 transition-all cursor-pointer">
                        <div className="flex items-center gap-2">
                            <Folder className="w-5 h-5 text-yellow-500" />
                            <h2 className="font-semibold text-lg">Folders</h2>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                {folders.length}
                            </span>
                        </div>
                        {folderOpen
                            ? <ChevronDown className="w-5 h-5" />
                            : <ChevronRight className="w-5 h-5" />
                        }
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                        <div className="flex flex-wrap gap-4">
                            {folders.map((folder) => (
                                <div
                                    key={folder._id}
                                    className="flex max-w-[260px] min-w-[220px] cursor-default items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm transition-all duration-200 select-none hover:bg-muted/40 hover:shadow-md border-border"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                                        <FiFolder size={24} className="text-yellow-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">{folder.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}

            {/* FILES */}
            {files.length > 0 && (
                <Collapsible open={fileOpen} onOpenChange={setFileOpen}>
                    <CollapsibleTrigger className="w-full flex items-center justify-between rounded-lg border bg-card px-4 py-3 hover:bg-muted/60 transition-all cursor-pointer">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold text-lg">Files</h2>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                {files.length}
                            </span>
                        </div>
                        {fileOpen
                            ? <ChevronDown className="w-5 h-5" />
                            : <ChevronRight className="w-5 h-5" />
                        }
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                        <div className="flex flex-wrap gap-4">
                            {files.map((file) => (
                                <div
                                    key={file._id}
                                    className="group relative flex max-w-[260px] min-w-[220px] cursor-default items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm transition-all duration-200 select-none hover:bg-muted/40 hover:shadow-md border-border"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                                        <FiFile size={22} className="text-blue-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                                    </div>
                                    {canDownload && (
                                        <a
                                            href={file.url}
                                            download={file.name}
                                            onClick={e => e.stopPropagation()}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}

            {/* Empty State */}
            {files.length === 0 && folders.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No files or folders found.</p>
                </div>
            )}
        </div>
    )
}

export default ShareContent