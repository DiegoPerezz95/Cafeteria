import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import ListaProductos from '../components/ListaProductos'
import { obtenerProductos } from '../data/datos'
import { renderConProviders } from './utils'

describe('Agregar productos al carrito', () => {
  test('al presionar "Añadir" se guarda en el carrito y aparece un aviso', async () => {
    const user = userEvent.setup()
    const productos = obtenerProductos().slice(0, 2) // Espresso y Café latte
    renderConProviders(<ListaProductos productos={productos} />)

    // Antes de hacer clic no hay aviso (renderizado condicional)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: /añadir/i })[0])

    expect(screen.getByRole('alert')).toHaveTextContent(/agregaste espresso al carrito/i)

    const carrito = JSON.parse(localStorage.getItem('cafe_carrito'))
    expect(carrito).toHaveLength(1)
    expect(carrito[0]).toMatchObject({ id: 1, nombre: 'Espresso', cantidad: 1 })
  })

  test('si se agrega dos veces el mismo producto, suma la cantidad', async () => {
    const user = userEvent.setup()
    const productos = obtenerProductos().slice(0, 1)
    renderConProviders(<ListaProductos productos={productos} />)

    const boton = screen.getByRole('button', { name: /añadir/i })
    await user.click(boton)
    await user.click(boton)

    const carrito = JSON.parse(localStorage.getItem('cafe_carrito'))
    expect(carrito).toHaveLength(1)
    expect(carrito[0].cantidad).toBe(2)
  })
})
