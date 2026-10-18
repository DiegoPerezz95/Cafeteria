import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { obtenerProductoPorId } from '../data/datos'
import AdminProductosView from '../views/admin/AdminProductosView'
import { renderConProviders } from './utils'

describe('AdminProductosView', () => {
  test('muestra una fila por cada producto', () => {
    renderConProviders(<AdminProductosView />)

    expect(screen.getAllByRole('button', { name: /^eliminar /i })).toHaveLength(10)
  })

  test('elimina un producto después de confirmar', async () => {
    const user = userEvent.setup()
    renderConProviders(<AdminProductosView />)

    await user.click(screen.getByRole('button', { name: 'Eliminar Espresso' }))
    await user.click(screen.getByRole('button', { name: /sí, eliminar/i }))

    expect(screen.queryByRole('button', { name: 'Eliminar Espresso' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^eliminar /i })).toHaveLength(9)
    expect(obtenerProductoPorId(1)).toBeNull()
  })

  test('si se cancela, el producto no se elimina', async () => {
    const user = userEvent.setup()
    renderConProviders(<AdminProductosView />)

    await user.click(screen.getByRole('button', { name: 'Eliminar Espresso' }))
    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(obtenerProductoPorId(1)).not.toBeNull()
  })

  test('con soloCriticos muestra solo los productos con poco stock', () => {
    renderConProviders(<AdminProductosView soloCriticos />)

    // Cappuccino (4), Cold brew (3) y Empanada de queso (2)
    expect(screen.getAllByRole('button', { name: /^eliminar /i })).toHaveLength(3)
    expect(screen.getByText('Cold brew')).toBeInTheDocument()
  })
})
