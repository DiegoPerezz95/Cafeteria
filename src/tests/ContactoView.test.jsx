import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import ContactoView from '../views/ContactoView'

beforeEach(() => {
  localStorage.clear()
})

test('envía un mensaje, lo guarda en localStorage y lo muestra en la lista', async () => {
  const user = userEvent.setup()
  render(<ContactoView />)

  await user.type(screen.getByLabelText(/tu nombre/i), 'Camila')
  await user.type(screen.getByLabelText(/mensaje/i), '¿Tienen leche de almendra?')
  await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

  const guardados = JSON.parse(localStorage.getItem('mensajesCafe'))
  expect(guardados).toHaveLength(1)
  expect(guardados[0].nombre).toBe('Camila')

  expect(screen.getByText(/gracias/i)).toBeInTheDocument()
  expect(screen.getByText('¿Tienen leche de almendra?')).toBeInTheDocument()
})
