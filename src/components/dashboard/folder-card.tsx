import type { FolderCardProps } from "@/types/data/folder-types"
import React, { useState } from "react"

import {
    FiFolder,
    FiCheck,
} from "react-icons/fi"
import DropdownItems from "./comp/dropdown-items"

type Props = FolderCardProps & {
    onRenameFolder?: (folderId: string) => void
    onDeleteFolder?: (folderId: string) => void
}

const FolderCard: React.FC<Props> = ({
    folders = [],
    onOpenFolder,
}) => {
    const [selectedFolders, setSelectedFolders] = useState<string[]>([])

    // Single Click: Only one folder selected at a time
    const handleSelectFolder = (folderId: string) => {
        setSelectedFolders(prev => prev.includes(folderId) ? [] : [folderId])
    }

    // Right Click: Allow multi-select
    const handleRightClickSelect = (folderId: string) => {
        setSelectedFolders(prev => {
            if (prev.includes(folderId)) {
                // Deselect if already selected
                return prev.filter(id => id !== folderId)
            }
            // Add to selection (multi select enabled)
            return [...prev, folderId]
        })
    }

    // Double Click: Open Folder
    const handleDoubleClick = (folderId: string) => {
        onOpenFolder?.(folderId)
    }

    // When a folder card's 3-dot menu is opened, select it for actions
    const handleSelectForDropdown = (folderId: string) => {
        setSelectedFolders([folderId])
    }

    return (
        <div className="flex flex-wrap gap-4">
            {folders.map((folder) => {
                const isSelected = selectedFolders.includes(folder._id)

                return (
                    <div
                        key={folder._id}
                        // Single Click -> Only one active selection
                        onClick={(e) => {
                            // Ignore ctrl/meta for this click (normal single click)
                            if (!e.ctrlKey && !e.metaKey) {
                                handleSelectFolder(folder._id)
                            }
                        }}
                        // Double Click -> Open Folder
                        onDoubleClick={() => handleDoubleClick(folder._id)}
                        // Right Click -> Multi select
                        onContextMenu={(e) => {
                            e.preventDefault()
                            handleRightClickSelect(folder._id)
                        }}
                        className={`group relative flex max-w-[260px] min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm transition-all duration-200 select-none hover:bg-muted/40 hover:shadow-md ${isSelected ? "border-primary bg-primary/5" : "border-border"
                            } `}
                    >
                        {/* Selected Check */}
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
                            className="flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DropdownItems
                                folder={folder}
                                onSelectFolder={handleSelectForDropdown}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FolderCard
