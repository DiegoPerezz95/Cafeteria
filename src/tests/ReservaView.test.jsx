import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import ReservaView from '../views/ReservaView'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

test('guarda la reserva en localStorage', async () => {
  const user = userEvent.setup()
  render(<ReservaView />)

  await user.type(screen.getByLabelText(/nombre del cliente/i), 'Camila')
  await user.selectOptions(screen.getByLabelText(/cantidad de personas/i), '3')
  await user.click(screen.getByRole('button', { name: /guardar reserva/i }))

  const guardada = JSON.parse(localStorage.getItem('reservaCafe'))
  expect(guardada).toEqual({ nombre: 'Camila', personas: 3 })
  expect(
    screen.getByText(/reserva a nombre de camila para 3 persona/i)
  ).toBeInTheDocument()
})

test('cancelar reserva borra los datos guardados', async () => {
  const user = userEvent.setup()
  localStorage.setItem('reservaCafe', JSON.stringify({ nombre: 'Pedro', personas: 2 }))
  render(<ReservaView />)

  await user.click(screen.getByRole('button', { name: /cancelar reserva/i }))

  expect(localStorage.getItem('reservaCafe')).toBeNull()
  expect(screen.getByText(/todavía no hay una reserva guardada/i)).toBeInTheDocument()
})
