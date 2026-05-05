import type { ReactNode } from "react";
import { UserProvider } from "./user/user-context";
import { ParentFolderIdProvider } from "./folder/folder-id-context";

export function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            <ParentFolderIdProvider>
                {children}
            </ParentFolderIdProvider>
        </UserProvider>
    )
}