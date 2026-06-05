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
import { NavUser } from "../nav-user"
import { MdFolderShared, MdAudiotrack } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaHardDrive } from "react-icons/fa6";
import { BsStarFill } from "react-icons/bs";
import { FaTrashRestore } from "react-icons/fa"
import { FaUsers } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { adminRoute } from "@/const/route"

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
            url: adminRoute.dashboard.base,
            icon: IoHome
        },
        {
            name: "Documents",
            url: adminRoute.documents.base,
            icon: FaHardDrive,
        },
        {
            name: "Gallery",
            url: adminRoute.gallery.base,
            icon: IoMdPhotos,
        },
        {
            name: "Audios",
            url: adminRoute.audios.base,
            icon: MdAudiotrack,
        },
        {
            name: "Shared with me",
            url: adminRoute.sharedwithme.base,
            icon: MdFolderShared,
        },
        {
            name: "Users",
            url: adminRoute.users.base,
            icon: FaUsers,
        },
        {
            name: "Favourite",
            url: adminRoute.favourite.base,
            icon: BsStarFill,
        },
        {
            name: "Trash",
            url: adminRoute.trash.base,
            icon: FaTrashRestore,
        },
    ]
}

function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                        <span className="truncate font-bold text-md">Secure Drive</span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AdminSidebar