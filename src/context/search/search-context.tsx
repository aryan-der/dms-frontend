// context/search-context.tsx

import { createContext, useContext, useState } from "react";

type SearchContextType = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SearchContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useSearch must be used within SearchProvider");
    }

    return context;
};