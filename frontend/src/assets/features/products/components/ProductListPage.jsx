import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoriesSidebar from "../../categorias/CategoriesSidebar";
import ProductsGrid from "./ProductGrid";

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.getAll("category");
  const feat = searchParams.getAll("feature");
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const featName = features
    .filter((f) => feat.includes(f.id.toString()))
    .map((f) => f.nombre)
    .join(", ");
  const navigate = useNavigate();

  useEffect(() => {
    // Traemos todos los productos sin filtro para extraer las categorías
    fetch("http://localhost:3000/productos/filter")
      .then((res) => res.json())
      .then(({ totalElements }) => {
        // Hacemos una segunda llamada para obtener las categorías y características
        fetch(`http://localhost:3000/productos/filter?size=${totalElements}`)
          .then((res) => res.json())
          .then(({ content }) => {
            // Creamos un mapa para contar categorías y características
            // Usamos Map para evitar duplicados y contar cantidades
            const catMap = new Map();
            const featMap = new Map();

            content.forEach((producto) => {
              // Desestructuramos el producto para obtener categoría y características
              const cat = producto.categorias[0]?.name; // Asumimos que la primera categoría es la principal
         
              if (!catMap.has(cat)) {
                // Si no existe, lo agregamos con cantidad 1
                catMap.set(cat, { categoria: cat, cantidad: 1 }); // Aquí usamos 'categoria' como clave
              } else {
                // Si ya existe, incrementamos el contador
                catMap.get(cat).cantidad++;
              }
              (producto.caracteristicas || []).forEach((feat) => {
                const featName = feat.name;
                const id = feat.id;
                if (!featMap.has(featName)) {
                  featMap.set(featName, {
                    id: id,
                    nombre: featName,
                    cantidad: 1,
                  });
                } else {
                  featMap.get(featName).cantidad++;
                }
              });
            });

            // setea el array de categorías con su contador
            setCategories(Array.from(catMap.values()));
            setFeatures(Array.from(featMap.values()));
          });
      })
      .catch((err) =>
        console.error("Error al cargar categorías y caracteristicas:", err)
      );
  }, []);

  useEffect(() => {
    const params = searchParams.toString();
    fetch(`http://localhost:3000/productos/filter?${params}&size=1000`)
      .then((res) => res.json())
      .then((page) => {
        setProducts(page.content);
        setTotal(page.totalElements);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]); // Dependencia para recargar al cambiar filtros

  // paginacion

  const productosPorPagina = 12;

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = products.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );
  const totalPaginas = Math.ceil(products.length / productosPorPagina);

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-[80px] md:mt-[120px]  md:p-0 m-auto w-full max-w-[1240px] p-3">
      <aside>
        <CategoriesSidebar categories={categories} features={features} />
      </aside>
      <main>
        <div className="flex  items-center mb-4 ">
          <h2 className="text-lg font-semibold w-full ">
            Filtrado:{" "}
            <span className="text-sm text-gray-600">
              {category.length || feat.length > 0
                ? `   ${category.join(", ")} ${featName}  `
                : "Todos los productos"}
            </span>
          </h2>

          {/* Botón limpiar filtros */}
          <button
            onClick={() => {
              navigate(`/productos/filter`);
            }}
            className={
              category.length === 0 && feat.length === 0
                ? "hidden"
                : " w-28 text-center text-sm text-red-600 hover:underline"
            }
          >
            Limpiar filtros
          </button>
        </div>
        <p className="text-sm text-gray-600  mb-4">
          {productosActuales.length} de {total} Productos
        </p>

        <ProductsGrid items={productosActuales} />

        <div className="flex justify-center mt-4 items-center space-x-2 mb-4">
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>{`Página ${paginaActual} de ${totalPaginas}`}</span>
          <button
            onClick={() =>
              setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
            }
            disabled={paginaActual === totalPaginas}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
