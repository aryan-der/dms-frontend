import type { FileType } from "@/types/data/file-types";
import React from "react";
import { FiFile } from "react-icons/fi";

type FileCardProps = {
    files?: FileType[];
    onOpenFile?: (fileId: string) => void;
};

const FileCard: React.FC<FileCardProps> = ({
    files = [],
    onOpenFile,
}) => {
    return (
        <div className="flex gap-2 flex-wrap">
            {files.map((file) => (
                <div
                    key={file._id}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-card hover:bg-muted/80 transition-colors duration-150 cursor-pointer min-w-[160px] shadow-sm border"
                    style={{
                        margin: 4,
                        minWidth: 180,
                        maxWidth: 240,
                    }}
                    onClick={() => onOpenFile?.(file._id)}
                >
                    <FiFile size={20} className="mr-2 text-blue-500" />
                    <span className="font-medium truncate flex-1">
                        {file.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default FileCard;

