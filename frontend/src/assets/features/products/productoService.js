const API_URL = "http://localhost:3000/productos";

// Obtener todos los productos
export async function getAllProductos(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    // Si no hay parámetros, la query será una cadena vacía
    const response = await fetch(`${API_URL}/filter?${query}`);

    if (!response.ok) throw new Error("Error al obtener productos");

    return response.json();
  } catch (error) {
    console.error("Error al obtener los Productos", error);
    throw error;
  }
}

export async function getAllProductosAdmin() {
  try {
    const response = await fetch(`${API_URL}/all`);

    if (!response.ok) throw new Error("Error al obtener productos");
    return response.json();
  } catch (error) {
    console.error("Error al obtener los Productos", error);
    throw error;
  }
}

// Obtener un producto por ID
export async function getProductoById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Producto no encontrado");
  return response.json();
}

// Obtener productos por una lista de IDs
export async function getProductosByIds(ids = []) {
  if (!ids.length) return [];
  const token = localStorage.getItem("token");
  const params = new URLSearchParams({ ids: ids.join(",") }).toString();
  const r = await fetch(`/productos/by-ids?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} getProductosByIds`);
  return r.json(); 
}

// Crear un producto
export async function crearProducto(formData) {
  console.log("Datos enviados:", [...formData.entries()]);
  const response = await fetch("http://localhost:3000/productos", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = new Error("Error al crear el producto");
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

// Actualizar producto
export async function updateProducto(id, data) {
  console.log("Datos enviados:", [...data.entries()]);
  const response = await fetch(`http://localhost:3000/productos/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!response.ok) {
    const error = new Error("Error al actualizar el producto");
    error.status = response.status;
    throw error;
  }

  return;
}

// Eliminar producto
export async function deleteProducto(id, token) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al eliminar producto");
  return response.ok;
}

// Filtrar productos por categoría
export async function getProductosByCategoria(categoria) {
  const response = await fetch(`${API_URL}/categoria/${categoria}`);
  if (!response.ok) throw new Error("Error al filtrar por categoría");
  return response.json();
}


// traer productos por listado de ids
export async function fetchProductosByIds(ids = []) {
  if (ids.length === 0) return [];
  const token = localStorage.getItem("token");
  const idsList = ids.join(",").toString();
  console.log("IDs para fetchProductosByIds:", idsList);
  const data = await fetch(`http://localhost:3000/productos/by-ids/${idsList}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  if (!data.ok) {
    throw new Error("Error al obtener productos por IDs");
  }

  console.log("Respuesta de fetchProductosByIds:", data);
  return data.json();
}