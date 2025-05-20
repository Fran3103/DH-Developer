import { Link } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { useEffect, useState } from "react";

const Categorias = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((resp) => resp.json())
      .then((data) => setDatos(data));
  }, []);

  const catecoriasMap = new Map();

  datos.forEach((datos) => {
    const cat = datos.category;
    if (!catecoriasMap.has(cat)) {
      catecoriasMap.set(cat, {
        categoria: cat,
        imagen: datos.images?.[0]?.url || "",
        cantidad: 1,
      });
    } else {
      catecoriasMap.get(cat).cantidad += 1;
    }
  });

  const categorias = Array.from(catecoriasMap.values());

  return (
    <div className="m-auto  mt-16 md:mt-20">
      <div className="m-auto w-full max-w-[1240px] p-3">
        <div className="flex justify-between items-center">
          <h1 className="w-full m-auto  mb-4 text-center  md:text-left md:text-2xl font-semibold text-azul">
            Categorias
          </h1>

          <span><IoFilter className="text-xl"/></span>
        </div>
        <div className="flex  flex-col justify-between items-center  w-full m-auto gap-3  max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-3 sm:flex-row  sm:gap-3">
          {categorias.map((datos) => {
            return (
              <Link
                key={datos.categoria}
                to={datos.categoria}
                className="w-80  xs:w-40 sm:w-48 md:w-56 "
              >
                <div className="flex flex-col  max-h-72  bg-white rounded-lg border shadow-lg hover:shadow-xl ">
                  <img
                    src={`http://localhost:3000${datos.imagen}`}
                    alt="imagen de la categoria"
                    className="w-full h-24 lg:h-32 rounded-t-lg "
                  />
                  <div className="p-1 bg-white h-11 rounded-b-lg">
                    <h3 className="text-xs font-bold text-azul">
                      {datos.categoria}
                    </h3>
                    <p className="text-[10px] text-gray-800">
                      {datos.cantidades} {datos.categoria}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categorias;
