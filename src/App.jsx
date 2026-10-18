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
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboardView from './views/admin/AdminDashboardView'
import AdminOrdenesView from './views/admin/AdminOrdenesView'
import AdminBoletaView from './views/admin/AdminBoletaView'
import AdminProductosView from './views/admin/AdminProductosView'
import AdminProductoDetalleView from './views/admin/AdminProductoDetalleView'
import AdminProductoFormView from './views/admin/AdminProductoFormView'
import AdminCategoriasView from './views/admin/AdminCategoriasView'
import AdminUsuariosView from './views/admin/AdminUsuariosView'
import AdminUsuarioDetalleView from './views/admin/AdminUsuarioDetalleView'
import AdminUsuarioFormView from './views/admin/AdminUsuarioFormView'
import AdminReportesView from './views/admin/AdminReportesView'
import AdminPerfilView from './views/admin/AdminPerfilView'

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

      {/* Panel de administrador: AdminLayout revisa que el usuario sea admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardView />} />
        <Route path="ordenes" element={<AdminOrdenesView />} />
        <Route path="ordenes/:id" element={<AdminBoletaView />} />
        <Route path="productos" element={<AdminProductosView />} />
        <Route path="productos/criticos" element={<AdminProductosView soloCriticos />} />
        <Route path="productos/nuevo" element={<AdminProductoFormView />} />
        <Route path="productos/:id" element={<AdminProductoDetalleView />} />
        <Route path="productos/:id/editar" element={<AdminProductoFormView />} />
        <Route path="categorias" element={<AdminCategoriasView />} />
        <Route path="usuarios" element={<AdminUsuariosView />} />
        <Route path="usuarios/nuevo" element={<AdminUsuarioFormView />} />
        <Route path="usuarios/:id" element={<AdminUsuarioDetalleView />} />
        <Route path="usuarios/:id/editar" element={<AdminUsuarioFormView />} />
        <Route path="reportes" element={<AdminReportesView />} />
        <Route path="perfil" element={<AdminPerfilView />} />
      </Route>
    </Routes>
  )
}

export default App
