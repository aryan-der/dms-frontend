import TooltipAction from '@/components/common/TooltipAction'
import { Button } from '@/components/ui/button'
import useFolder from '@/hooks/use-folder'
import type { BulkMenuuItems } from '@/types/data/dropdown-menu-types'
import { Download, FolderInput, FolderPen, Link2, MoreVertical, Share2, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import RenameItem from './folder-rename'
import MoveItemsButton from './move-items'
import { useParams } from 'react-router-dom'
import DeleteItemsButton from './delete-items'
import ShareEveryoneDialog from './share-everyone'

// Add minimal dummy objects to satisfy type requirements in subcomponents
function getFirst<T>(arr: T[]): T | undefined {
    return arr && arr.length > 0 ? arr[0] : undefined;
}

const BulkMenuItems = ({
    totalSelected,
    clearSelection,
    selectedItems,
}: BulkMenuuItems) => {
    const [showRename, setShowRename] = useState(false);
    const [showMove, setShowMove] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showShareEveryone, setshowShareEveryone] = useState(false);
    const { parentFolderId } = useParams()
    const { useDownloadItems } = useFolder()
    const folderIds = selectedItems.folders;
    const fileIds = selectedItems.files;
    const itemType = folderIds.length > 0 ? "FOLDER" : "FILE"
    const renameId = itemType === "FOLDER"
        ? getFirst(folderIds)
        : getFirst(fileIds);
    const excludeId = getFirst(folderIds);

    return (
        <div className="flex sticky top-0 z-30 backdrop-blur">
            <div className="mx-auto flex items-center gap-1 ">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearSelection}
                    className="h-9 w-9 rounded-full z-50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Clear selection"
                >
                    <X className="h-3 w-3" />
                </Button>

                <span className="px-2 text-sm font-medium text-foreground z-50">
                    {totalSelected} selected
                </span>

                <div className="mx-1 h-6 w-px bg-border" />

                <TooltipAction icon={<Share2 className="h-3 w-3 z-50" />} label="Share" />
                <TooltipAction icon={<FolderPen className="h-3 w-3 z-50" />} label="Rename" disabled={totalSelected > 1}
                    onClick={() => setShowRename(true)}
                />
                <TooltipAction icon={<Link2 className="h-3 w-3 z-50" />} label="Share Everyone" onClick={() => setshowShareEveryone(true)} />
                <TooltipAction icon={<Download className="h-3 w-3 z-50" />} label="Download"
                    onClick={() => {
                        useDownloadItems.mutate({
                            folderIds,
                            fileIds
                        })
                    }}
                />
                <TooltipAction icon={<FolderInput className="h-3 w-3 z-50" />} label="Move" onClick={() => setShowMove(true)} />
                <TooltipAction icon={<Trash2 className="h-3 w-3 z-50" />} label="Delete" onClick={() => setShowDelete(true)} />

                <div className="mx-1 h-6 w-px bg-border z-50" />

                <TooltipAction icon={<MoreVertical className="h-3 w-3 z-50" />} label="More actions" />
            </div>

            <RenameItem
                open={showRename}
                onOpenChange={setShowRename}
                id={renameId ?? ''}
                currentName={""}
                type={itemType}
            />
            <MoveItemsButton
                open={showMove}
                onOpenChange={setShowMove}
                folderIds={folderIds}
                fileIds={fileIds}
                parentFolderId={parentFolderId}
                excludeId={excludeId ?? ''}
            />
            <DeleteItemsButton
                open={showDelete}
                onOpenChange={setShowDelete}
                folderIds={folderIds}
                fileIds={fileIds}
                parentFolderId={parentFolderId}
                onSuccess={() => {
                    clearSelection()
                    setShowDelete(false)
                }}
            />
            <ShareEveryoneDialog
                open={showShareEveryone}
                onOpenChange={setshowShareEveryone}
                folderId={folderIds}
                fileId={fileIds}
            />

        </div>
    )
}

export default BulkMenuItems
