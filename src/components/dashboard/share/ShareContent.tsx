import { useMemo, useState, useEffect } from "react"
import {
    Loader2,
    ChevronDown,
    ChevronRight,
    Folder,
    FileText,
} from "lucide-react"
import { FiFolder, FiFile } from "react-icons/fi"
import { AiOutlineCloseCircle } from "react-icons/ai"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer"
import useFolder from "@/hooks/use-folder"
import type {
    ShareAccessResponse,
    ShareFile,
    ShareFolder,
} from "@/types/payload/share-items-types"
import FilePreview from "@/components/common/file-preview"
import { formatSize } from "@/lib/fileSize"

interface Props {
    token: string
    allowDownload?: boolean
    prefetchedData?: ShareAccessResponse | null
}

const ShareContent = ({
    token,
    prefetchedData,
}: Props) => {
    const [data, setData] = useState<ShareAccessResponse | null>(prefetchedData ?? null)
    const [folderOpen, setFolderOpen] = useState(true)
    const [fileOpen, setFileOpen] = useState(true)
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
    const { useShareAccess } = useFolder()
    const { mutate, isPending } = useShareAccess({ token })

    useEffect(() => {
        if (!prefetchedData && !data) {
            mutate(
                { password: "" },
                {
                    onSuccess: (res) => {
                        if (res?.success) {
                            setData(res)
                        }
                    },
                }
            )
        }
    }, [prefetchedData, data, mutate])

    const folders: ShareFolder[] = useMemo(() => data?.folders ?? [], [data?.folders])
    const files: ShareFile[] = useMemo(() => data?.files ?? [], [data?.files])

    const currentFolders = useMemo(() => {
        return folders.filter(
            (folder) =>
                String(folder.parentFolderId ?? "") === String(currentFolderId ?? "")
        )
    }, [folders, currentFolderId])

    const currentFiles = useMemo(() => {
        return files.filter(
            (file) =>
                String(file.folderId ?? "") === String(currentFolderId ?? "")
        )
    }, [files, currentFolderId])

    const selectedFile = useMemo(() => {
        return files.find(
            (file) => file._id === selectedFileId
        )
    }, [files, selectedFileId])

    if (isPending || !data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Folders */}
            {currentFolders.length > 0 && (
                <Collapsible
                    open={folderOpen}
                    onOpenChange={setFolderOpen}
                >
                    <CollapsibleTrigger
                        className="w-full flex items-center justify-between rounded-lg border bg-card px-4 py-3 hover:bg-muted/60 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <Folder className="w-5 h-5 text-yellow-500" />
                            <h2 className="font-semibold text-lg">
                                Folders
                            </h2>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                {currentFolders.length}
                            </span>
                        </div>
                        {folderOpen ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pt-4">
                        <div className="flex flex-wrap gap-4">
                            {currentFolders.map(
                                (folder) => (
                                    <div
                                        key={folder._id}
                                        onDoubleClick={() =>
                                            setCurrentFolderId(folder._id)
                                        }
                                        className=" flex max-w-[260px] min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm transition-all duration-200 hover:bg-muted/40 hover:shadow-md "
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                                            <FiFolder
                                                size={24}
                                                className="text-yellow-600"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                {folder.name}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}

            {/* Files */}
            {currentFiles.length > 0 && (
                <Collapsible
                    open={fileOpen}
                    onOpenChange={setFileOpen}
                >
                    <CollapsibleTrigger
                        className=" w-full flex items-center justify-between rounded-lg border bg-card px-4 py-3 hover:bg-muted/60 transition-all cursor-pointer "
                    >
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold text-lg">
                                Files
                            </h2>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                {currentFiles.length}
                            </span>
                        </div>
                        {fileOpen ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pt-4">
                        <div className="flex flex-wrap gap-4">
                            {currentFiles.map(
                                (file) => (
                                    <div
                                        key={file._id}
                                        onClick={() =>
                                            setSelectedFileId(file._id)
                                        }
                                        className=" group relative flex max-w-[260px] min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm transition-all duration-200 hover:bg-muted/40 hover:shadow-md "
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                                            <FiFile
                                                size={22}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}

            {/* Empty State */}
            {currentFolders.length === 0 &&
                currentFiles.length === 0 && (
                    <div className="py-16 text-center text-muted-foreground">
                        Empty Folder
                    </div>
                )}

            {/* Preview Drawer */}
            <Drawer
                open={!!selectedFileId}
                onOpenChange={(
                    open
                ) => {
                    if (!open) {
                        setSelectedFileId(null)
                    }
                }}
            >
                <DrawerContent className="min-h-screen">

                    <div className="flex items-center justify-between border-b px-4 pb-3">
                        <span className="font-medium text-lg truncate">
                            {selectedFile && ("originalName" in selectedFile)
                                ? (selectedFile as any).originalName
                                : selectedFile?.name}
                        </span>

                        <button
                            onClick={() =>
                                setSelectedFileId(null)
                            }
                        >
                            <AiOutlineCloseCircle
                                size={26}
                            />
                        </button>
                    </div>

                    {selectedFileId && (
                        <FilePreview
                            fileId={selectedFileId}
                            mimeType={selectedFile?.mimeType ?? ""}
                        />
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default ShareContent