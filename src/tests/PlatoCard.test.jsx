import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import PlatoCard from '../components/PlatoCard'

test('muestra los datos del plato recibidos por props y avisa al pedir', async () => {
  const user = userEvent.setup()
  const onSeleccionar = vi.fn()
  const plato = {
    id: 1,
    nombre: 'Café latte',
    categoria: 'Bebida caliente',
    descripcion: 'Plato de prueba',
    precio: 3200,
  }

  render(<PlatoCard plato={plato} onSeleccionar={onSeleccionar} />)

  expect(screen.getByText('Café latte')).toBeInTheDocument()
  expect(screen.getByText('Bebida caliente')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /pedir este plato/i }))

  expect(onSeleccionar).toHaveBeenCalledTimes(1)
  expect(onSeleccionar).toHaveBeenCalledWith(plato)
})
