import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const Recomendado = ({id, category, name, location, rating, quality, price, images}) => {


// eslint-disable-next-line react/prop-types
  const imageUrl = `http://localhost:3000${images[0].url}` ;
  return (
    <div className='m-auto mt-3 md:mt-4 mb-[50px]'>
      <div className='m-auto w-full max-w-[1240px] p-3'>
        
        <div className='flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3'>
         
            

          <Link key={id} to={`/${category}/${id}`}>
                <div className='w-72 h-72 rounded-lg shadow-lg hover:shadow-xl xs:w-44 sm:w-40 md:w-48 lg:w-56'>
                  <div>
                    <img src={imageUrl} alt={name} className='rounded-t-lg w-full h-40' />
                  </div>
                  <div className='p-2 flex flex-col text-sm'>
                    <h2 className='font-bold'>{name}</h2>
                    <p>{location}</p>
                    <p className='py-2'>
                      <span className='p-2 py-[2px] bg-azul text-white font-semibold rounded-3xl'>{rating}</span> {quality} - 
                    </p>
                  </div>
                  <p className='text-right mr-5 mb-2'>Desde <span className='font-bold'>$ {price}</span></p>
                </div>
              </Link>
        </div>
      </div>
    </div>
  );
};

export default Recomendado;
