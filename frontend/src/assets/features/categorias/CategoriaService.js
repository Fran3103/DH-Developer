const API_URL = "http://localhost:3000/categorias";

// Obtener todas las características
export async function getCategorias() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();

}

// Crear una nueva característica
export async function createCategoria(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: data,
  });

  if (!res.ok) throw new Error(res.text() || "Error al crear la categoría");
  return res.json();
}

// Editar una característica existente
export async function updateCategoria(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!res.ok) throw new Error(await res.text() || "Error al actualizar la categoría");
  return res.json();
}

// Eliminar una característica
export async function deleteCategoria(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar la categoria");
  return true;
}
