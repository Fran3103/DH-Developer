import { useState } from "react";
import { Link } from "react-router-dom";

export const NavegacionAdmin = () => {
  const [selected, setSelected] = useState(0);


  const handleClick = (index) => {
    setSelected(index);

  };

  return (
    <div className="h-full w-full   p-3 pr-0 flex flex-col gap-5  ">
      <h1 className="text-black pl-4 pt-3">Panel de Administrador </h1>

      <ul className="flex flex-col gap-6 mt-7 pl-4">
      {["productosAdmin", "usuarios", "configuracion"].map((route, index) => (
          <li
            key={index}
            className={`w-full rounded-l p-2 transition-all ${
              selected === index ? "bg-azul text-white" : "bg-transparent text-black"
            }`}
            onClick={() => handleClick(index)}
          >
            <Link className="block p-2 w-full" to={route}>
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
