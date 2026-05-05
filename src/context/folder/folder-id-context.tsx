import { createContext, useContext, useState, type ReactNode } from "react";

type ParentFolderIdContextType = {
    parentFolderId: string | number | null;
    setParentFolderId: (id: string | number | null) => void;
};

const ParentFolderIdContext = createContext<ParentFolderIdContextType | undefined>(undefined);

export const ParentFolderIdProvider = ({ children }: { children: ReactNode }) => {
    const [parentFolderId, setParentFolderId] = useState<string | number | null>(null);

    return (
        <ParentFolderIdContext.Provider value={{ parentFolderId, setParentFolderId }}>
            {children}
        </ParentFolderIdContext.Provider>
    );
};

export const useParentFolderId = () => {
    const context = useContext(ParentFolderIdContext);
    if (context === undefined) {
        throw new Error("useParentFolderId must be used within a ParentFolderIdProvider");
    }
    return context;
};