import Categorias from "../features/categorias/Categorias"
import ProductosHome from "../features/products/components/ProductosHome"

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