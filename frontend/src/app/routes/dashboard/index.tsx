import { ChartSpline, MapPinned, BadgeAlert, FolderKanban } from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
    const features = [
        {
            title: "My Issues",
            description: "Track and manage your reported issues",
            icon: BadgeAlert,
            link: "/my-issues"
        },
        {
            title: "Public Issues",
            description: "Browse and discover community reported issues",
            icon: FolderKanban,
            link: "/public-issues?page=1"
        },
        {
            title: "Analytics",
            description: "View insights and statistics",
            icon: ChartSpline,
            link: "/analytics"
        },
        {
            title: "Map View",
            description: "Visualize issues on an interactive map",
            icon: MapPinned,
            link: "/map-view"
        }
    ]

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Welcome to CivicSync</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <Link
                        key={feature.title}
                        to={feature.link}
                        className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
                    >
                        <div className="flex flex-col items-center text-center">
                            <feature.icon className="w-12 h-12 mb-4 text-primary" />
                            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
} 