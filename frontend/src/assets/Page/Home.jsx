import Categorias from "../Components/Categorias"
import ProductosHome from "./ProductosHome"

import Recomendados from "../Page/Recomendados"
import Searcher from "../Components/Searcher"

const Home = () => {
  return (
    <div >

        <Searcher/>
        <Categorias/>
        <Recomendados/>
        <ProductosHome/>
    </div>
  )
}

export default Home