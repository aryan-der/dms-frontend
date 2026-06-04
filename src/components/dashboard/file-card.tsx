import type { FileType } from "@/types/data/file-types"
import React from "react"

import {
    FiFile,
    FiCheck,
} from "react-icons/fi"
import DropdownItems from "./comp/dropdown-items"

type FileCardProps = {
    files?: FileType[];
    selectedFiles: string[];
    onSelectFile: (
        fileId: string,
        multi?: boolean
    ) => void;
    onOpenFile?: (
        fileId: string
    ) => void;
};

const FileCard: React.FC<FileCardProps> = ({
    files = [],
    selectedFiles,
    onSelectFile,
    onOpenFile,
}) => {

    return (
        <div className="flex flex-wrap gap-4">
            {files.map((file) => {
                const isSelected = selectedFiles.includes(file._id)

                return (
                    <div
                        key={file._id}
                        onClick={(e) => {
                            onSelectFile(
                                file._id,
                                e.ctrlKey || e.metaKey
                            );
                        }}
                        onDoubleClick={() => {
                            onOpenFile?.(file._id);
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();

                            onSelectFile(
                                file._id,
                                true
                            );
                        }}
                        className={`group relative flex max-w-[260px] min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm transition-all duration-200 select-none hover:bg-muted/40 hover:shadow-md ${isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border"
                            }`}
                    >
                        {isSelected && (
                            <div className="absolute top-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                                <FiCheck size={12} />
                            </div>
                        )}

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                            <FiFile size={22} className="text-blue-600" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {file.name}
                            </p>
                        </div>

                        <div
                            className="relative top-3 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DropdownItems
                                folder={file}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FileCard