import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { obtenerCategorias } from '../data/datos'
import AdminCategoriasView from '../views/admin/AdminCategoriasView'

describe('AdminCategoriasView', () => {
  test('crea una categoría nueva y la muestra en la tabla', async () => {
    const user = userEvent.setup()
    render(<AdminCategoriasView />)

    await user.type(screen.getByLabelText('Nombre'), 'Tés')
    await user.click(screen.getByRole('button', { name: 'Crear' }))

    expect(screen.getByText('Tés')).toBeInTheDocument()
    expect(obtenerCategorias()).toHaveLength(5)
  })

  test('muestra un error si el nombre está vacío', async () => {
    const user = userEvent.setup()
    render(<AdminCategoriasView />)

    await user.click(screen.getByRole('button', { name: 'Crear' }))

    expect(screen.getByRole('alert')).toHaveTextContent('El nombre de la categoría es obligatorio.')
  })

  test('edita el nombre de una categoría', async () => {
    const user = userEvent.setup()
    render(<AdminCategoriasView />)

    await user.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    const input = screen.getByLabelText('Editar nombre')
    await user.clear(input)
    await user.type(input, 'Cafés de grano')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Cafés de grano')).toBeInTheDocument()
    expect(obtenerCategorias()[0].nombre).toBe('Cafés de grano')
  })
})
