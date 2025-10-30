import Categorias from "../features/categorias/Categorias";
import ProductosHome from "../features/products/components/ProductosHome";
import ProductosFiltrados from "../features/products/ProductoFiltrados";
import Recomendados from "../Page/Recomendados";
import Searcher from "../features/Busquedas/Searcher";
import { getFilteredProducts } from "../features/Busquedas/search";
import { useState } from "react";
const Home = () => {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  const onClick = async () => {
    try {
      const products = await getFilteredProducts({
        startDate: dates.startDate,
        endDate: dates.endDate,
        location,
      });
      setFilteredProducts(products.content);
      window.scrollTo(0, 800);
    } catch (error) {
      console.error("Error al obtener productos filtrados:", error);
    }
  };

  return (
    <div>
      <Searcher
        onClick={onClick}
        setDates={setDates}
        setLocation={setLocation}
        dates={dates}
        location={location}
      />
      <Categorias />
      <Recomendados />
      {filteredProducts.length === 0 ? (
        <ProductosHome />
      ) : (
        <ProductosFiltrados products={filteredProducts} />
      )}
    </div>
  );
};

export default Home;
