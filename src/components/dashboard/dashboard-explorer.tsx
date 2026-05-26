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
import { Dialog, DialogContent } from "../ui/dialog";
import PdfViewer from "../common/pdf-viewer";

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

    const handleOpenFile = (
        fileId: string
    ) => {
        setSelectedFileId(fileId);
    };

    if (isPending || isFetching) {
        return <Loader />
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="w-full flex justify-end">
                <BreadcrumbComponent />
            </div>

            {/* FOLDERS */}
            <Collapsible open={folderOpen} onOpenChange={setFolderOpen}>
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
                        <Folder
                            className="
                                w-5
                                h-5
                                text-yellow-500
                            "
                        />
                        <h2 className="font-semibold text-lg">
                            Folders
                        </h2>
                        <span
                            className="
                                text-xs
                                bg-muted
                                px-2
                                py-0.5
                                rounded-full
                            "
                        >
                            {data?.data?.folders?.length || 0}
                        </span>
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
                        onOpenFolder={(folderId) => {
                            navigate(`${adminRoute.dashboard.base}/${folderId}`);
                        }}
                    />
                </CollapsibleContent>
            </Collapsible>

            {/* FILES */}
            <Collapsible open={fileOpen} onOpenChange={setFileOpen}>
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
                        <FileText
                            className="
                                w-5
                                h-5
                                text-blue-500
                            "
                        />
                        <h2 className="font-semibold text-lg">
                            Files
                        </h2>
                        <span
                            className="
                                text-xs
                                bg-muted
                                px-2
                                py-0.5
                                rounded-full
                            "
                        >
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
                        onOpenFile={handleOpenFile}
                    />
                </CollapsibleContent>
            </Collapsible>

            <Dialog
                open={!!selectedFileId}
                onOpenChange={() =>
                    setSelectedFileId(null)
                }
            >
                <DialogContent
                    className="
         max-w-7xl
         h-[95vh]
         p-0
         overflow-hidden
      "
                >
                    {selectedFileId && (
                        <PdfViewer
                            fileId={selectedFileId}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DashboardExplorer;