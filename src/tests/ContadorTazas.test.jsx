import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import ContadorTazas from '../components/ContadorTazas'

describe('ContadorTazas', () => {
  test('comienza mostrando cero tazas', () => {
    render(<ContadorTazas />)

    expect(screen.getByText('Tazas: 0')).toBeInTheDocument()
  })

  test('suma una taza al presionar "Agregar taza"', async () => {
    const user = userEvent.setup()
    render(<ContadorTazas />)

    await user.click(screen.getByRole('button', { name: /agregar taza/i }))

    expect(screen.getByText('Tazas: 1')).toBeInTheDocument()
  })

  test('no baja de cero al presionar "Quitar taza"', async () => {
    const user = userEvent.setup()
    render(<ContadorTazas />)

    await user.click(screen.getByRole('button', { name: /quitar taza/i }))

    expect(screen.getByText('Tazas: 0')).toBeInTheDocument()
  })
})
