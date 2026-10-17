import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import HomeView from './views/HomeView'
import MenuView from './views/MenuView'
import ReservaView from './views/ReservaView'
import NosotrosView from './views/NosotrosView'
import ContactoView from './views/ContactoView'

function App() {
  return (
    <div className="app-shell">
      <AppNavbar />

      <Container className="py-4">
        <div className="app-area">
          <div className="area-label">App.jsx — contenedor principal</div>

          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/menu" element={<MenuView />} />
            <Route path="/reserva" element={<ReservaView />} />
            <Route path="/nosotros" element={<NosotrosView />} />
            <Route path="/contacto" element={<ContactoView />} />
          </Routes>
        </div>
      </Container>
    </div>
  )
}

export default App
