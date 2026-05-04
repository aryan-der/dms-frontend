import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryProvider } from "./tanstack/query";
import { ContextProvider } from "@/context";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <TooltipProvider>
                <BrowserRouter>
                    <ContextProvider>
                        <SidebarProvider>
                            {children}
                            <Toaster position="top-right" />
                        </SidebarProvider>
                    </ContextProvider>
                </BrowserRouter>
            </TooltipProvider >
        </QueryProvider>
    )
}