import { useContext, useEffect, useState } from "react";
import UserContext from "../../../Context/UseContext";
import { getFavoriteIds } from "./favoritosServices";
import { fetchProductosByIds } from "../productoService";
import { Link } from "react-router-dom";

const Favoritos = () => {
  const { user, loanding } = useContext(UserContext);
  const [Fav, setFav] = useState([]);
  const [loadingFav, setLoadingFav] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const ids = await getFavoriteIds();
        console.log("IDs de favoritos obtenidos:", ids);
        const data = await fetchProductosByIds(ids);
        console.log("Productos favoritos obtenidos:", data);
        if (isMounted) setFav(data);
      } catch (e) {
        if (isMounted) setFav([]);
        console.error("Error favoritos:", e);
      } finally {
        if (isMounted) setLoadingFav(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loanding || loadingFav) return <div>Cargando favoritos...</div>;
  if (!user) return <div>No hay usuario autenticado.</div>;

  console.log("Favoritos cargados:", Fav);
  return (
    <div>
      Favoritos:
      <div className="flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3">
      {Fav?.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        Fav?.map((p) => (
            <Link key={p.id} to={`/producto/${p.id}`}>
              <div className="w-72 h-72  rounded-lg shadow-lg hover:shadow-xl xs:w-44 sm:w-[500px] sm:flex sm:h-44  sm:rounded-l-lg md:w-[640px] lg:w-[450px] lg:grid-cols-2 place-content-center ">
                <div className="sm:w-96">
                  <img
                    src={`http://localhost:3000${p.imagenUrl}`}
                    alt={p.name}
                    className="rounded-t-lg w-full h-40 sm:rounded-l-lg sm:rounded-r-none sm:h-full "
                  />
                </div>
                <div className="p-2 flex flex-col text-sm w-full relative">
                  <h2 className="font-bold">{p.name}</h2>
                  <p>{p.location}</p>
                  <p className="py-2">
                    <span className="p-2 py-[2px] bg-azul text-white font-semibold rounded-3xl">
                      {p.rating}
                    </span>{" "}
                    {p.quality} -
                  </p>
                </div>
                <p className="text-right mr-5 mb-2">
                  Desde <span className="font-bold">$ {p.price}</span>
                </p>
              </div>
            </Link>
        ))
      )}
      </div>
    </div>
  );
};

export default Favoritos;
