"use client";

import {
  Home,
  Users,
  Building2,
  MapPin,
  FileText,
  Settings,
  ChevronRight,
  Sprout,
  CreditCard,
  UserPlus,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Grower Management",
    icon: Users,
    items: [
      {
        title: "Grower Register",
        url: "/growers/register",
        icon: UserPlus,
      },
      {
        title: "Grower List",
        url: "/growers",
        icon: Users,
      },
    ],
  },
  {
    title: "Contracts",
    icon: FileText,
    items: [
      {
        title: "Pre-contract Form",
        url: "/contracts/pre-contract",
        icon: FileText,
      },
      {
        title: "Contract List",
        url: "/contracts",
        icon: FileText,
      },
    ],
  },
  {
    title: "Bank Information",
    url: "/bank-info",
    icon: CreditCard,
  },
  {
    title: "Locations",
    url: "/locations",
    icon: MapPin,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-blue-200/30 bayer-blue-gradient">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bayer-green-gradient flex items-center justify-center shadow-lg">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Smart Grower</h2>
            <p className="text-sm text-blue-100">Agriculture Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-100 font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full hover:bg-white/20 data-[active=true]:bg-green-500/30 data-[active=true]:text-white transition-all text-blue-100">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className="hover:bg-white/20 data-[active=true]:bg-green-500/30 data-[active=true]:text-white transition-all text-blue-100"
                              >
                                <Link href={subItem.url}>
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="hover:bg-white/20 data-[active=true]:bg-green-500/30 data-[active=true]:text-white transition-all text-blue-100"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-white/20 transition-all text-blue-100">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
