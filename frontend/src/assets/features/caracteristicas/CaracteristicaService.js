const API_URL = "http://localhost:3000/caracteristicas";

// Obtener todas las características
export async function getAllCaracteristicas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener características");
  return res.json();
}

// Crear una nueva característica
export async function createCaracteristica(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear la característica");
  return res.json();
}

// Editar una característica existente
export async function updateCaracteristica(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!res.ok) throw new Error("Error al actualizar la característica");
  return 
}

// Eliminar una característica
export async function deleteCaracteristica(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar la característica");
  return true;
}
