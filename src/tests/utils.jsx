import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CarritoProvider } from '../context/CarritoContext'

// Dibuja un componente con todo lo que necesita para funcionar en una prueba:
// - MemoryRouter: un router "falso" que no usa la barra del navegador
// - CarritoProvider: el contexto del carrito
//
// ruta: la URL inicial, por ejemplo '/productos?q=latte'
// path: el patrón de la ruta, por ejemplo '/productos/:id' (para usar useParams)
export function renderConProviders(ui, { ruta = '/', path = '*' } = {}) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <CarritoProvider>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>
  )
}
