import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import AdminLayout from '../components/admin/AdminLayout'
import { AuthProvider } from '../context/AuthContext'
import { guardarSesion } from './utils'

function dibujarPanel() {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<p>Contenido del panel</p>} />
          </Route>
          <Route path="/login" element={<p>Página de login</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('AdminLayout (protección del panel)', () => {
  test('sin sesión, redirige a la página de login', () => {
    dibujarPanel()

    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })

  test('un cliente ve el mensaje de acceso denegado', () => {
    guardarSesion({ id: 2, nombre: 'Camila', correo: 'cliente@cafearoma.cl', rol: 'cliente' })
    dibujarPanel()

    expect(screen.getByText('Acceso solo para administradores')).toBeInTheDocument()
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })

  test('un administrador ve el menú y el contenido', () => {
    guardarSesion({ id: 1, nombre: 'Admin', correo: 'admin@cafearoma.cl', rol: 'admin' })
    dibujarPanel()

    expect(screen.getByText('Contenido del panel')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /productos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /usuarios/i })).toBeInTheDocument()
  })
})
