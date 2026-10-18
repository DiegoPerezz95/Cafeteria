import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import ProductoForm, { validarProducto } from '../components/admin/ProductoForm'

describe('ProductoForm', () => {
  test('el campo "Precio de oferta" solo aparece si se activa la oferta', async () => {
    const user = userEvent.setup()
    render(<ProductoForm onGuardar={vi.fn()} />)

    expect(screen.queryByLabelText('Precio de oferta')).not.toBeInTheDocument()

    await user.click(screen.getByLabelText('En oferta'))

    expect(screen.getByLabelText('Precio de oferta')).toBeInTheDocument()
  })

  test('no guarda y muestra errores si faltan datos', async () => {
    const user = userEvent.setup()
    const onGuardar = vi.fn()
    render(<ProductoForm onGuardar={onGuardar} />)

    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El precio debe ser mayor a 0.')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  test('con datos válidos llama a onGuardar con números', async () => {
    const user = userEvent.setup()
    const onGuardar = vi.fn()
    render(<ProductoForm onGuardar={onGuardar} textoBoton="Crear producto" />)

    await user.type(screen.getByLabelText('Nombre'), 'Brownie')
    await user.selectOptions(screen.getByLabelText('Categoría'), 'Pastelería')
    await user.type(screen.getByLabelText('Precio'), '2500')
    await user.type(screen.getByLabelText('Stock'), '8')
    await user.click(screen.getByRole('button', { name: /crear producto/i }))

    expect(onGuardar).toHaveBeenCalledTimes(1)
    expect(onGuardar).toHaveBeenCalledWith(
      expect.objectContaining({ nombre: 'Brownie', categoriaId: 3, precio: 2500, stock: 8 })
    )
  })

  test('al editar, el formulario parte con los datos del producto', () => {
    render(
      <ProductoForm
        productoInicial={{ nombre: 'Espresso', precio: 2200, stock: 50, categoriaId: 1 }}
        onGuardar={vi.fn()}
      />
    )

    expect(screen.getByLabelText('Nombre')).toHaveValue('Espresso')
    expect(screen.getByLabelText('Precio')).toHaveValue(2200)
  })
})

describe('validarProducto', () => {
  test('el precio de oferta debe ser menor al precio normal', () => {
    const errores = validarProducto({
      nombre: 'Latte',
      categoriaId: 1,
      precio: 3000,
      stock: 5,
      oferta: true,
      precioOferta: 3500,
    })

    expect(errores.precioOferta).toBeDefined()
  })
})
