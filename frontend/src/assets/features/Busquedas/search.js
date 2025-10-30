const API_URL = "http://localhost:3000/productos/filter";

// Obtener productos filtrados por fecha y ubicación
export async function getFilteredProducts({ startDate, endDate, location }) {
  const isStartOk = startDate instanceof Date && !isNaN(startDate);
  const isEndOk = endDate instanceof Date && !isNaN(endDate);

  // Versiones en ISO (UTC) y local (para comparar)
  const isoStart = isStartOk ? startDate.toISOString() : startDate;
  const isoEnd = isEndOk ? endDate.toISOString() : endDate;
  const localStart = isStartOk ? startDate.toLocaleString() : startDate;
  const localEnd = isEndOk ? endDate.toLocaleString() : endDate;

  console.group("getFilteredProducts → payload");
  console.log("startDate (obj):", startDate, "valid:", isStartOk);
  console.log("endDate   (obj):", endDate, "valid:", isEndOk);
  console.log("start ISO:", isoStart);
  console.log("end   ISO:", isoEnd);
  console.log("start local:", localStart);
  console.log("end   local:", localEnd);
  console.log("tzOffset (min):", new Date().getTimezoneOffset()); // útil para ver desfasajes
  console.groupEnd();
  const d2 = d => (d instanceof Date ? d.toISOString().slice(0, 10) : d);
  const params = new URLSearchParams({
    startDate: d2(startDate),
    endDate: d2(endDate),
    location
  });

  const res = await fetch(`${API_URL}?${params}`);
  if (!res.ok) throw new Error("Error al obtener productos filtrados");
  return res.json();
}

export async function getLocation({ location }) {
  const res = await fetch(
    `${API_URL}?location=${encodeURIComponent(location)}&size=50&page=0`
  );
  console.log("Buscar ubicación:", location);
  if (!res.ok) throw new Error("Error al obtener ubicación");
  return res.json();
}
