import useFolder from "@/hooks/use-folder"

import {
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialog,
} from "@/components/ui/alert-dialog"

type DeleteButtonProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    folderIds?: string[]
    fileIds?: string[]
    parentFolderId?: string
    className?: string
    onSuccess?: () => void
}

export default function DeleteItemsButton({
    open = false,
    onOpenChange,
    folderIds = [],
    fileIds = [],
    parentFolderId,
    className = "",
    onSuccess
}: DeleteButtonProps) {
    const { useDeleteItems } = useFolder()
    const { mutate, isPending } = useDeleteItems()

    const totalItems = folderIds.length + fileIds.length

    const handleDelete = () => {
        mutate(
            {
                folderIds,
                fileIds,
                parentFolderId,
            },
            {
                onSuccess: () => {
                    onOpenChange(false)
                    onSuccess?.()
                },
            }
        )
    }

    return (
        <>
            <button
                onClick={() => onOpenChange(true)}
                className={className}
            >
            </button>

            <AlertDialog
                open={open}
                onOpenChange={(value) => {
                    if (!isPending) {
                        onOpenChange(value)
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Items
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{totalItems}</strong>{" "}
                            selected item
                            {totalItems > 1 ? "s" : ""}?

                            <div className="mt-3 space-y-1">
                                {folderIds.length > 0 && (
                                    <p>
                                        📁 {folderIds.length} Folder
                                        {folderIds.length > 1 ? "s" : ""}
                                    </p>
                                )}

                                {fileIds.length > 0 && (
                                    <p>
                                        📄 {fileIds.length} File
                                        {fileIds.length > 1 ? "s" : ""}
                                    </p>
                                )}
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete()
                            }}
                            disabled={isPending}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {isPending
                                ? "Deleting..."
                                : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}