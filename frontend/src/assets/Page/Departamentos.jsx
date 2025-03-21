import Departamento  from "../Components/Departamento";
import useFetch from "../Hooks/useFetchData";


const Departamentos = () => {


  const { datos, error } = useFetch('http://localhost:3000/productos');

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datos) {
    return <div>Loading...</div>;
  }

  const  categorias = (datos.filter(product => product.category === "Departamentos"));
  return (
    <div className='m-auto  pt-[70px] md:pt-[90px] '>

        <h1  className=" text-red-700 ">Departamentos</h1>

        <div className='flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3'>
          {categorias.map((depto) => {  
            return (
                <Departamento

                key={depto.id}
                id={depto.id}
                name={depto.name}
                location={depto.location}
                category={depto.category}
                price={depto.price}
                rating={depto.rating}
                quality={depto.quality}
                description={depto.description}
                images={depto.images}
                address={depto.address}
                />
            );
          })}
        </div>


    </div>
  )
}

export default Departamentos