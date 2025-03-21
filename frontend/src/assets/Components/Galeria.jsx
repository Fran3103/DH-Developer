import { useEffect, useState } from "react";
import { FaRegWindowClose, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Galeria = ({ id, mostrar }) => {
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [galeria, setGaleria] = useState([]);
    const [imagenActual, setImagenActual] = useState(0); // Controla la imagen actual mostrada

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }
                const data = await response.json();
                setProducto(data);
                setGaleria(data.images);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducto();
    }, [id]);

  

    const siguienteImagen = () => {
        setImagenActual((prevIndex) => (prevIndex + 1) % galeria.length);
    };

    const anteriorImagen = () => {
        setImagenActual((prevIndex) => (prevIndex - 1 + galeria.length) % galeria.length);
    };

    if (error) return <div>Error: {error}</div>;
    if (!producto) return <div>Loading...</div>;

    return (
        <div className=" flex inset-0 fixed items-start justify-center bg-black bg-opacity-70 w-full pt-24">
            
                <div className="fixed flex items-center justify-center gap-4 w-full">
                    <FaRegWindowClose onClick={mostrar} className="text-3xl absolute right-2 top-0 hover:text-red-600 cursor-pointer text-white" />
                    <button  className="text-white text-3xl absolute -bottom-10 left-10 lg:top-0">
                        <FaArrowAltCircleLeft onClick={anteriorImagen}/>
                    </button>
                    <img src={`http://localhost:3000${galeria[imagenActual].url}`} alt={`imagen ${galeria[imagenActual].url}`} className='max-w-full max-h-full object-cover'/>
                    <button className="text-white text-3xl absolute -bottom-10 right-10 lg:top-0" >
                        <FaArrowAltCircleRight  onClick={siguienteImagen}/>
                    </button>
                </div>
                
            
        </div>
    );
};

export default Galeria;
