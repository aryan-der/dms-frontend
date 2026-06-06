import type { ReactNode } from "react";
import { UserProvider } from "./user/user-context";
import { ParentFolderIdProvider } from "./folder/folder-id-context";
import { SearchProvider } from "./search/search-context";

export function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            <ParentFolderIdProvider>
                <SearchProvider>
                    {children}
                </SearchProvider>
            </ParentFolderIdProvider>
        </UserProvider>
    )
}