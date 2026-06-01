import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { shareRoute } from "@/const/route"
import { ChevronsUpDownIcon, SparklesIcon, LogOutIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ShareUser() {
    const { isMobile } = useSidebar()
    const navigate = useNavigate();

    const handleLogout = () => {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith("share_access_")) {
                sessionStorage.removeItem(key)
            }
        });
        navigate(shareRoute.share);
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarFallback className="rounded-lg">
                                    <SparklesIcon className="w-5 h-5 opacity-60" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Secure Drive</span>
                            </div>
                            <ChevronsUpDownIcon className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => navigate("/")}>
                                <SparklesIcon />
                                Open Secure Drive
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="cursor-pointer"
                            variant="destructive"
                            onClick={handleLogout}
                        >
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
