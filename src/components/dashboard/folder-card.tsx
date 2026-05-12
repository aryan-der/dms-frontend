import type { FolderCardProps } from "@/types/data/folder-types";
import React from "react";
import { FiFolder } from "react-icons/fi";

const FolderCard: React.FC<FolderCardProps> = ({
    folders = [],
    onOpenFolder,
}) => {

    return (
        <div className="flex gap-2 flex-wrap">
            {folders.map((folder) => (
                <div
                    key={folder._id}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors duration-150 cursor-pointer min-w-[160px] shadow-sm border"
                    style={{
                        margin: 4,
                        minWidth: 180,
                        maxWidth: 240,
                    }}
                    onClick={() => onOpenFolder?.(folder._id)}
                >
                    <FiFolder size={20} className="mr-2 text-yellow-500" />
                    <span className="font-medium truncate flex-1">
                        {folder.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default FolderCard;