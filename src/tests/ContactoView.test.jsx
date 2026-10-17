import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import ContactoView from '../views/ContactoView'

test('envía un mensaje, lo guarda en localStorage y muestra la confirmación', async () => {
  const user = userEvent.setup()
  render(<ContactoView />)

  await user.type(screen.getByLabelText('Tu nombre'), 'Camila')
  await user.type(screen.getByLabelText('Mensaje'), '¿Tienen leche de almendra?')
  await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

  const guardados = JSON.parse(localStorage.getItem('mensajesCafe'))
  expect(guardados).toHaveLength(1)
  expect(guardados[0].nombre).toBe('Camila')
  expect(screen.getByText(/gracias/i)).toBeInTheDocument()
})

test('muestra un error si faltan datos y no guarda nada', async () => {
  const user = userEvent.setup()
  render(<ContactoView />)

  await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

  expect(screen.getByRole('alert')).toHaveTextContent('Completa tu nombre y tu mensaje.')
  expect(localStorage.getItem('mensajesCafe')).toBeNull()
})
