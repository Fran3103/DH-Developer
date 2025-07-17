import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { iconMap } from "../../../utils/iconMap";
import "../../../styles/galeria.css";
import Galeria from "../../../Components/Galeria";
const Detalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productos/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setProducto(data);

        setGaleria(data.images.splice(0, 5));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducto();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const ImageClick = (index) => {
    const updatedGaleria = [...galeria];
    const [clickedImage] = updatedGaleria.splice(index, 1); // Elimina la imagen clicada
    updatedGaleria.unshift(clickedImage); // La añade al inicio
    setGaleria(updatedGaleria); // Actualiza el estado de la galería
  };

  const mostrar = () => setMostrarGaleria(!mostrarGaleria);
  const back = () => window.history.back();

  return (
    <div className="m-auto  pt-[70px] md:pt-[90px] ">
      <div className="w-full h-16  bg-celeste flex justify-between items-center p-4">
        <div className="w-full max-w-[1240px] flex justify-between items-center m-auto">
          <h1 className="w-full m-auto  md:text-2xl font-semibold text-azul">
            {producto.name}
          </h1>
          <button
            onClick={back}
            className="text-center border rounded-lg shadow-xl m-auto bg-celeste hover:bg-azul "
          >
            <FaLongArrowAltLeft className="m-auto text-xl text-white" />
          </button>
        </div>
      </div>
      <div className="m-auto max-w-[1240px] mt-2 p-4">
        <div className=" max-w-96 m-auto md:max-w-[740px] lg:max-w-none relative">
          <div className="galeria ">
            {galeria.map((imagen, index) => {
              return (
                <img
                  src={`http://localhost:3000${imagen.url}`}
                  alt={`imagen ${imagen.ur}`}
                  key={imagen.url}
                  onClick={() => {
                    ImageClick(index);
                  }}
                  className="w-16 h-10 xs:h-12  sm:w-20 sm:h-16 md:w-40 md:h-20 hover:opacity-80 cursor-pointer  m-auto mx-0 relative"
                />
              );
            })}
          </div>
          <p
            className="absolute -bottom-6 right-0 cursor-pointer hover:text-gray-500"
            onClick={mostrar}
          >
            ver mas
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl text-azul font-semibold">
            {producto.location}
          </h2>
          <p className="text-xl mt-2">{producto.description}</p>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 bg-slate-400 p-2 rounded-lg">
            <p>{producto.rating}</p>
            <p>{producto.quality}</p>
            <p>$ {producto.price}</p>
            <p>{producto.category}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-3">
          <h3 className="text-2xl text-azul font-semibold">Caracteristicas</h3>

          <div className="flex flex-wrap xs:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {producto.caracteristicas.map((c) => {
              const Icon = iconMap[c.icono];
              return (
                <span
                  key={c.id}
                  className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow-sm"
                >
                  {Icon && (
                    <Icon title={c.name} className="text-xl text-azul" />
                  )}
                  <span className="hidden xs:block text-gray-800 text-sm ">
                    {c.name}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {mostrarGaleria && <Galeria id={id} mostrar={mostrar} />}
    </div>
  );
};

export default Detalle;
