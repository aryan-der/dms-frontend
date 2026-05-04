import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1 * 60 * 1000,
                        refetchOnWindowFocus: true,
                        refetchOnReconnect: true,
                        retryOnMount: true,
                        retry: 1
                    },
                    mutations: {
                        retry: 0,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}