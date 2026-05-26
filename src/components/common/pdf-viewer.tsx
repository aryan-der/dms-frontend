"use client";

import { useState, useMemo } from "react";
import { Document, Page } from "react-pdf";
import { FixedSizeList as List } from "react-window";
import { fileEndpoint } from "@/const/endpoints";

type Props = {
    fileId: string;
};

const PAGE_HEIGHT = 1100;

export default function PdfViewer({ fileId }: Props) {
    const pdfUrl = fileEndpoint.viewFile(fileId);

    const file = useMemo(() => {
        const loginData = localStorage.getItem("login-data");
        const token = loginData ? JSON.parse(loginData)?.jwtToken : "";
        return {
            url: pdfUrl,
            httpHeaders: {
                Authorization: `Bearer ${token}`,
            },
        };
    }, [pdfUrl]);

    const [numPages, setNumPages] = useState(0);

    return (
        <div
            className="h-full w-full bg-black overflow-hidden"
            onContextMenu={e => e.preventDefault()}
        >
            <Document
                file={file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                    <div className="text-white flex justify-center items-center h-full">
                        Loading document...
                    </div>
                }
                error={
                    <div className="text-red-500 flex justify-center items-center h-full">
                        Failed to load PDF
                    </div>
                }
            >
                <List
                    height={window.innerHeight}
                    itemCount={numPages}
                    itemSize={PAGE_HEIGHT}
                    width={"100%"}
                >
                    {({ index, style }) => (
                        <div style={style} className="flex justify-center py-4">
                            <Page
                                pageNumber={index + 1}
                                width={900}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </div>
                    )}
                </List>
            </Document>
        </div>
    );
}