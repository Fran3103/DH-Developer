import { Link } from "react-router-dom"
import { Avatar } from "../Hooks/Avatar"

export const NavegacionAdmin = () => {


   


  return (
    <div className="h-full w-full bg-white  p-3">

        <Avatar/>

        <ul>
            <li><Link to={"productosAdmin"}>Productos</Link></li>
            <li><Link to={"usuarios"}>Usuarios</Link></li>
            <li><Link to={"configuracion"}>Configuracion</Link></li>
            
        </ul>
    </div>
  )
}
