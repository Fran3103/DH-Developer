import { NavegacionAdmin } from "../admin/NavegacionAdmin";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../Context/UseContext";

const Admin = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const {user} = useContext(UserContext)
 
  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
  
      window.addEventListener("resize", handleResize);
  
      // Limpia el event listener al desmontar el componente
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    if (isMobile ) {
      return (
        <div className="flex justify-center items-center h-screen bg-celeste">
          <h1 className="text-white text-2xl">
            Esta pagina solo está disponible en dispositivos de escritorio.
          </h1>
        </div>
      );
    }
    if (user?.role?.[0] === "USER" ) {
      return (
        <div className="flex justify-center items-center h-screen bg-celeste">
          <h1 className="text-white text-2xl">
            Esta pagina solo está disponible para Administradores.
          </h1>
        </div>
      );
    }
    if (user === null ) {
      return (
        <div className="flex justify-center items-center h-screen bg-celeste">
          <h1 className="text-white text-2xl">
            Debe iniciar sesion como administrador para poder ver esta pagina
          </h1>
        </div>
      );
    }
    else{
  return (
    <div className="m-auto w-full mt-[85px]   ">
        <div className="flex flex-1 ">
          <div className="bg-celeste flex- w-64 max-h-full ">{<NavegacionAdmin/>}</div>
          <div className="flex-1 w-full h-[843px] bg-azul  ">
            <Outlet/>
          
          </div>
        </div>
      </div>
    
  );
}}

export default Admin;
