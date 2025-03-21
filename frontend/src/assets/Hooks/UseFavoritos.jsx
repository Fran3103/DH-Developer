import { useState, useContext } from "react"
import UserContext from "../Context/UseContext"


const UseFavoritos = () => {

    const {user} = useContext(UserContext) 
    const [favoritos, setFavoritos] = useState([])

    const toggleFavoritos = ()


  return (
    <div>UseFavoritos</div>
  )
}

export default UseFavoritos