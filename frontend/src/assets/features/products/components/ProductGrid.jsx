import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductsGrid({ items }) {
  if (!items.length) {
    return <p className="p-4 text-center">No hay productos para mostrar.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-4">
      {items.map((item) => (
        <Link
          to={`/producto/${item.id}`}
          key={item.id}
          className="bg-white rounded-lg overflow-hidden border shadow hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col h-full  w-full lg:w-[200px]">
            <img
              src={`http://localhost:3000${item.images?.[0].url}`}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1 capitalize">
                {item.name}
              </h3>
              <p className="text-xs text-gray-600">${item.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

ProductsGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};
