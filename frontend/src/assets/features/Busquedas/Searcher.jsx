
import LocationInput from "./LocationInput";
import DateRangeInput from "./DateRangeInput";
import PropTypes from "prop-types";

const Searcher = ({ onClick, location, setDates, dates, setLocation }) => {
  

  return (
    <div className=" flex flex-col justify-center items-center z-0 relative bg-celesteOscuro  p-3 gap-5  py-4 pb-2 top-[70px] md:top-[90px] ">
      <h1 className="text-white text-xl text-center px-2  md:text-2xl lg:text-3xl ">
        Busca oferta en casas, departamentos, hoteles y más
      </h1>
     <div className="flex flex-col sm:flex-row gap-3 items-center">
       <LocationInput value={location} onChange={setLocation} />
      <DateRangeInput value={dates} onChange={setDates} />
      <button
        onClick={onClick}
        className="bg-celeste text-white px-6 py-2 rounded-lg hover:bg-azul transition"
      >
        Buscar
      </button>
     </div>
      <p className="-mt-4">Indica lugar y fecha para buscar alojamiento</p>
    </div>
  );
};


Searcher.propTypes = {
  onClick: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setDates: PropTypes.func.isRequired,
  dates: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
};


export default Searcher;
