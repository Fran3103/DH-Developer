import { Route, Routes } from "react-router-dom";
import Header from "./assets/Components/Header";

import Home from "./assets/Page/Home";
import Footer from "./assets/Components/Footer";
import Detalle from "./assets/features/products/components/Detalle";
import Admin from "./assets/features/admin/Admin";
import Productos from "./assets/features/products/components/Productos";
import { UserProvider } from "./assets/Context/UseContext";
import "./App.css";
import Perfil from "./assets/features/usuarios/Perfil";
import { Usuarios } from "./assets/features/usuarios/Usuarios";
import { ProductosAdmin } from "./assets/features/products/admin/ProductosAdmin";
import { AdministraCaracteristicas } from "./assets/features/caracteristicas/admin/AdministraCaracteristicas";
import VerificarCuenta from "./assets/Page/VarificacionCuenta";
import ProductListPage from "./assets/features/products/components/ProductListPage";
import { AdministraCategoria } from "./assets/features/categorias/admin/AdministraCategoria";


function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:catagory/:id" element={<Detalle />} />
            <Route path="/productos/" element={<Productos />} />
            <Route path="/productos/filter" element={<ProductListPage />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/verificar/*" element={<VerificarCuenta />} />
            <Route path="/admin/*" element={<Admin />} >
              <Route path="productos" element={<ProductosAdmin />}/>
              <Route index element={<ProductosAdmin />}/>
              <Route path="usuarios" element={<Usuarios />}/>
              <Route path="administrar caracteristicas" element={<AdministraCaracteristicas />}/>
              <Route path="agregar categorias" element={<AdministraCategoria />}/>
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
