import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

export default function CategoriesSidebar({ categories, features }) {
  const [searchParams] = useSearchParams();
  const selectedCategories = searchParams.getAll("category");
  const selectedFeatures = searchParams.getAll("feature");
  const navigate = useNavigate();
  const [activo, setActivo] = useState(false);

  const handleFilter = (paramName, value, selectedArray) => {
    const valueString = value.toString();
    const newParams = new URLSearchParams(searchParams);
    if (selectedArray.includes(valueString)) {
      // Deseleccionar
      newParams.delete(paramName);
      selectedArray
        .filter((v) => v !== valueString)
        .forEach((v) => newParams.append(paramName, v));
    } else {
      newParams.append(paramName, valueString);
    }
    // Navegamos a la nueva URL con los parámetros actualizados
    // Esto recargará la página y aplicará los filtros
    navigate(`/productos/filter?${newParams.toString()}`);
  };


  return (
    <>
      <button
        onClick={() => setActivo(!activo)}
        className="border-black p-2 rounded-md bg-slate-400 ml-2 md:hidden"
      >
        {" "}
        {activo ? "Menos  Filtros  - " : "Más  Filtros + "}
      </button>
      <aside
        className={
          activo
            ? " w-full p-4 bg-white rounded-lg shadow-md flex-wrap flex-col justify-start items-start gap-4 "
            : "hidden md:flex flex-col w-64"
        }
      >
        {/* Sección Categorías */}
        <div className="flex-wrap justify-center  items-center mb-4 ">
          <h2 className="text-xl font-semibold md:ml-2">Categorías</h2>
          <ul className="  flex items-center  flex-wrap md:flex-col text-sm md:items-start">
            {categories.map(({ categoria, cantidad }) => {
              const isActive = selectedCategories.includes(categoria);
              return (
                <li key={categoria}>
                  <button
                    onClick={() =>
                      handleFilter("category", categoria, selectedCategories)
                    }
                    className={`block px-3 py-2 rounded transition-colors ${
                      isActive
                        ? "bg-azul text-white"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span className="capitalize">{categoria}</span>
                    <span className="ml-2 text-sm">({cantidad})</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sección Características */}
        <div className="flex-wrap justify-center  items-center mb-4 ">
          <h2 className="text-xl font-semibold mb-2 md:ml-2">
            Características
          </h2>
          <ul className="flex items-center w-full flex-wrap text-sm md:flex-col  md:items-start">
            {features.map(({ id, nombre, cantidad }) => {
              const isActive = selectedFeatures.includes(id.toString());
              return (
                <li key={id}>
                  <button
                    onClick={() =>
                      handleFilter("feature", id, selectedFeatures)
                    }
                    className={`block px-3 py-2 rounded transition-colors ${
                      isActive
                        ? "bg-azul text-white"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span className="capitalize">{nombre}</span>
                    <span className="ml-2 text-sm">({cantidad})</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}

CategoriesSidebar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoria: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired,
    })
  ).isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired,
    })
  ).isRequired,
};
