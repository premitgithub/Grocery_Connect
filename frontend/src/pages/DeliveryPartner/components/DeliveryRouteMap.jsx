import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DeliveryRouteMap = ({ pickup, drop }) => {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    if (pickup?.lat && drop?.lat) {
      const fetchRoute = async () => {
        try {
          const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?overview=full&geometries=geojson`);
          const data = await res.json();
          if (data.routes && data.routes[0]) {
            const route = data.routes[0];
            const coordinates = route.geometry.coordinates.map(c => [c[1], c[0]]);
            setRouteData({
              coordinates,
              distance: (route.distance / 1000).toFixed(1) + " km",
              duration: Math.round(route.duration / 60) + " mins"
            });
          }
        } catch (error) {
           console.error("Error fetching route", error);
        }
      };
      fetchRoute();
    }
  }, [pickup, drop]);

  if (!pickup?.lat || !drop?.lat) return (
    <div className="p-6 text-center text-gray-500 bg-gray-50 dark:bg-slate-800 rounded-xl mt-4">
      Location data unavailable for this order.
    </div>
  );

  return (
    <div className="w-full mt-4 space-y-4 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
      <div className="flex justify-between items-center px-2">
        <div>
          <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Est. Distance</span>
          <p className="font-bold text-lg text-teal-700 dark:text-teal-400">{routeData?.distance || "..."}</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Est. Time</span>
          <p className="font-bold text-lg text-teal-700 dark:text-teal-400">{routeData?.duration || "..."}</p>
        </div>
      </div>
      <div className="h-64 w-full rounded-xl overflow-hidden shadow-inner relative z-0">
        <MapContainer center={[pickup.lat, pickup.lng]} zoom={13} className="h-full w-full">
          <TileLayer 
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          <Marker position={[pickup.lat, pickup.lng]}>
             <Popup>Pickup</Popup>
          </Marker>
          <Marker position={[drop.lat, drop.lng]}>
             <Popup>Dropoff</Popup>
          </Marker>
          {routeData && <Polyline positions={routeData.coordinates} color="#0d9488" weight={5} opacity={0.8} />}
        </MapContainer>
      </div>
      <button
        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${pickup.lat},${pickup.lng}&destination=${drop.lat},${drop.lng}`, '_blank')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md cursor-pointer flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <span>Start Navigation</span>
      </button>
    </div>
  );
};

export default DeliveryRouteMap;
