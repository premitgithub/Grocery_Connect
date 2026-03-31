import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FiMapPin, FiWifi, FiWifiOff } from "react-icons/fi";

// ─── Custom pin icons ──────────────────────────────────────────────────────────
const makeIcon = (emoji, color) =>
  L.divIcon({
    className: "",
    html: `<div style="
      background:${color};
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);font-size:16px;line-height:1">${emoji}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });

export const SHOP_ICON    = makeIcon("🏪", "#0d9488");
export const DROP_ICON    = makeIcon("🏠", "#2563eb");
export const PARTNER_ICON = makeIcon("🚚", "#f59e0b");

// ─── Auto-fit bounds (inside MapContainer) ────────────────────────────────────
const FitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length >= 2) {
      map.fitBounds(L.latLngBounds(positions), { padding: [48, 48] });
    } else if (positions.length === 1) {
      map.setView(positions[0], 14);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(positions)]);
  return null;
};

// ─── Auto-center on partner (when in transit) ─────────────────────────────────
const TrackPartner = ({ partnerPos }) => {
  const map = useMap();
  useEffect(() => {
    if (partnerPos) map.panTo(partnerPos, { animate: true, duration: 0.8 });
  }, [partnerPos, map]);
  return null;
};

/**
 * Interactive Leaflet map for the Track Order page.
 *
 * Props
 *   pickup         – { lat, lng } | null
 *   drop           – { lat, lng } | null
 *   partnerPos     – [lat, lng]   | null  (animated position)
 *   routeCoords    – [[lat, lng], …]
 *   isInTransit    – boolean
 *   deliveryAddress – string
 *   partnerName    – string
 *   eta            – string | null   ("~12 mins")
 *   socketStatus   – "connected" | "disconnected" | "reconnecting"
 */
const TrackingMap = ({
  pickup, drop, partnerPos, routeCoords,
  isInTransit, deliveryAddress, partnerName,
  eta, socketStatus,
}) => {
  const allPositions = [
    pickup?.lat  ? [pickup.lat,  pickup.lng]  : null,
    drop?.lat    ? [drop.lat,    drop.lng]    : null,
    partnerPos   ? partnerPos                 : null,
  ].filter(Boolean);

  const mapCenter = allPositions[0] || null;

  // ── No location yet ───────────────────────────────────────────────────────
  if (!mapCenter) {
    return (
      <div className="flex-1 min-h-[320px] bg-gray-50 dark:bg-slate-700/30 rounded-2xl flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-slate-600 text-gray-400 dark:text-gray-500 px-8 text-center">
        <FiMapPin className="w-12 h-12 mb-3 opacity-30" />
        <p className="font-semibold text-base">Tracking will start once delivery begins</p>
        <p className="text-xs mt-1 opacity-70">
          Location data will appear when the partner picks up your order
        </p>
      </div>
    );
  }

  // ── Socket status banner ───────────────────────────────────────────────────
  const statusBanner = () => {
    if (!isInTransit) return null;
    if (socketStatus === "reconnecting") return (
      <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/40 text-yellow-700 dark:text-yellow-400 text-xs font-bold px-3 py-2 rounded-xl mb-3">
        <FiWifiOff className="shrink-0 animate-pulse" />
        Reconnecting to live tracking…
      </div>
    );
    if (socketStatus === "connected") return (
      <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-2 rounded-xl mb-3">
        <FiWifi className="shrink-0" />
        Live tracking active
      </div>
    );
    return null;
  };

  return (
    <>
      {statusBanner()}

      {/* ETA badge */}
      {eta && isInTransit && (
        <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/40 text-teal-700 dark:text-teal-300 text-sm font-bold px-4 py-2.5 rounded-xl mb-3">
          ⏱️ Arriving in {eta}
        </div>
      )}

      {/* Map */}
      <div className="flex-1 min-h-[320px] rounded-2xl overflow-hidden shadow-inner border border-gray-100 dark:border-slate-700 relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={13}
          className="h-full w-full"
          style={{ minHeight: 320 }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />

          {/* Fit all markers in view initially */}
          <FitBounds positions={allPositions} />

          {/* Smoothly pan map to follow partner */}
          {isInTransit && partnerPos && <TrackPartner partnerPos={partnerPos} />}

          {/* Shop marker */}
          {pickup?.lat && (
            <Marker position={[pickup.lat, pickup.lng]} icon={SHOP_ICON}>
              <Popup><strong>🏪 Shop / Pickup Point</strong></Popup>
            </Marker>
          )}

          {/* Customer marker */}
          {drop?.lat && (
            <Marker position={[drop.lat, drop.lng]} icon={DROP_ICON}>
              <Popup>
                <strong>🏠 Your Delivery Address</strong><br />{deliveryAddress}
              </Popup>
            </Marker>
          )}

          {/* Delivery partner (live socket position, or simulated fallback) */}
          {partnerPos && (
            <Marker position={partnerPos} icon={PARTNER_ICON}>
              <Popup>
                <strong>🚚 {partnerName || "Delivery Partner"}</strong>
                {eta ? <><br />ETA: {eta}</> : ""}
              </Popup>
            </Marker>
          )}

          {/* Route polyline (dashed when moving) */}
          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              color="#0d9488"
              weight={5}
              opacity={0.8}
              dashArray={isInTransit ? "1 8" : undefined}
            />
          )}
        </MapContainer>
      </div>

      {/* Open in Google Maps */}
      {pickup?.lat && drop?.lat && (
        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&origin=${pickup.lat},${pickup.lng}&destination=${drop.lat},${drop.lng}`,
              "_blank"
            )
          }
          className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Open in Google Maps
        </button>
      )}
    </>
  );
};

export default TrackingMap;
