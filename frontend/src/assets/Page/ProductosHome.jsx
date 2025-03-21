import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetchData"
const ProductosHome = () => {

const { datos, error } = useFetch('http://localhost:3000/productos');

if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datos) {
    return <div>Loading...</div>;
  }
let prodRamdon = [...datos]

// algoridmo que mezcla el array 
for (let i = prodRamdon.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [prodRamdon[i], prodRamdon[j]] = [prodRamdon[j], prodRamdon[i]];
}
const productos = prodRamdon.slice(0, 10)
  return (
    <div className='m-auto mb-20 '>
        <div className='m-auto w-full max-w-[1240px] p-3 flex flex-col gap-12'>

            
            <h1 className=' md:text-left md:text-2xl font-semibold text-azul'>Productos </h1>
                
           
            <div className='  w-full m-auto gap-3 max-w-[1240px] grid xs:grid-cols-2 place-content-center'>
            {productos.map((dato) => {  
                return (
                    <Link key={dato.id} to={`/${dato.category}/${dato.id}`}>
                    <div className='w-72 rounded-lg shadow-lg hover:shadow-xl xs:w-44 sm:w-full m-auto  md:flex'>
                        <div className="flex-1">
                            <img src={`http://localhost:3000${dato.images[0].url}`} alt={dato.name} className='rounded-t-lg md:rounded-l-lg md:rounded-r-none w-full h-40' />
                        </div>
                        <div className='p-2 flex flex-col text-sm flex-1 relative'>
                            <h2 className='font-bold'>{dato.name}</h2>
                            <p>{dato.location}</p>
                            <p className='py-2'>
                            <span className='p-2 py-[2px] bg-azul text-white font-semibold rounded-3xl'>{dato.rating}</span> {dato.quality} - 
                            </p>
                            <p className=' absolute right-0 bottom-0 mr-5 mb-2'>Desde <span className='font-bold'>$ {dato.price}</span></p>
                        </div>
                    </div>
                </Link>
                );
            })}
            <Link to="/productos" ><p className="md:text-left text-md font-semibold text-azul hover:text-cyan-700">Ver todos los Productos</p></Link>
            </div>
        
        </div>
        
    </div>
  )
}

export default ProductosHome