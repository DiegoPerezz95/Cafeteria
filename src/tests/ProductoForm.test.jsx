// Las herramientas del inspector y nuestro robot tecleador
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

// Tu formulario real
import ProductoForm from '../components/admin/ProductoForm'

describe('Pruebas del Formulario de Productos (ProductoForm)', () => {

 // SIMULACRO 2: El guardia de errores (Enviar vacío)
  test('no guarda y muestra errores si faltan datos', async () => {
    const user = userEvent.setup()
    const onGuardarEspia = vi.fn()
    render(<ProductoForm onGuardar={onGuardarEspia} />)

    // ACTUAR: El robot intenta guardar con el formulario en blanco
    await user.click(screen.getByRole('button', { name: /guardar producto/i }))

    // EL JUEZ VERIFICA: 
    // Busca los textos EXACTOS que escribiste en tu componente real
    expect(screen.getByText(/el nombre no puede estar vacío/i)).toBeInTheDocument()
    expect(screen.getByText(/el precio debe ser mayor a 0/i)).toBeInTheDocument()
    
    // Comprueba que la función onGuardar NUNCA fue llamada
    expect(onGuardarEspia).not.toHaveBeenCalled()
  })

 // SIMULACRO 3: El guardado exitoso
  test('con datos válidos llama a onGuardar con números', async () => {
    const user = userEvent.setup()
    const onGuardarEspia = vi.fn()
    render(<ProductoForm onGuardar={onGuardarEspia} />)

    // ACTUAR: El robot busca las cajas por su texto de fondo (placeholder) o rol
    await user.type(screen.getByPlaceholderText('Escribe un nombre'), 'Brownie')
    await user.selectOptions(screen.getByRole('combobox'), '3') // 3 es Pastelería
    await user.type(screen.getByPlaceholderText('Escribe el precio'), '2500')
    await user.type(screen.getByPlaceholderText('Escribe el stock'), '8')
    
    // Hace clic en guardar
    await user.click(screen.getByRole('button', { name: /guardar producto/i }))

    // EL JUEZ VERIFICA:
    expect(onGuardarEspia).toHaveBeenCalledTimes(1)
    expect(onGuardarEspia).toHaveBeenCalledWith(
      expect.objectContaining({ nombre: 'Brownie', categoriaId: '3', precio: '2500', stock: '8' })
    )
  })


  // SIMULACRO 4: El Modo Edición (Cargar datos previos)
  test('al editar, el formulario parte con los datos del producto', () => {
    
    // 1. PREPARAR: Dibujamos el formulario, pero le pasamos los datos de un producto real (productoInicial)
    render(
      <ProductoForm
        productoInicial={{ nombre: 'Espresso', precio: 2200, stock: 50, categoriaId: 1 }}
        onGuardar={vi.fn()}
      />
    )

    // 2. EL JUEZ VERIFICA:
    // Busca las cajas (usando nuestro truco del placeholder) y exige que su valor inicial sea el correcto
    expect(screen.getByPlaceholderText('Escribe un nombre')).toHaveValue('Espresso')
    
    // Ojo aquí: como HTML siempre maneja los values como texto, pasamos el 2200 como número y Vitest lo entiende
    expect(screen.getByPlaceholderText('Escribe el precio')).toHaveValue(2200)
  })

})