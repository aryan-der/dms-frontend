import useFolder from "@/hooks/use-folder";
import FolderCard from "./folder-card";
import FileCard from "./file-card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    ChevronDown,
    ChevronRight,
    Folder,
    FileText,
} from "lucide-react";

import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { adminRoute } from "@/const/route";
import { BreadcrumbComponent } from "../common/Breadcrumb";
import Loader from "../common/Loader";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FilePreview from "../common/file-preview";
import BulkMenuItems from "./comp/bulk-menu-items";
import type { FileType } from "@/types/data/file-types";

const DashboardExplorer = () => {
    const { useGetContent } = useFolder();
    const navigate = useNavigate();

    const { parentFolderId: routeFolderId } = useParams();

    const {
        data,
        isPending,
        isFetching,
    } = useGetContent({
        parentFolderId: routeFolderId,
    });

    const [folderOpen, setFolderOpen] = useState(true);
    const [fileOpen, setFileOpen] = useState(true);
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<{
        folders: string[];
        files: string[];
    }>({
        folders: [],
        files: [],
    });

    const selectedFile = data?.data?.files?.find(
        (file: FileType) => file._id === selectedFileId
    );
    const handleOpenFile = (
        fileId: string
    ) => {
        setSelectedFileId(fileId);
    };

    if (isPending || isFetching) {
        return <Loader />
    }

    const clearSelection = () => {
        setSelectedItems({
            folders: [],
            files: [],
        });
    };

    const handleFolderSelect = (
        folderId: string,
        multi = false
    ) => {
        setSelectedItems((prev) => ({
            ...prev,
            folders: multi
                ? prev.folders.includes(folderId)
                    ? prev.folders.filter((id) => id !== folderId)
                    : [...prev.folders, folderId]
                : prev.folders.includes(folderId)
                    ? []
                    : [folderId],
        }));
    };

    const handleFileSelect = (
        fileId: string,
        multi = false
    ) => {
        setSelectedItems((prev) => ({
            ...prev,
            files: multi
                ? prev.files.includes(fileId)
                    ? prev.files.filter((id) => id !== fileId)
                    : [...prev.files, fileId]
                : prev.files.includes(fileId)
                    ? []
                    : [fileId],
        }));
    };

    const handleOpenFolder = (folderId: string) => {
        navigate(`${adminRoute.dashboard.base}/${folderId}`);
        clearSelection()
    }

    const totalSelected = selectedItems.folders.length + selectedItems.files.length;


    return (
        <div className="relative flex h-[calc(100vh-140px)] flex-col">

            <div className="mb-4 flex items-center justify-end">
                <BreadcrumbComponent />
            </div>

            {/* Scroll Container */}
            <div className="custom-scrollbar flex-1 overflow-y-auto">

                {/* FOLDERS */}
                <Collapsible
                    open={folderOpen}
                    onOpenChange={setFolderOpen}
                >
                    <CollapsibleTrigger
                        className="
                        sticky
                        top-0
                        z-50
                        w-full
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        border
                        bg-card
                        px-4
                        py-3
                        hover:bg-muted/60
                        transition-all
                        cursor-pointer
                    "
                    >
                        <div className="flex items-center gap-2">
                            {totalSelected > 0 ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <BulkMenuItems
                                        totalSelected={totalSelected}
                                        clearSelection={clearSelection}
                                        selectedItems={selectedItems}
                                    />
                                </div>
                            ) : (
                                <>
                                    <Folder className="w-5 h-5 text-yellow-500" />

                                    <h2 className="font-semibold text-lg">
                                        Folders
                                    </h2>

                                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                        {data?.data?.folders?.length || 0}
                                    </span>
                                </>
                            )}
                        </div>

                        {folderOpen ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pt-4">
                        <FolderCard
                            folders={data?.data?.folders || []}
                            selectedFolders={selectedItems.folders}
                            onSelectFolder={handleFolderSelect}
                            onOpenFolder={handleOpenFolder}
                        />
                    </CollapsibleContent>
                </Collapsible>

                {/* FILES */}
                <Collapsible
                    open={fileOpen}
                    onOpenChange={setFileOpen}
                    className="mt-6"
                >
                    <CollapsibleTrigger
                        className="
                        w-full
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        border
                        bg-card
                        px-4
                        py-3
                        hover:bg-muted/60
                        transition-all
                        cursor-pointer
                    "
                    >
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />

                            <h2 className="font-semibold text-lg">
                                Files
                            </h2>

                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                {data?.data?.files?.length || 0}
                            </span>
                        </div>

                        {fileOpen ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pt-4">
                        <FileCard
                            files={data?.data?.files || []}
                            selectedFiles={selectedItems.files}
                            onSelectFile={handleFileSelect}
                            onOpenFile={handleOpenFile}
                        />
                    </CollapsibleContent>
                </Collapsible>

            </div>

            <Drawer
                open={!!selectedFileId}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedFileId(null);
                    }
                }}
            >
                <DrawerContent className="min-h-screen">
                    <div className="flex items-center justify-between border-b px-4 pb-3">
                        <span className="font-medium text-lg truncate">
                            {selectedFile?.originalName || "PDF Preview"}
                        </span>
                        <button
                            onClick={() =>
                                setSelectedFileId(null)
                            }
                            className="cursor-pointer hover:scale-105 transition-transform duration-200"
                        >
                            <AiOutlineCloseCircle size={26} />
                        </button>
                    </div>
                    {selectedFileId && (
                        <FilePreview fileId={selectedFileId} mimeType={selectedFile?.mimeType ?? ""} />
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default DashboardExplorer;

