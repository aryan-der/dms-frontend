import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import CreateFolder from './create-folder';
import { FolderPlus, Upload, UploadCloud, ImagePlus } from 'lucide-react';
import UploadFolder from './upload-folder';
import UploadFile from './upload-file';
import { useParams, useLocation } from 'react-router-dom';
import React from 'react';
import { adminRoute } from '@/const/route';

const UploadMedia = ({ children }: { children: React.ReactNode }) => {
    // Stub implementation, please replace with actual upload logic if needed
    return <>{children}</>;
};

const CreateUploadButtons = () => {
    const { parentFolderId } = useParams();
    const location = useLocation();
    const currentPath = location.pathname;

    const isDocumentsRoute = currentPath.startsWith(adminRoute.documents.base);
    const isGalleryRoute = currentPath.startsWith(adminRoute.gallery.base);

    return (
        <div>
            <DropdownMenuContent align="end" className="w-48">
                <CreateFolder>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                        <FolderPlus className="w-4 h-4" /> Create Folder
                    </DropdownMenuItem>
                </CreateFolder>

                <UploadFolder>
                    <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={e => {
                            e.preventDefault();
                        }}
                    >
                        <UploadCloud className="w-4 h-4" /> Upload Folder
                    </DropdownMenuItem>
                </UploadFolder>

                {isDocumentsRoute && (
                    <UploadFile folderId={parentFolderId}>
                        <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Upload className="w-4 h-4" />
                            Upload File
                        </DropdownMenuItem>
                    </UploadFile>
                )}

                {isGalleryRoute && (
                    <UploadMedia>
                        <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <ImagePlus className="w-4 h-4" />
                            Upload Media
                        </DropdownMenuItem>
                    </UploadMedia>
                )}
            </DropdownMenuContent>
        </div>
    )
}

export default CreateUploadButtons