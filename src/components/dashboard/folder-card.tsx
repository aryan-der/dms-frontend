import type { FolderCardProps } from "@/types/data/folder-types"
import React, { useRef } from "react"

import {
    FiFolder,
    FiCheck,
} from "react-icons/fi"
import DropdownItems from "./comp/dropdown-items"

type Props = FolderCardProps & {
    selectedFolders: string[];
    onSelectFolder: (
        folderId: string,
        multi?: boolean
    ) => void;
};

const FolderCard: React.FC<Props> = ({
    folders = [],
    onOpenFolder,
    selectedFolders,
    onSelectFolder,
}) => {

    const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleClick = (
        folderId: string,
        multi: boolean
    ) => {
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
        }

        clickTimeout.current = setTimeout(() => {
            onSelectFolder(folderId, multi);
        }, 100);
    };

    const handleDoubleClick = (
        folderId: string
    ) => {
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
        }

        onOpenFolder?.(folderId);
    };

    return (
        <div className="flex flex-wrap gap-4">
            {folders.map((folder) => {
                const isSelected = selectedFolders.includes(folder._id)

                return (
                    <div
                        key={folder._id}
                        onClick={(e) =>
                            handleClick(
                                folder._id,
                                e.ctrlKey || e.metaKey
                            )
                        }

                        onDoubleClick={() => handleDoubleClick(folder._id)}
                        onContextMenu={(e) => {
                            e.preventDefault();

                            onSelectFolder(
                                folder._id,
                                true
                            );
                        }}
                        className={`group relative flex max-w-[260px] min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm transition-all duration-200 select-none hover:bg-muted/40 hover:shadow-md ${isSelected ? "border-primary bg-primary/5" : "border-border"
                            } `}
                    >
                        {isSelected && (
                            <div className="absolute top-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                                <FiCheck size={12} />
                            </div>
                        )}

                        {/* Folder Icon */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                            <FiFolder size={24} className="text-yellow-600" />
                        </div>

                        {/* Folder Name */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{folder.name}</p>
                        </div>

                        {/* 3 Dot Menu */}
                        <div
                            className="relative top-2.5 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DropdownItems
                                folder={folder}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FolderCard
