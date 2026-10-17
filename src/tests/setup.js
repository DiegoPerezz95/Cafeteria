import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Después de cada prueba se borra lo que se dibujó en pantalla,
// así cada prueba parte "limpia" y no se mezclan los componentes.
afterEach(() => {
  cleanup()
})
