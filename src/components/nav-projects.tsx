"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { FolderIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {
  const { state, isMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {projects.map((item) => {
          const Icon = item.icon

          if (state === "collapsed") {
            return (
              <SidebarMenuItem key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <Icon className="size-6" />
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            )
          }

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <Icon className="size-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>

              <DropdownMenu>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <FolderIcon className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}