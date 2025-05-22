import { AppSidebar } from "@/components/common/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Link, Outlet, useLocation } from "react-router-dom"
import { getBreadcrumbs } from "@/app/utils/breadcrumbs"
import React from "react"

export default function HomeLayout() {
    const location = useLocation();
    const breadcrumbs = getBreadcrumbs(location.pathname);

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full flex flex-col h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={crumb.path}>
                                        <BreadcrumbItem>
                                            {index === breadcrumbs.length - 1 ? (
                                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                            ) : (
                                                <Link to={crumb.path}>
                                                    <BreadcrumbLink >
                                                        {crumb.label}
                                                    </BreadcrumbLink>
                                                </Link>
                                            )}
                                        </BreadcrumbItem>
                                        {index < breadcrumbs.length - 1 && (
                                            <BreadcrumbSeparator />
                                        )}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main>
                    {/* <SidebarTrigger /> */}
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}
