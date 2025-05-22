import { matchPath } from "react-router-dom";

interface BreadcrumbConfig {
    path: string;
    label: string;
    parent?: string;
}

export const breadcrumbConfig: BreadcrumbConfig[] = [
    { path: "/", label: "Home" },
    { path: "/my-issues", label: "My Issues", parent: "/" },
    { path: "/my-issues/:id", label: "Issue Details", parent: "/my-issues" },
    { path: "/public-issues", label: "Public Issues", parent: "/" },
    { path: "/analytics", label: "Analytics", parent: "/" },
    { path: "/map-view", label: "Map View", parent: "/" },
];

export function getBreadcrumbs(
    pathname: string
): { path: string; label: string }[] {
    const breadcrumbs: { path: string; label: string }[] = [];

    // Find the matching route configuration
    const matchingConfig = breadcrumbConfig.find(
        (config) => matchPath(config.path, pathname) !== null
    );

    if (!matchingConfig) return breadcrumbs;

    // Add parent breadcrumbs
    let currentConfig: BreadcrumbConfig | undefined = matchingConfig;
    while (currentConfig) {
        breadcrumbs.unshift({
            path: currentConfig.path,
            label: currentConfig.label,
        });

        // Find parent config
        currentConfig = currentConfig.parent
            ? breadcrumbConfig.find(
                  (config) => config.path === currentConfig?.parent
              )
            : undefined;
    }

    return breadcrumbs;
}
