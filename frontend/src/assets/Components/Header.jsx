import { useContext, useEffect, useState, useRef } from "react";
import icon from "../../icono.svg";
import "../styles/Header.css";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import RegisterForm from "../features/auth/RegisterForm";
import InicioSesion from "../features/auth/InicioSesion";
import UserContext from "../Context/UseContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [iniciarSesion, setIniciarSesion] = useState(false);
  const { user, logout } = useContext(UserContext);
  const menuRef = useRef(null);

  useEffect(() => {
    // funcion para que el menu se cierre cuando se hace click en otro lado
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setMenuUser(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const name =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "";
  const lastName =
    user?.lastName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "";

  const avatar = name + lastName;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setMenuUser((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigator("/");
  };

  return (
    <>
      <div className="w-screen bg-celeste  fixed z-40 ">
        <div className="flex w-full flex-row justify-between items-center bg-celeste p-3 pt-4 max-w-[1240px] relative z-30 m-auto">
          <div className=" flex justify-center items-center text-xs text-blanco max-h-11  md:max-h-16">
            <Link to={"/"}>
              <img
                src={icon}
                alt="Logo de marca"
                className=" w-12 h-12 md:w-16 md:h-16 cursor-pointer "
              />
            </Link>
            <p className=" mt-8  md:mt-12 md:text-sm text-white">
              Alojarse nunca fue tan fácil
            </p>
          </div>

          {user ? (
            <>
              <div className=" relative cursor-pointer " ref={menuRef}>
                <div
                  onClick={toggleUserMenu}
                  className="flex items-center justify-around gap-3"
                >
                  <span className="hidden md:block text-white text-sm">
                    {user.name} {user.lastName}
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-celeste text-white text-lg font-semibold">
                    {avatar}
                  </span>
                </div>
                <div
                  className={`${
                    menuUser
                      ? "btn-container-user active-user  text-white rounded-lg py-2 px-2"
                      : " btn-container-user   text-white rounded-lg"
                  }`}
                >
                  <span className="pl-3 pt-3 md:hidden text-white text-sm">
                    {" "}
                    {user.name} {user.lastName}
                  </span>
                  <hr className="w-full border-gray-300 " />
                  <li className="list-none hover:shadow-xl w-full rounded-lg text-left pl-3">
                    <Link to={"/perfil"} onClick={toggleUserMenu}>
                      Perfil
                    </Link>
                  </li>
                  {user?.role[0] === "ADMIN" ? (
                    <li
                      onClick={toggleUserMenu}
                      className="list-none hover:shadow-xl w-full rounded-lg text-left pl-3"
                    >
                      <Link to={"/admin"}>Panel Administrador</Link>
                    </li>
                  ) : (
                    <li
                      onClick={toggleUserMenu}
                      className="list-none hover:shadow-xl w-full rounded-lg text-left pl-3"
                    >
                      <Link to={"/use-config"}>Configuracion</Link>
                    </li>
                  )}
                  <li
                    onClick={toggleUserMenu}
                    className="list-none hover:shadow-xl w-full rounded-lg text-left pl-3"
                  >
                    <div onClick={handleLogout}>Cerrar Sesion</div>
                  </li>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={toggleMenu}
              className="md:hidden w-0 mr-10 text-white hover:text-gray-400 cursor-pointer "
            >
              <FaBars className="m-auto text-xl" />
            </button>
          )}
        </div>
        <div
          className={`${
            menuOpen
              ? "btn-container active md:hidden  text-white"
              : "text-white btn-container  md:hidden"
          }`}
        >
          <button
            onClick={() => {
              setMostrarFormulario(true), setMenuOpen(!menuOpen);
            }}
            className="button"
          >
            Crear Cuenta
          </button>
          <button
            onClick={() => {
              setIniciarSesion(true), setMenuOpen(!menuOpen);
            }}
            className="button"
          >
            Iniciar Sesion
          </button>
        </div>
      </div>

      {/* Modal Registro */}
      {mostrarFormulario && (
        <RegisterForm
          cerrar={() => setMostrarFormulario(false)}
          confirmar={() => {
            setMostrarFormulario(false);
          }}
        />
      )}
      {/* Modal para Inicio de Sesion */}
      {iniciarSesion && (
        <InicioSesion
          cerrar={() => setIniciarSesion(false)}
          confirmar={() => {
            setIniciarSesion(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
