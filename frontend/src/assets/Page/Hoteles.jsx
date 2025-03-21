
import Hotel from "../Components/Hotel";
import useFetch from "../Hooks/useFetchData";


const Hoteles = () => {

  const { datos, error } = useFetch('http://localhost:3000/productos');

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datos) {
    return <div>Loading...</div>;
  }

  const  categorias = (datos.filter(product => product.category === "Hoteles"));

  return (
    <div className='m-auto  pt-[70px] md:pt-[90px] '>

        <h1  className=" text-red-700 ">Hoteles</h1>

        <div className='flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3'>
          {categorias.map((hotel) => {  
            return (
                <Hotel 
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                location={hotel.location}
                category={hotel.category}
                price={hotel.price}
                rating={hotel.rating}
                quality={hotel.quality}
                description={hotel.description}
                images={hotel.images}
                addres={hotel.addres}
                />
            );
          })}
        </div>


    </div>
  )
}

export default Hoteles