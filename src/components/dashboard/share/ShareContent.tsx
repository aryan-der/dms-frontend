// components/share/ShareContent.tsx

import { useEffect, useState } from "react"
import { Download, File, Folder, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    const [data, setData] = useState<ShareAccessResponse | null>(
        prefetchedData ?? null
    )
    const { useShareAccess } = useFolder()
    const { mutate, isPending } = useShareAccess({ token })

    // Public share — auto fetch
    useEffect(() => {
        if (!prefetchedData) {
            mutate(
                {},
                {
                    onSuccess: (res) => {
                        if (res?.success) setData(res)
                    },
                }
            )
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

    return (
        <div className="min-h-screen bg-muted/40 px-4 py-10">
            <div className="mx-auto max-w-2xl space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold">Shared With You</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {files.length} file{files.length !== 1 ? "s" : ""}
                        {folders.length > 0 &&
                            `, ${folders.length} folder${folders.length !== 1 ? "s" : ""}`}
                    </p>
                </div>

                {/* Folders */}
                {folders.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Folders</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {folders.map((folder) => (
                                <div
                                    key={folder._id}
                                    className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3 hover:bg-muted/50 transition-colors"
                                >
                                    <Folder className="h-5 w-5 shrink-0 text-yellow-500" />
                                    <span className="flex-1 text-sm font-medium truncate">
                                        {folder.name}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Files */}
                {files.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Files</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {files.map((file) => (
                                <div
                                    key={file._id}
                                    className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3 hover:bg-muted/50 transition-colors"
                                >
                                    <File className="h-5 w-5 shrink-0 text-blue-500" />
                                    <span className="flex-1 text-sm font-medium truncate">
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground shrink-0">
                                        {formatSize(file.size)}
                                    </span>
                                    {(allowDownload ?? data.allowDownload) && (
                                        <Button size="sm" variant="ghost" asChild>
                                            <a href={file.url} download={file.name}>
                                                <Download className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {files.length === 0 && folders.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>No files or folders found.</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ShareContent