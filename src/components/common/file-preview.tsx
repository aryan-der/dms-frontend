import Loader from "@/components/common/Loader";
import useFile from "@/hooks/use-files";
import { useEffect } from "react";

type Props = {
    fileId: string;
    mimeType: string;
};

const FilePreview = ({
    fileId,
    mimeType,
}: Props) => {
    const { useFileViewer } = useFile();

    const {
        data: fileUrl,
        isPending,
        error,
    } = useFileViewer({
        fileId,
    });

    useEffect(() => {
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileUrl]);

    if (isPending) {
        return <Loader />;
    }

    if (error || !fileUrl) {
        return (
            <div className="flex items-center justify-center h-full">
                Failed to load file
            </div>
        );
    }

    // PDF
    if (mimeType === "application/pdf") {
        return (
            <div className="w-full h-[calc(100vh-70px)]">
                <iframe
                    src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0#view=FitH#zoom=page-width`}
                    className="w-full
          h-full
          border-0
          bg-white"
                    title="PDF Preview"
                />
            </div>
        );
    }

    // IMAGE
    if (mimeType.startsWith("image/")) {
        return (
            <div className=" h-[calc(100vh-80px)]
        w-full
        flex
        items-center
        justify-center
        overflow-hidden
        p-4">
                <img
                    src={fileUrl}
                    alt="Preview"
                    className="
max-h-full
          max-w-full
          object-contain
          select-none
          "
                />
            </div>
        );
    }

    // VIDEO
    if (mimeType.startsWith("video/")) {
        return (
            <div
                className="
        w-full
        h-[calc(100vh-70px)]
        flex
        items-center
        justify-center
        p-2 sm:p-4
      "
            >
                <video
                    controls
                    className="
          max-h-full
          max-w-full
          rounded-lg
          object-contain
        "
                >
                    <source
                        src={fileUrl}
                        type={mimeType}
                    />
                </video>
            </div>
        );
    }

    /* AUDIO */
    if (mimeType.startsWith("audio/")) {
        return (
            <div
                className="
        w-full
        h-[calc(100vh-70px)]
        flex
        items-center
        justify-center
        px-4
      "
            >
                <audio
                    controls
                    className="
          w-full
          max-w-2xl
        "
                >
                    <source
                        src={fileUrl}
                        type={mimeType}
                    />
                </audio>
            </div>
        );
    }

    // OTHER FILES
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <p>
                Preview not available for this file type.
            </p>

            <a
                href={fileUrl}
                download
                className="
          px-4
          py-2
          border
          rounded-md
        "
            >
                Download File
            </a>
        </div>
    );
};

export default FilePreview;