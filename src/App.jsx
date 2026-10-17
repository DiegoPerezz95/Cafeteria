import { Routes, Route } from 'react-router-dom'
import TiendaLayout from './components/TiendaLayout'
import HomeView from './views/HomeView'
import ProductosView from './views/ProductosView'
import DetalleProductoView from './views/DetalleProductoView'
import CategoriasView from './views/CategoriasView'
import OfertasView from './views/OfertasView'
import NosotrosView from './views/NosotrosView'
import BlogView from './views/BlogView'
import DetalleBlogView from './views/DetalleBlogView'
import ContactoView from './views/ContactoView'
import LoginView from './views/LoginView'
import RegistroView from './views/RegistroView'
import CarritoView from './views/CarritoView'
import CheckoutView from './views/CheckoutView'
import PagoExitosoView from './views/PagoExitosoView'
import PagoErrorView from './views/PagoErrorView'
import NoEncontradoView from './views/NoEncontradoView'

function App() {
  return (
    <Routes>
      {/* Todas estas rutas comparten el Navbar y el Footer de TiendaLayout */}
      <Route element={<TiendaLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/productos" element={<ProductosView />} />
        <Route path="/productos/:id" element={<DetalleProductoView />} />
        <Route path="/categorias" element={<CategoriasView />} />
        <Route path="/categorias/:id" element={<CategoriasView />} />
        <Route path="/ofertas" element={<OfertasView />} />
        <Route path="/nosotros" element={<NosotrosView />} />
        <Route path="/blog" element={<BlogView />} />
        <Route path="/blog/:id" element={<DetalleBlogView />} />
        <Route path="/contacto" element={<ContactoView />} />

        {/* Usuarios */}
        <Route path="/login" element={<LoginView />} />
        <Route path="/registro" element={<RegistroView />} />

        {/* Proceso de compra */}
        <Route path="/carrito" element={<CarritoView />} />
        <Route path="/checkout" element={<CheckoutView />} />
        <Route path="/pago-exitoso/:id" element={<PagoExitosoView />} />
        <Route path="/pago-error/:id" element={<PagoErrorView />} />

        <Route path="*" element={<NoEncontradoView />} />
      </Route>
    </Routes>
  )
}

export default App
