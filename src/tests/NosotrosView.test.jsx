import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import NosotrosView from '../views/NosotrosView'

test('muestra una tarjeta por cada integrante del equipo', () => {
  render(<NosotrosView />)

  expect(screen.getByText('Valentina')).toBeInTheDocument()
  expect(screen.getByText('Matías')).toBeInTheDocument()
  expect(screen.getByText('Josefa')).toBeInTheDocument()
  expect(screen.getAllByText(/especialidad:/i)).toHaveLength(3)
})
