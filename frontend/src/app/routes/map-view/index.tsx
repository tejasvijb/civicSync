import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getAllCivicIssues } from '@/api/civicIssuesApi';
import { useQuery } from '@tanstack/react-query';

// Set up the default icon for markers
const defaultIcon = new Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    iconSize: [25, 41]
});

const position: LatLngTuple = [28.6273928, 77.1716954];

export default function MapView() {

    const { data: issues } = useQuery({
        queryFn: () => getAllCivicIssues({ limit: 100 }),
        queryKey: ["publicCivicIssues"],
    })

    console.log("issues", issues);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Map View</h1>
            <div className="w-full h-[600px] rounded-lg shadow">
                <MapContainer
                    center={position}
                    zoom={4}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {issues?.data?.data?.map((issue: any) => (
                        <Marker key={issue._id} position={[issue.latitude, issue.longitude]} icon={defaultIcon}>
                            <Popup>
                                <div>
                                    <h3 className="text-md font-bold">{issue.title}</h3>
                                    <span
                                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${issue.status === "Resolved"
                                            ? "bg-green-100 text-green-700"
                                            : issue.status === "In Progress"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {issue.status}
                                    </span>
                                    <p className="text-sm text-gray-500">{issue.description}</p>
                                    <p className="text-sm text-gray-500">Votes: {issue.votes}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
