const BASE = "http://localhost:3000/usuarios/me/favorites"; 

// Función para obtener los encabezados de autorización
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Obtener IDs de productos favoritos
export async function getFavoriteIds() {
  const r = await fetch(`${BASE}/all`, { headers: authHeaders() });
  if (!r.ok) throw new Error(`HTTP ${r.status} getFavoriteIds`);
  return r.json(); 
}

// Agregar producto a favoritos
export async function addFavorite(productId) {
  const r = await fetch(`${BASE}/${productId}`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} addFavorite`);
  return true;
}



// Eliminar producto de favoritos
export async function removeFavorite(productId) {
  const r = await fetch(`${BASE}/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!r.ok && r.status !== 204) throw new Error(`HTTP ${r.status} removeFavorite`);
  return true;
}
