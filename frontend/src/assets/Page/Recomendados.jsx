

import { getAllProductos } from '../features/products/productoService';
import Recomendado from '../Components/Recomendado';
import {  useEffect, useState } from 'react';

const Recomendados = () => {

 const [datos, setDatos] = useState([]);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

useEffect(() => {
setLoading(true);
getAllProductos()
  .then(data => setDatos(data))
  .catch(err => setError(err.message))
  .finally(() => setLoading(false));
},[]);



  if (loading) return <div>Loading...</div>; 
  if (error)  return <div>Error: {error} aca recomendado</div>;
  

  if (!datos) {
    return <div>Loading...</div>;
  }

  const productos = datos.content
  const  prodRecomendados  = productos.filter(p => p.rating > 9).slice(0, 4);


  return (
    <div className='m-auto mt-3 md:mt-4 '>
      <div className='m-auto w-full max-w-[1240px] p-3'>
      <h1 className='w-full m-auto mb-4 text-center md:text-left md:text-2xl font-semibold text-azul'>Recomendados</h1>
        <div className='flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3'>
          {prodRecomendados.map((dato) => {  
            return (
                <Recomendado 
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
      </div>
    </div>
  );
};

export default Recomendados;
