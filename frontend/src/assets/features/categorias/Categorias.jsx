import { Link } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { useEffect, useState } from "react";

const Categorias = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/productos/filter?size=1000")
      .then((resp) => resp.json())
      .then((page) => setDatos(page.content));

    
  }, []);

  
  const catecoriasMap = new Map();
  datos.forEach(producto => {
    const cat = producto.category;
    const catImages = producto.images || [];
    
    if (!catecoriasMap.has(cat)) {
      catecoriasMap.set(cat, {
        categoria: cat,
        imagen: catImages[0]?.url || "",
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
          {categorias.map(({categoria, imagen, cantidad}) => {
            return (
              <Link
                key={categoria}
                to={`/productos/filter?category=${encodeURIComponent(categoria)}`}
                className="w-80  xs:w-40 sm:w-48 md:w-56 "
              >
                <div className="flex flex-col  max-h-72  bg-white rounded-lg border shadow-lg hover:shadow-xl ">
                  <img
                    src={`http://localhost:3000${imagen}`}
                    alt={`imagen de  ${categoria}`}
                    className="w-full h-24 lg:h-32 rounded-t-lg "
                  />
                  <div className="p-1 bg-white h-11 rounded-b-lg">
                    <h3 className="text-xs font-bold text-azul">
                      {categoria}
                    </h3>
                    <p className="text-[10px] text-gray-800">
                      {cantidad} {categoria}
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
