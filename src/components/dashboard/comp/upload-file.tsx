import useFile from "@/hooks/use-files";
import React from "react";

type UploadFileProps = {
    children: React.ReactNode;
    folderId?: string | number | null;
};

const UploadFile = ({
    children,
    folderId = null,
}: UploadFileProps) => {

    const { useFileUpload } = useFile();

    const uploadFileMutation = useFileUpload();

    // Handle upload file
    const handleUploadFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (
            !e.target.files ||
            e.target.files.length === 0
        ) {
            return;
        }

        Array.from(e.target.files).forEach((file) => {

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            if (folderId !== null && folderId !== undefined) {
                formData.append(
                    "folderId",
                    String(folderId)
                );
            }

            uploadFileMutation.mutate(
                formData
            );
        });

        e.target.value = "";
    };

    return (
        <>
            <div
                onClick={() => {
                    document
                        .getElementById("upload-files-input")
                        ?.click();
                }}
            >
                {children}
            </div>

            <input
                id="upload-files-input"
                type="file"
                hidden
                multiple
                onChange={handleUploadFileChange}
            />
        </>
    );
};

export default UploadFile;