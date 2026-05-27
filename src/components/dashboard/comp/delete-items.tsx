import useFolder from "@/hooks/use-folder"
import { FiTrash2 } from "react-icons/fi"

type DeleteButtonProps = {
    folderIds?: string[]
    fileIds?: string[]
    parentFolderId?: string
    className?: string
    onSuccess?: () => void
}

export default function DeleteItemsButton({
    folderIds = [],
    fileIds = [],
    parentFolderId,
    className = "",
    onSuccess,
}: DeleteButtonProps) {

    const { useDeleteItems } = useFolder()
    const { mutate, isPending } = useDeleteItems()

    const handleDelete = () => {
        mutate(
            {
                folderIds,
                fileIds,
                parentFolderId,
            },
            {
                onSuccess: () => {
                    onSuccess?.()
                },
            }
        )
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className={`
        flex w-full items-center gap-2
        text-red-500 hover:text-red-600
        disabled:opacity-50
        ${className}
      `}
        >
            <FiTrash2 size={14} />

            {isPending ? "Deleting..." : "Move to trash"}
        </button>
    )
}