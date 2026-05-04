import type { UserDataType } from "@/types/user-data-types"
import React, { createContext, useContext, useState } from "react"

type UserContextValue = {
    user: UserDataType | null
    setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserDataType | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider")
    }
    return context
}