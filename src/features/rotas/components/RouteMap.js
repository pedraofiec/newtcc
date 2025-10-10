import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

// Corrige ícones default do Leaflet em bundlers:
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Props:
 * - waypoints: [{lat, lng}, ...]
 * - onWaypointsChange: (wps[]) => void
 * - onSummary: ({ distanceMeters, durationSeconds }) => void
 * - height: number (px)
 * - startSim: boolean  -> quando alternar de false->true, inicia simulação
 * - stopSim: boolean   -> quando alternar de false->true, para simulação
 * - allowClickSet: 'origin' | 'destination' | null -> clique no mapa define origem/destino
 */
export default function RouteMap({
  waypoints = [],
  onWaypointsChange,
  onSummary,
  height = 480,
  startSim = false,
  stopSim = false,
  allowClickSet = null,
}) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const routeCoordsRef = useRef([]);    // coordenadas da rota selecionada
  const runnerMarkerRef = useRef(null); // marcador que "anda"
  const animTimerRef = useRef(null);    // setInterval handler
  const animIndexRef = useRef(0);       // índice atual no array de coordenadas

  const center = useMemo(() => {
    if (waypoints.length > 0) return [waypoints[0].lat, waypoints[0].lng];
    return [-23.0946, -47.2196]; // fallback Indaiatuba
  }, [waypoints]);

  // Handler de clique para definir origem/destino
  function ClickSetter() {
    useMapEvents({
      click(e) {
        if (!allowClickSet || !onWaypointsChange) return;
        const { latlng } = e;
        if (allowClickSet === "origin") {
          const [, ...rest] = waypoints;
          onWaypointsChange([{ lat: latlng.lat, lng: latlng.lng }, ...rest]);
        } else if (allowClickSet === "destination") {
          const wp = [...waypoints];
          if (wp.length === 0) {
            onWaypointsChange([{ lat: latlng.lat, lng: latlng.lng }]);
          } else if (wp.length === 1) {
            onWaypointsChange([wp[0], { lat: latlng.lat, lng: latlng.lng }]);
          } else {
            wp[wp.length - 1] = { lat: latlng.lat, lng: latlng.lng };
            onWaypointsChange(wp);
          }
        }
      },
    });
    return null;
  }

  // Monta/atualiza controle de rota
  useEffect(() => {
    if (!mapRef.current) return;
    const leafletMap = mapRef.current;

    // remove controle anterior
    if (routingRef.current) {
      leafletMap.removeControl(routingRef.current);
      routingRef.current = null;
    }

    if (waypoints.length < 2) return; // precisa pelo menos de origem e destino

    const wps = waypoints.map((p) => L.latLng(p.lat, p.lng));

    const control = L.Routing.control({
      waypoints: wps,
      routeWhileDragging: true,
      addWaypoints: true,
      draggableWaypoints: true,
      showAlternatives: false,
      fitSelectedRoutes: false,
      lineOptions: { styles: [{ weight: 6 }] },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "driving",
        timeout: 30_000,
      }),
      createMarker: (i, wp_, n) => {
        // Deixa os marcadores visíveis e arrastáveis
        const marker = L.marker(wp_.latLng, { draggable: true });
        marker.on("dragend", () => {
          const latLng = marker.getLatLng();
          const next = [...waypoints];
          next[i] = { lat: latLng.lat, lng: latLng.lng };
          onWaypointsChange && onWaypointsChange(next);
        });
        return marker;
      },
    }).addTo(leafletMap);

    routingRef.current = control;

    control.on("routesfound", (e) => {
      const route = e.routes && e.routes[0];
      if (route) {
        // Resumo real
        const dist = route.summary?.totalDistance ?? 0;  // em metros
        const dur = route.summary?.totalTime ?? 0;       // em segundos
        onSummary && onSummary({ distanceMeters: dist, durationSeconds: dur });

        // Guarda coords para simulação e ajusta bounds
        routeCoordsRef.current = route.coordinates || [];
        if (route.bounds) leafletMap.fitBounds(route.bounds, { padding: [28, 28] });
      }
    });

    return () => {
      if (routingRef.current) {
        leafletMap.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(waypoints)]); // atualiza quando waypoints mudam

  // Inicia simulação quando startSim alternar para true
  useEffect(() => {
    if (!startSim) return;
    if (!mapRef.current) return;
    const map = mapRef.current;
    const coords = routeCoordsRef.current;
    if (!coords || coords.length === 0) return;

    // Limpa anterior
    clearInterval(animTimerRef.current);
    animIndexRef.current = 0;

    // Cria marcador se não existir
    if (!runnerMarkerRef.current) {
      runnerMarkerRef.current = L.marker(coords[0]).addTo(map);
    } else {
      runnerMarkerRef.current.setLatLng(coords[0]);
    }

    // Velocidade ~ 30km/h (8.3 m/s) — ajuste como quiser
    const stepMs = 100;
    const metersPerSecond = 8.3;
    // Aproxima “distância por passo” usando delta linear entre pontos
    const step = () => {
      const i = animIndexRef.current;
      const j = i + 1;
      if (j >= coords.length) {
        clearInterval(animTimerRef.current);
        return;
      }
      const a = coords[i], b = coords[j];
      const dx = b.lng - a.lng;
      const dy = b.lat - a.lat;
      // “passos” entre a->b proporcional ao comprimento do segmento
      const segLen = Math.sqrt(dx * dx + dy * dy);
      const segments = Math.max(1, Math.floor((metersPerSecond * stepMs / 1000) / 0.00008)); 
      // 0.00008 ~ ~8.8m em graus approx (ajuste fino visual)
      let t = 0;
      let k = 0;
      const inner = setInterval(() => {
        t += 1 / segments;
        if (t >= 1) {
          clearInterval(inner);
          runnerMarkerRef.current && runnerMarkerRef.current.setLatLng(b);
          animIndexRef.current = j;
        } else {
          const lat = a.lat + dy * t;
          const lng = a.lng + dx * t;
          runnerMarkerRef.current && runnerMarkerRef.current.setLatLng([lat, lng]);
        }
      }, Math.max(10, stepMs / segments));
    };

    animTimerRef.current = setInterval(step, stepMs);
    return () => clearInterval(animTimerRef.current);
  }, [startSim]);

  // Para simulação quando stopSim alternar para true
  useEffect(() => {
    if (!stopSim) return;
    clearInterval(animTimerRef.current);
  }, [stopSim]);

  // Guardar instância do mapa
  const setMap = (instance) => {
    if (!instance) return;
    // react-leaflet v3/v4: MapContainer repassa o “leaflet map” via :-/
    // Pegamos a instância usando a propriedade interna (mantida por compatibilidade)
    mapRef.current = instance;
  };

  return (
    <div>
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: `${height}px`, borderRadius: "20px" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Clique para definir origem/destino */}
        <ClickSetter />
      </MapContainer>
    </div>
  );
}
