import useFolder from "@/hooks/use-folder";
import React from "react";
import { useParams } from "react-router-dom";

type UploadFolderProps = {
    children: React.ReactNode;
};

const UploadFolder = ({
    children,
}: UploadFolderProps) => {

    const { useUploadFolder } = useFolder();
    const uploadFolderMutation = useUploadFolder();
    const { parentFolderId: rawParentFolderId } = useParams();
    // Ensure parentFolderId is a string, not null, for FormData append
    const parentFolderId = rawParentFolderId ?? "";

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

        // Always append as a string; FormData does not accept null
        formData.append("parentFolderId", parentFolderId);

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
            },
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
                // @ts-expect-error for webkitdirectory: this is a non-standard attribute necessary for folder selection
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