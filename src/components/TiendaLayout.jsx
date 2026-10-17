import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import AppNavbar from './AppNavbar'
import Footer from './Footer'

// Estructura común de la tienda: Navbar arriba, contenido al medio y Footer abajo.
// <Outlet /> es el lugar donde React Router dibuja la vista de la ruta actual.
function TiendaLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <Container as="main" className="py-4 flex-grow-1">
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}

export default TiendaLayout
