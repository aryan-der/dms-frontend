import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavProjects } from "../nav-projects"
import { IoHome } from "react-icons/io5";
import { useParams } from "react-router-dom"
import { shareChildRoute } from "@/const/route"
import { ShareUser } from "../share-user"

function ShareSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { token } = useParams<{ token: string }>()
    if (!token) {
        return null
    }

    const data = {
        teams: [
            {
                name: "Document Management System",
                logo: <GalleryVerticalEnd />,
                plan: "Enterprise",
            },
        ],
        projects: [
            {
                name: "Home",
                url: shareChildRoute.share.replace(":token", token),
                icon: IoHome,
            },
        ],
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent p-2 data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <GalleryVerticalEnd />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-bold text-md">Document System</span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <ShareUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default ShareSidebar