import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductoFiltrados = ({ products }) => {
  return (
    <div className="m-auto p-4 max-w-[1240px] gap-4">
      <h2>
        Resultados de busque de{" "}
        <span className="font-bold">{products[0].location}</span>
      </h2>
      <div className="flex flex-wrap">
        {products.map((producto) => (
          <div key={producto.id} className="m-auto mt-3 md:mt-4 mb-[50px]">
            <div className="m-auto w-full max-w-[1240px] p-3">
              <div className="flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3">
                <Link to={`/${producto.category}/${producto.id}`}>
                  <div className="w-72 h-72  rounded-lg shadow-lg hover:shadow-xl xs:w-44 sm:w-[500px] sm:flex sm:h-44  sm:rounded-l-lg md:w-[640px] lg:w-[450px] lg:grid-cols-2 place-content-center ">
                    <div className="sm:w-96">
                      <img
                        src={`http://localhost:3000${producto.images[0].url}`}
                        alt={producto.name}
                        className="rounded-t-lg w-full h-40 sm:rounded-l-lg sm:rounded-r-none sm:h-full "
                      />
                    </div>
                    <div className="p-2 flex flex-col text-sm w-full">
                      <h2 className="font-bold">{producto.name}</h2>
                      <p>{producto.location}</p>
                      <p className="py-2">
                        <span className="p-2 py-[2px] bg-azul text-white font-semibold rounded-3xl">
                          {producto.rating}
                        </span>{" "}
                        {producto.quality} -
                      </p>
                    </div>
                    <p className="text-right mr-5 mb-2">
                      Desde{" "}
                      <span className="font-bold">$ {producto.price}</span>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductoFiltrados.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductoFiltrados;
