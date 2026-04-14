"use client";

import { EllipsisVertical, LogOut, TreePalm } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AppSidebar() {
  const { isMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="font-semibold">
                <div className="bg-teal-400 flex items-center justify-center p-2 rounded">
                  <TreePalm />
                </div>
                UmrahIn
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="rounded-lg">A</AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <h4 className="truncate font-medium">
                      Adhitya Ramadhan Putra
                    </h4>
                    <p className="text-muted-foreground truncate text-xs">
                      Admin
                    </p>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar>
                      <AvatarImage src="" alt="" />
                      <AvatarFallback className="rounded-lg">A</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <h4 className="truncate font-medium">
                        Adhitya Ramadhan Putra
                      </h4>
                      <p className="text-muted-foreground truncate text-xs">
                        Admin
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
