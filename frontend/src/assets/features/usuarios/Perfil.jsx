import UserContext from "../../Context/UseContext";
import { useContext } from "react";
import Favoritos from "../products/components/Favoritos";

const Perfil = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (!user) {
    return <div>No hay usuario autenticado.</div>;
  }


  return (
    <div className="p-12 className='flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3' ">
      <h1 className="pt-20 text-2xl">Bienvenido {user.name}</h1>
      <h2 className="">Reservas Guardadas</h2>
      <div className="w-full flex flex-col justify-center items-center gap-6">
       <Favoritos />
      </div>
    </div>
  );
};

export default Perfil;
