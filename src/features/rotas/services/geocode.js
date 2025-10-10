export async function geocodeAddress(query) {
  if (!query || !query.trim()) return null;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "0");
  // url.searchParams.set("countrycodes", "br"); // opcional

  try {
    const res = await fetch(url.toString(), { mode: "cors" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.length) return null;
    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  } catch (e) {
    console.error("Erro no geocoding:", e);
    return null;
  }
}
