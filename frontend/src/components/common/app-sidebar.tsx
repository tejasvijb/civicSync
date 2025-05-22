import { ChartSpline, MapPinned, BadgeAlert, FolderKanban, CloudAlert, User2, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/store/useAuth";
import { Link, useNavigate } from "react-router-dom";
// Menu items.
const items = [
    {
        title: "My issues",
        url: "/my-issues",
        pathmatch: "/my-issues",
        icon: BadgeAlert,
    },
    {
        title: "Public issues",
        url: "/public-issues?page=1",
        pathmatch: "/public-issues",
        icon: FolderKanban,
    },
    {
        title: "Analytics",
        url: "/analytics",
        pathmatch: "/analytics",
        icon: ChartSpline,
    },
    {
        title: "Map View",
        url: "/map-view",
        pathmatch: "/map-view",
        icon: MapPinned,
    },
]

console.log(location.pathname)


export function AppSidebar() {

    const navigate = useNavigate();
    const user = useAuth((state) => state.user);
    const handleLogout = () => {
        useAuth.getState().logout();
        navigate('/auth/login');
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <CloudAlert className="h-5 w-5" />
                                <span className="text-base font-semibold">Civic Sync</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Make the active link bold */}
                            {items.map((item) => (
                                <SidebarMenuItem className={`${location.pathname.includes(item.pathmatch) && location.pathname !== '/' ? 'font-bold bg-gray-200' : ''}`} key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button className="w-full">
                                <User2 className="h-4 w-4" />
                                <span>{user?.username}</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button onClick={handleLogout} className="w-full text-red-500 hover:text-red-600">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
