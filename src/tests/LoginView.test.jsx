import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import LoginView from '../views/LoginView'
import { renderConProviders } from './utils'

function dibujarLogin() {
  return renderConProviders(<LoginView />, {
    ruta: '/login',
    path: '/login',
    otrasRutas: <Route path="/" element={<p>Página de inicio</p>} />,
  })
}

describe('LoginView', () => {
  test('no muestra ningún error al cargar la página', () => {
    dibujarLogin()

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('muestra un error si la contraseña es incorrecta', async () => {
    const user = userEvent.setup()
    dibujarLogin()

    await user.type(screen.getByLabelText('Correo'), 'cliente@cafearoma.cl')
    await user.type(screen.getByLabelText('Contraseña'), 'claveMala')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  })

  test('muestra un error si los campos están vacíos', async () => {
    const user = userEvent.setup()
    dibujarLogin()

    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/ingresa tu correo/i)
  })

  test('con datos correctos inicia sesión y vuelve al inicio', async () => {
    const user = userEvent.setup()
    dibujarLogin()

    await user.type(screen.getByLabelText('Correo'), 'cliente@cafearoma.cl')
    await user.type(screen.getByLabelText('Contraseña'), 'cliente123')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(screen.getByText('Página de inicio')).toBeInTheDocument()

    const sesion = JSON.parse(localStorage.getItem('cafe_sesion'))
    expect(sesion.correo).toBe('cliente@cafearoma.cl')
    expect(sesion.clave).toBeUndefined() // la contraseña nunca se guarda en la sesión
  })
})
