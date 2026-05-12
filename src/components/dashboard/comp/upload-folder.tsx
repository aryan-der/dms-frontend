import { useParentFolderId } from "@/context/folder/folder-id-context";
import useFolder from "@/hooks/use-folder";
import React from "react";

type UploadFolderProps = {
    children: React.ReactNode;
};

const UploadFolder = ({
    children,
}: UploadFolderProps) => {

    const { useUploadFolder } = useFolder();
    const { parentFolderId } = useParentFolderId()
    const uploadFolderMutation =
        useUploadFolder();

    const handleUploadFolderChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (
            !e.target.files ||
            e.target.files.length === 0
        ) {
            return;
        }

        const formData = new FormData();

        Array.from(e.target.files).forEach(
            (file) => {

                formData.append(
                    "files",
                    file
                );

                formData.append(
                    "paths",
                    file.webkitRelativePath
                );
            }
        );
        uploadFolderMutation.mutate(
            {
                formData,
                parentFolderId,
            }
        );
    };

    return (
        <>
            <div
                onClick={() => {
                    document
                        .getElementById(
                            "upload-folder-input"
                        )
                        ?.click();
                }}
            >
                {children}
            </div>

            <input
                id="upload-folder-input"
                type="file"
                hidden
                multiple
                // @ts-expect-error
                webkitdirectory=""
                // @ts-expect-error
                directory=""
                onChange={
                    handleUploadFolderChange
                }
            />
        </>
    );
};

export default UploadFolder;