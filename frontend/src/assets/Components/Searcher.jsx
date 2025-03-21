import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import '../Css/search.css'

const Searcher = () => {


  return (
    <div className=" flex flex-col items-center z-0 relative bg-celesteOscuro  p-3 gap-5  py-4 pb-5 top-[70px] md:top-[90px]" >

      <h1 className='text-white text-xl text-center px-2  md:text-2xl lg:text-3xl '>Busca oferta en casas, departamentos, hoteles y más </h1>

      <div className='flex flex-col gap-2 items-center sm:flex-row' >
        
          <div className='flex items-center gap-2  p-1 rounded-lg bg-blanco relative  '>
          <FaMapMarkerAlt className='text-gray-400 absolute top-4 left-2 z-10'/>
            <input className='p-2 rounded-lg pl-6 sm:w-40 md:w-64  lg:w-80'
                placeholder="¿A dónde vamos?"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
          </div>
          <div className='flex items-center gap-2   p-1 rounded-lg  bg-blanco relative'>
            <FaCalendarAlt className='text-gray-400  absolute top-4 left-2 z-10'/>
            <input className='p-2 rounded-lg pl-6 md:w-64 lg:w-80'
                placeholder="Check-in - Check-out"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
          </div>
            <button type="submit" className='flex flex-row items-center gap-2 bg-celeste w-52 sm:w-40  md:w-52
            m-auto justify-center rounded-lg  p-2 text-white'>  Buscar</button>
           
      
      </div>
    </div>
  );
}


export default Searcher