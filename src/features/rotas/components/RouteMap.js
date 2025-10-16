// src/features/rotas/components/RouteMap.jsx
import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Corrige ícones padrão do Leaflet em bundlers
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Props:
 * - waypoints: [{lat, lng}, ...]
 * - onWaypointsChange: (wps[]) => void
 * - onSummary: ({ distanceMeters, durationSeconds }) => void
 * - onPickDone?: (mode) => void
 * - height: number (px)
 * - startSim: any
 * - stopSim: any
 * - allowClickSet: 'origin' | 'destination' | null
 */
export default function RouteMap({
  waypoints = [],
  onWaypointsChange,
  onSummary,
  onPickDone,
  height = 560,
  startSim,
  stopSim,
  allowClickSet = null,
}) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const routeCoordsRef = useRef([]);
  const runnerMarkerRef = useRef(null);
  const animTimerRef = useRef(null);

  const center = useMemo(() => {
    if (waypoints.length > 0) return [waypoints[0].lat, waypoints[0].lng];
    return [-23.0946, -47.2196]; // fallback (Indaiatuba)
  }, [waypoints]);

  // Clique no mapa para definir origem/destino
  function ClickSetter() {
    useMapEvents({
      click(e) {
        if (!onWaypointsChange) return;

        let mode = allowClickSet;
        if (!mode) {
          if (waypoints.length === 0) mode = "origin";
          else mode = "destination";
        }

        const { latlng } = e;
        if (mode === "origin") {
          const next = [...waypoints];
          if (next.length === 0) onWaypointsChange([{ lat: latlng.lat, lng: latlng.lng }]);
          else { next[0] = { lat: latlng.lat, lng: latlng.lng }; onWaypointsChange(next); }
        } else if (mode === "destination") {
          const next = [...waypoints];
          if (next.length === 0) onWaypointsChange([{ lat: latlng.lat, lng: latlng.lng }]);
          else if (next.length === 1) onWaypointsChange([next[0], { lat: latlng.lat, lng: latlng.lng }]);
          else { next[next.length - 1] = { lat: latlng.lat, lng: latlng.lng }; onWaypointsChange(next); }
        }
        onPickDone && onPickDone(mode);
      },
    });
    return null;
  }

  // (Re)monta a rota
  useEffect(() => {
    const leafletMap = mapRef.current;
    if (!leafletMap) return;

    if (routingRef.current) {
      leafletMap.removeControl(routingRef.current);
      routingRef.current = null;
    }

    if (waypoints.length < 2) return;

    const wps = waypoints.map((p) => L.latLng(p.lat, p.lng));

    const control = L.Routing.control({
      waypoints: wps,
      routeWhileDragging: true,
      addWaypoints: true,
      draggableWaypoints: true,
      showAlternatives: false,
      fitSelectedRoutes: false,
      show: false,
      collapsible: true,
      lineOptions: { styles: [{ weight: 6 }] },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "driving",
        timeout: 30000,
      }),
      createMarker: (i, wp_) => {
        const m = L.marker(wp_.latLng, { draggable: true });
        m.on("dragend", () => {
          const latLng = m.getLatLng();
          const next = [...waypoints];
          next[i] = { lat: latLng.lat, lng: latLng.lng };
          onWaypointsChange && onWaypointsChange(next);
        });
        return m;
      },
    }).addTo(leafletMap);

    routingRef.current = control;

    control.on("routesfound", (e) => {
      const route = e.routes?.[0];
      if (!route) return;
      onSummary && onSummary({
        distanceMeters: route.summary?.totalDistance ?? 0,
        durationSeconds: route.summary?.totalTime ?? 0,
      });
      routeCoordsRef.current = route.coordinates || [];
      if (route.bounds) leafletMap.fitBounds(route.bounds, { padding: [28, 28] });
    });

    return () => {
      if (routingRef.current) {
        leafletMap.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(waypoints)]);

  // Simulação: iniciar
  useEffect(() => {
    if (!startSim) return;
    const map = mapRef.current;
    const coords = routeCoordsRef.current;
    if (!map || coords.length === 0) return;

    clearInterval(animTimerRef.current);
    if (!runnerMarkerRef.current) {
      runnerMarkerRef.current = L.marker(coords[0]).addTo(map);
    } else {
      runnerMarkerRef.current.setLatLng(coords[0]);
    }

    let i = 0;
    animTimerRef.current = setInterval(() => {
      i = Math.min(i + 1, coords.length - 1);
      runnerMarkerRef.current?.setLatLng(coords[i]);
      if (i === coords.length - 1) clearInterval(animTimerRef.current);
    }, 80);

    return () => clearInterval(animTimerRef.current);
  }, [startSim]);

  // Simulação: parar
  useEffect(() => {
    if (!stopSim) return;
    clearInterval(animTimerRef.current);
  }, [stopSim]);

  return (
    <div>
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: `${height}px`, borderRadius: "20px" }}
        whenCreated={(map) => { mapRef.current = map; }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickSetter />
      </MapContainer>
    </div>
  );
}
