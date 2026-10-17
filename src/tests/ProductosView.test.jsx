import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import ProductosView from '../views/ProductosView'
import { renderConProviders } from './utils'

describe('ProductosView', () => {
  test('muestra todos los productos de la lista', () => {
    renderConProviders(<ProductosView />, { ruta: '/productos' })

    // Hay un botón "Añadir" por cada producto (10 productos iniciales)
    expect(screen.getAllByRole('button', { name: /añadir/i })).toHaveLength(10)
  })

  test('filtra por el texto de búsqueda que viene en la URL', () => {
    renderConProviders(<ProductosView />, { ruta: '/productos?q=latte' })

    expect(screen.getByText('Café latte')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /añadir/i })).toHaveLength(1)
  })

  test('muestra un aviso solo cuando no hay resultados', () => {
    renderConProviders(<ProductosView />, { ruta: '/productos?q=pizza' })

    expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument()
  })

  test('filtra por categoría al cambiar el select', async () => {
    const user = userEvent.setup()
    renderConProviders(<ProductosView />, { ruta: '/productos' })

    await user.selectOptions(screen.getByLabelText('Categoría'), 'Pastelería')

    expect(screen.getAllByRole('button', { name: /añadir/i })).toHaveLength(2)
    expect(screen.getByText('Torta de chocolate')).toBeInTheDocument()
  })
})
