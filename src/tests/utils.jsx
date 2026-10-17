import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

// Dibuja un componente con todo lo que necesita para funcionar en una prueba:
// - MemoryRouter: un router "falso" que no usa la barra del navegador
// - AuthProvider y CarritoProvider: los contextos de sesión y carrito
//
// ruta: la URL inicial, por ejemplo '/productos?q=latte'
// path: el patrón de la ruta, por ejemplo '/productos/:id' (para usar useParams)
// otrasRutas: rutas extra para comprobar a dónde navega el componente
export function renderConProviders(ui, { ruta = '/', path = '*', otrasRutas = null } = {}) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider>
        <CarritoProvider>
          <Routes>
            <Route path={path} element={ui} />
            {otrasRutas}
          </Routes>
        </CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

// Deja guardado un carrito en localStorage antes de dibujar la vista
export function guardarCarrito(items) {
  localStorage.setItem('cafe_carrito', JSON.stringify(items))
}

// Deja una sesión iniciada en localStorage antes de dibujar la vista
export function guardarSesion(usuario) {
  localStorage.setItem('cafe_sesion', JSON.stringify(usuario))
}
