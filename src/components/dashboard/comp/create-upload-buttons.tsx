import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import CreateFolder from './create-folder';
import { FolderPlus, Upload, UploadCloud } from 'lucide-react';
import UploadFolder from './upload-folder';
import UploadFile from './upload-file';
import { useParentFolderId } from '@/context/folder/folder-id-context';

const CreateUploadButtons = () => {
    const { parentFolderId } = useParentFolderId()
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

                <UploadFile folderId={parentFolderId}>
                    <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <Upload className="w-4 h-4" />
                        Upload File
                    </DropdownMenuItem>
                </UploadFile>
            </DropdownMenuContent>
        </div>
    )
}

export default CreateUploadButtons