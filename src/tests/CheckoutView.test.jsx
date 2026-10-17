import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { obtenerOrdenes, obtenerProductoPorId } from '../data/datos'
import CheckoutView from '../views/CheckoutView'
import PagoErrorView from '../views/PagoErrorView'
import PagoExitosoView from '../views/PagoExitosoView'
import { guardarCarrito, guardarSesion, renderConProviders } from './utils'

const carritoDePrueba = [
  { id: 1, nombre: 'Espresso', emoji: '☕', precio: 2200, stock: 50, cantidad: 2 },
]

const clienteConSesion = {
  id: 2,
  nombre: 'Camila',
  apellidos: 'Rojas',
  correo: 'cliente@cafearoma.cl',
  rol: 'cliente',
  calle: 'Los Aromos 456',
  region: 'Región Metropolitana',
  comuna: 'Maipú',
}

function dibujarCheckout() {
  return renderConProviders(<CheckoutView />, {
    ruta: '/checkout',
    path: '/checkout',
    otrasRutas: (
      <>
        <Route path="/pago-exitoso/:id" element={<PagoExitosoView />} />
        <Route path="/pago-error/:id" element={<PagoErrorView />} />
      </>
    ),
  })
}

describe('CheckoutView', () => {
  test('si hay sesión iniciada, completa los datos del cliente', () => {
    guardarCarrito(carritoDePrueba)
    guardarSesion(clienteConSesion)
    dibujarCheckout()

    expect(screen.getByLabelText('Nombre')).toHaveValue('Camila')
    expect(screen.getByLabelText('Correo')).toHaveValue('cliente@cafearoma.cl')
    expect(screen.getByLabelText('Comuna')).toHaveValue('Maipú')
  })

  test('muestra errores si faltan datos obligatorios', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    dibujarCheckout()

    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))

    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('La calle es obligatoria.')).toBeInTheDocument()
    expect(obtenerOrdenes()).toHaveLength(0)
  })

  test('un pago aprobado crea la orden, descuenta stock y vacía el carrito', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    guardarSesion(clienteConSesion)
    dibujarCheckout()

    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))

    expect(screen.getByRole('heading', { name: /se ha realizado la compra/i })).toBeInTheDocument()
    expect(obtenerOrdenes()[0].estado).toBe('pagada')
    expect(obtenerProductoPorId(1).stock).toBe(48) // tenía 50 y se compraron 2
    expect(JSON.parse(localStorage.getItem('cafe_carrito'))).toEqual([])
  })

  test('un pago rechazado muestra la vista de error y mantiene el carrito', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    guardarSesion(clienteConSesion)
    dibujarCheckout()

    await user.click(screen.getByLabelText(/simular pago rechazado/i))
    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))

    expect(screen.getByRole('heading', { name: /no se pudo realizar el pago/i })).toBeInTheDocument()
    expect(obtenerOrdenes()[0].estado).toBe('rechazada')
    expect(JSON.parse(localStorage.getItem('cafe_carrito'))).toHaveLength(1)
  })

  test('con "Retiro en tienda" se oculta la dirección y se puede pagar sin calle', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    guardarSesion({ ...clienteConSesion, calle: '' })
    dibujarCheckout()

    await user.selectOptions(screen.getByLabelText('Tipo de entrega'), 'retiro')

    expect(screen.queryByLabelText('Calle')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))

    expect(obtenerOrdenes()[0].direccion.entrega).toBe('retiro')
    expect(screen.getByText('Retiro en tienda')).toBeInTheDocument()
  })

  test('en la compra exitosa se puede enviar la boleta por email', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    guardarSesion(clienteConSesion)
    dibujarCheckout()

    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    await user.click(screen.getByRole('button', { name: /enviar boleta por email/i }))

    expect(screen.getByText(/boleta enviada a cliente@cafearoma.cl/i)).toBeInTheDocument()
  })
})
