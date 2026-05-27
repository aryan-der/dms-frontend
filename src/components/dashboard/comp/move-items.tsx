import { useState, useEffect, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import useFolder from "@/hooks/use-folder"
import { FiFolder, FiChevronRight, FiHome, FiArrowLeft } from "react-icons/fi"
import type { FolderType } from "@/types/data/folder-types"

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    folderIds?: string[]
    fileIds?: string[]
    parentFolderId?: string
    excludeId?: string
}

type BreadcrumbItem = {
    id: string | null
    name: string
}

const MoveItemsButton = ({
    open,
    onOpenChange,
    folderIds = [],
    fileIds = [],
    parentFolderId,
    excludeId,
}: Props) => {
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
    const [selectedFolderId, setSelectedFolderId] = useState<string | null | "root">(null)
    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([
        { id: null, name: "Root" },
    ])

    const folderListRef = useRef<HTMLDivElement | null>(null)

    const { useGetContent, useMoveItems } = useFolder()
    const { data, isLoading } = useGetContent({ parentFolderId: currentFolderId })
    const { mutate, status } = useMoveItems()
    const isPending = status === "pending"

    const folders: FolderType[] = (data?.data?.folders || []).filter(
        (f) => f._id !== excludeId && !folderIds.includes(f._id)
    )

    useEffect(() => {
        if (open) {
            setCurrentFolderId(null)
            setSelectedFolderId(null)
            setBreadcrumb([{ id: null, name: "Root" }])
        }
    }, [open])

    const handleFolderClick = (folder: FolderType) => {
        setSelectedFolderId(folder._id)
    }

    const handleFolderDoubleClick = (folder: FolderType, e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        setCurrentFolderId(folder._id)
        setSelectedFolderId(null)
        setBreadcrumb((prev) => [...prev, { id: folder._id, name: folder.name }])
    }

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        setCurrentFolderId(item.id)
        setSelectedFolderId(null)
        setBreadcrumb((prev) => prev.slice(0, index + 1))
    }

    const handleBack = () => {
        if (breadcrumb.length <= 1) return
        const prev = breadcrumb[breadcrumb.length - 2]
        setCurrentFolderId(prev.id)
        setSelectedFolderId(null)
        setBreadcrumb((b) => b.slice(0, -1))
    }

    const handleMove = () => {
        const destination = selectedFolderId ?? currentFolderId
        mutate(
            {
                folderIds,
                fileIds,
                destinationFolderId: destination === "root" || destination === null
                    ? null
                    : destination,
                parentFolderId,
                targetFolderId: destination === "root" || destination === null
                    ? null
                    : destination,
            } as any,
            {
                onSuccess: () => {
                    onOpenChange(false)
                },
            }
        )
    }

    const isAtRoot = breadcrumb.length === 1
    const currentLocationName = breadcrumb[breadcrumb.length - 1].name

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-lg min-w-[380px] md:min-w-[440px] max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Move to...</DialogTitle>
                    <DialogDescription>
                        Select a folder or double-click to enter.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-1 text-[13px] text-muted-foreground overflow-x-auto pb-1 min-h-[30px]">
                    {breadcrumb.map((item, index) => (
                        <span key={index} className="flex items-center gap-1 shrink-0">
                            {index > 0 && (
                                <FiChevronRight
                                    size={13}
                                    className="text-muted-foreground/60"
                                />
                            )}
                            <button
                                onClick={() => handleBreadcrumbClick(item, index)}
                                className={`hover:text-foreground transition-colors ${index === breadcrumb.length - 1
                                    ? "text-foreground font-medium"
                                    : "hover:underline"
                                    }`}
                            >
                                {index === 0 ? <FiHome size={11} className="inline mr-0.5" /> : null}
                                {item.name}
                            </button>
                        </span>
                    ))}
                </div>

                {/* Custom scrollbar styling for folder list */}
                <div
                    ref={folderListRef}
                    className="border border-border/30 rounded-lg overflow-hidden min-h-[230px] max-h-[340px] overflow-y-auto custom-scrollbar"
                    onDoubleClick={(e) => e.stopPropagation()}
                >
                    {!isAtRoot && (
                        <button
                            onClick={handleBack}
                            className="flex w-full items-center gap-2.5 px-3 py-2.5 text-[13px] text-muted-foreground hover:bg-muted border-b border-border/20 transition-colors"
                        >
                            <FiArrowLeft size={13} />
                            <span>Back</span>
                        </button>
                    )}

                    {isLoading ? (
                        <div className="flex items-center justify-center h-[180px] text-[13px] text-muted-foreground">
                            Loading...
                        </div>
                    ) : folders.length === 0 ? (
                        <div className="flex items-center justify-center h-[180px] text-[13px] text-muted-foreground">
                            No folders here
                        </div>
                    ) : (
                        folders.map((folder, i) => (
                            <button
                                key={folder._id}
                                onClick={() => handleFolderClick(folder)}
                                onDoubleClick={(e) => handleFolderDoubleClick(folder, e)}
                                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-[13px] text-left transition-colors ${i > 0 ? "border-t border-border/20" : ""
                                    } ${selectedFolderId === folder._id
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-muted text-foreground"
                                    }`}
                            >
                                <FiFolder
                                    size={14}
                                    className={selectedFolderId === folder._id
                                        ? "text-primary shrink-0"
                                        : "text-muted-foreground shrink-0"
                                    }
                                />
                                <span className="flex-1 truncate">{folder.name}</span>
                                <FiChevronRight size={11} className="text-muted-foreground/40 shrink-0" />
                            </button>
                        ))
                    )}
                </div>

                <DialogFooter className="gap-2 pt-3">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    {isAtRoot && !selectedFolderId && (
                        <Button onClick={handleMove} disabled={isPending} className="font-semibold">
                            {isPending ? "Moving..." : "Move to Root"}
                        </Button>
                    )}
                    {selectedFolderId && (
                        <Button onClick={handleMove} disabled={isPending} className="font-semibold">
                            {isPending ? "Moving..." : `Move here`}
                        </Button>
                    )}
                    {!isAtRoot && !selectedFolderId && (
                        <Button onClick={handleMove} disabled={isPending} className="font-semibold">
                            {isPending ? "Moving..." : `Move to "${currentLocationName}"`}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default MoveItemsButton