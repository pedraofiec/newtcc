// src/features/rotas/services/geocode.js
// Geocoding simples usando Nominatim (OpenStreetMap) — sem API key.
// Uso: const pt = await geocodeAddress("FIEC Indaiatuba SP");

export async function geocodeAddress(query) {
  if (!query || !query.trim()) return null;
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "0");

  const res = await fetch(url.toString(), {
    headers: {
      // Identifique seu app (boa prática do Nominatim)
      "Accept": "application/json",
      "User-Agent": "RotaVan-TCC/1.0 (demo)"
    }
  });

  if (!res.ok) return null;
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const { lat, lon } = data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
}
