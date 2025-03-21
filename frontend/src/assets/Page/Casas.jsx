
import Casa from "../Components/Casa";
import useFetch from "../Hooks/useFetchData";


const Casas = () => {

  const { datos, error } = useFetch('http://localhost:3000/productos');

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datos) {
    return <div>Loading...</div>;
  }

  const  categorias = (datos.filter(product => product.category === "Casas"));
  return (
    <div className='m-auto  pt-[70px] md:pt-[90px] '>

        <h1  className=" text-red-700 ">Casas</h1>

        <div className='flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3'>
          {categorias.map((casa) => {  
            return (
                <Casa 
                key={casa.id}
                id={casa.id}
                name={casa.name}
                location={casa.location}
                category={casa.category}
                price={casa.price}
                rating={casa.rating}
                quality={casa.quality}
                description={casa.description}
                images={casa.images}
                address={casa.address}
                />
            );
          })}
        </div>

          <div>
            <button></button>
            <p>{}</p> 
            <button></button>
          </div>
    </div>
  )
}

export default Casas