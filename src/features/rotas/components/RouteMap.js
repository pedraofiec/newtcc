import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine'; // precisa do side-effect

// Corrige ícones padrão do Leaflet em bundlers:
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function RouteMap({ waypoints = [], className = '' }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);

  // Centro inicial: se tiver waypoint, usa o 1º
  const center = waypoints.length ? [waypoints[0].lat, waypoints[0].lng] : [-23.0946, -47.2196];

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const leafletMap = map; // react-leaflet v4 retorna a instância diretamente

    // Remove rota anterior se existir
    if (routingRef.current) {
      leafletMap.removeControl(routingRef.current);
      routingRef.current = null;
    }

    if (waypoints.length >= 2) {
      // Converte para L.Routing.waypoint
      const wp = waypoints.map((p) => L.latLng(p.lat, p.lng));

      // Cria controle de rota (OSRM demo server)
      const control = L.Routing.control({
        waypoints: wp,
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        showAlternatives: false,
        lineOptions: {
          styles: [{ weight: 6 }],
        },
        // Usa o servidor público OSRM; para produção, use seu próprio OSRM ou Mapbox Directions
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
          profile: 'driving',
          timeout: 30_000,
        }),
        createMarker: (i, wp_) => {
          // Marcadores discretos (podem ser escondidos retornando null se quiser)
          return L.marker(wp_.latLng);
        },
      }).addTo(leafletMap);

      routingRef.current = control;

      // Fit bounds após calcular a rota
      control.on('routesfound', (e) => {
        const route = e.routes[0];
        if (route && route.bounds) {
          leafletMap.fitBounds(route.bounds, { padding: [30, 30] });
        }
      });
    }
  }, [waypoints]);

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: '100%', height: '360px', borderRadius: '20px' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
