import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Después de cada prueba:
// - se borra lo que se dibujó en pantalla
// - se limpia el almacenamiento, para que ninguna prueba dependa de otra
afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})
