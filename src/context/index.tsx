import type { ReactNode } from "react";
import { UserProvider } from "./user/user-context";

export function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}