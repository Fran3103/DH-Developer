import { NavegacionAdmin } from "../Components/NavegacionAdmin";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Admin = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
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
    if (isMobile) {
      return (
        <div className="flex justify-center items-center h-screen bg-celeste">
          <h1 className="text-white text-2xl">
            Esta pagina solo está disponible en dispositivos de escritorio.
          </h1>
        </div>
      );
    }
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
};

export default Admin;
