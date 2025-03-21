import { Route, Routes } from "react-router-dom";
import Header from "./assets/Components/Header";

import Home from "./assets/Page/Home";
import Hoteles from "./assets/Page/Hoteles";
import Casas from "./assets/Page/Casas";
import Departamentos from "./assets/Page/Departamentos";
import Footer from "./assets/Components/Footer";
import Detalle from "./assets/Page/Detalle";
import Admin from "./assets/Page/Admin";
import Productos from "./assets/Page/Productos";
import { UserProvider } from "./assets/Context/UseContext";
import "./App.css";
import Perfil from "./assets/Page/Perfil";
import { Usuarios } from "./assets/Components/Usuarios";
import { ProductosAdmin } from "./assets/Components/ProductosAdmin";

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Hoteles" element={<Hoteles />} />
            <Route path="/Casas" element={<Casas />} />
            <Route path="/Departamentos" element={<Departamentos />} />
            <Route path="/:catagory/:id" element={<Detalle />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin/*" element={<Admin />} >
              <Route path="productosAdmin" element={<ProductosAdmin />}/>
              <Route path="usuarios" element={<Usuarios />}/>
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
