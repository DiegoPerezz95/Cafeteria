import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { buscarUsuarioPorCorreo } from '../data/datos'
import RegistroView, { validarRegistro } from '../views/RegistroView'
import { renderConProviders } from './utils'

function dibujarRegistro() {
  return renderConProviders(<RegistroView />, {
    ruta: '/registro',
    path: '/registro',
    otrasRutas: <Route path="/" element={<p>Página de inicio</p>} />,
  })
}

async function llenarFormulario(user, { correo = 'nuevo@correo.cl', confirmar = 'secreta1' } = {}) {
  await user.type(screen.getByLabelText('Nombre'), 'Pedro')
  await user.type(screen.getByLabelText('Apellidos'), 'Soto')
  await user.type(screen.getByLabelText('Correo'), correo)
  await user.type(screen.getByLabelText('Contraseña'), 'secreta1')
  await user.type(screen.getByLabelText('Confirmar contraseña'), confirmar)
  await user.type(screen.getByLabelText('Dirección (calle y número)'), 'Las Rosas 10')
}

describe('RegistroView', () => {
  test('el estado del formulario cambia cuando el usuario escribe', async () => {
    const user = userEvent.setup()
    dibujarRegistro()

    const inputNombre = screen.getByLabelText('Nombre')
    await user.type(inputNombre, 'Pedro')

    expect(inputNombre).toHaveValue('Pedro')
  })

  test('muestra un error si las contraseñas no coinciden', async () => {
    const user = userEvent.setup()
    dibujarRegistro()

    await llenarFormulario(user, { confirmar: 'otraClave' })
    await user.click(screen.getByRole('button', { name: /registrarme/i }))

    expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument()
    expect(buscarUsuarioPorCorreo('nuevo@correo.cl')).toBeNull()
  })

  test('con datos válidos crea la cuenta y vuelve al inicio', async () => {
    const user = userEvent.setup()
    dibujarRegistro()

    await llenarFormulario(user)
    await user.click(screen.getByRole('button', { name: /registrarme/i }))

    expect(screen.getByText('Página de inicio')).toBeInTheDocument()
    expect(buscarUsuarioPorCorreo('nuevo@correo.cl')).toMatchObject({ nombre: 'Pedro', rol: 'cliente' })
  })

  test('avisa si el correo ya está registrado', async () => {
    const user = userEvent.setup()
    dibujarRegistro()

    await llenarFormulario(user, { correo: 'cliente@cafearoma.cl' })
    await user.click(screen.getByRole('button', { name: /registrarme/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Ya existe un usuario con ese correo')
  })
})

describe('validarRegistro', () => {
  test('detecta correo inválido y contraseña corta', () => {
    const errores = validarRegistro({
      nombre: 'Ana',
      apellidos: 'Díaz',
      correo: 'correo-malo',
      clave: '123',
      confirmarClave: '123',
      calle: 'Calle 1',
    })

    expect(errores.correo).toBeDefined()
    expect(errores.clave).toBeDefined()
    expect(errores.nombre).toBeUndefined()
  })
})
