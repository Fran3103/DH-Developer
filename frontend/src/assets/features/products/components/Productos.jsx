import { useEffect, useState } from "react";

import Producto from "./Producto";
import {  getAllProductosAdmin } from "../productoService";
const Productos = () => {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 10;


  useEffect(()=> {
    
    const fetchDatos = async () => {
      try{
        const data = await getAllProductosAdmin()
        setDatos(data);
      }catch (err) {
        setError(err.message);
      } 
      }
      fetchDatos()
    },[])


    

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datos) {
    return <div>Loading...</div>;
  }
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = datos.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );
  const totalPaginas = Math.ceil(datos.length / productosPorPagina);

  return (
    <div className="m-auto pt-24 max-w-[1240px]">
      <h1 className="w-full m-auto mb-4 text-center md:text-left md:text-2xl font-semibold text-azul ">
        Productos:{" "}
      </h1>

      <div className="flex flex-col justify-between items-center w-full m-auto gap-3  xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-col sm:gap-0  lg:grid lg:grid-cols-2 place-content-center lg:gap-1">
        {productosActuales.map((dato) => {
          return (
            <Producto
              key={dato.id}
              id={dato.id}
              name={dato.name}
              location={dato.location}
              category={dato.category}
              price={dato.price}
              rating={dato.rating}
              quality={dato.quality}
              description={dato.description}
              images={dato.images}
            />
          );
        })}
      </div>

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
    </div>
  );
};

export default Productos;
