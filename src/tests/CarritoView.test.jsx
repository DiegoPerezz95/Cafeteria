import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import CarritoView from '../views/CarritoView'
import { guardarCarrito, renderConProviders } from './utils'

const carritoDePrueba = [
  { id: 1, nombre: 'Espresso', emoji: '☕', precio: 2200, stock: 50, cantidad: 1 },
  { id: 2, nombre: 'Café latte', emoji: '🥛', precio: 2700, stock: 40, cantidad: 2 },
]

describe('CarritoView', () => {
  test('muestra un aviso cuando el carrito está vacío', () => {
    renderConProviders(<CarritoView />)

    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
  })

  test('lista los productos del carrito y calcula el total', () => {
    guardarCarrito(carritoDePrueba)
    renderConProviders(<CarritoView />)

    expect(screen.getByText('Espresso')).toBeInTheDocument()
    expect(screen.getByText('Café latte')).toBeInTheDocument()
    // 2200 + 2700 x 2 = 7600
    expect(screen.getByTestId('total-carrito')).toHaveTextContent(/7\.?600/)
  })

  test('el botón + suma una unidad y actualiza el total', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    renderConProviders(<CarritoView />)

    await user.click(screen.getByRole('button', { name: 'Sumar Espresso' }))

    // 2200 x 2 + 2700 x 2 = 9800
    expect(screen.getByTestId('total-carrito')).toHaveTextContent(/9\.?800/)
  })

  test('el botón Eliminar quita el producto del carrito', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    renderConProviders(<CarritoView />)

    await user.click(screen.getByRole('button', { name: 'Eliminar Café latte' }))

    expect(screen.queryByText('Café latte')).not.toBeInTheDocument()
    expect(screen.getByTestId('total-carrito')).toHaveTextContent(/2\.?200/)
  })

  test('Vaciar carrito deja el carrito vacío', async () => {
    const user = userEvent.setup()
    guardarCarrito(carritoDePrueba)
    renderConProviders(<CarritoView />)

    await user.click(screen.getByRole('button', { name: /vaciar carrito/i }))

    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
  })
})
