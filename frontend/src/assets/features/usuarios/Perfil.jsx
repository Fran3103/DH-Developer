import UserContext from "../../Context/UseContext";
import { useContext } from "react";

const Perfil = () => {
  const { user } = useContext(UserContext);


  return (
    <div className="p-12 className='flex flex-col justify-between items-center w-full m-auto gap-3 max-w-[1240px] xs:flex-wrap xs:flex-row xs:gap-0 sm:flex-row sm:gap-3' ">
      <h1 className="pt-20 text-2xl">Bienvenido {user.name}</h1>
      <h2 className="">Reservas Guardadas</h2>
    </div>
  );
};

export default Perfil;
