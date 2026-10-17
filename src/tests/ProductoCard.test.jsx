import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import ProductoCard from '../components/ProductoCard'

const producto = {
  id: 1,
  nombre: 'Café latte',
  descripcion: 'Producto de prueba',
  emoji: '☕',
  precio: 3200,
  stock: 10,
  oferta: false,
  precioOferta: 0,
}

// ProductoCard usa <Link>, por eso lo envolvemos en un MemoryRouter
function dibujar(props) {
  return render(
    <MemoryRouter>
      <ProductoCard {...props} />
    </MemoryRouter>
  )
}

describe('ProductoCard', () => {
  test('muestra los datos recibidos por props', () => {
    dibujar({ producto, onAgregar: vi.fn() })

    expect(screen.getByText('Café latte')).toBeInTheDocument()
    expect(screen.getByText('Producto de prueba')).toBeInTheDocument()
    expect(screen.getByText(/3\.?200/)).toBeInTheDocument()
  })

  test('llama a onAgregar con el producto al presionar "Añadir"', async () => {
    const user = userEvent.setup()
    const onAgregar = vi.fn()
    dibujar({ producto, onAgregar })

    await user.click(screen.getByRole('button', { name: /añadir/i }))

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(producto)
  })

  test('muestra la etiqueta "Oferta" solo si el producto está en oferta', () => {
    const { rerender } = dibujar({ producto, onAgregar: vi.fn() })
    expect(screen.queryByText('Oferta')).not.toBeInTheDocument()

    // rerender vuelve a dibujar el mismo componente con otras props
    rerender(
      <MemoryRouter>
        <ProductoCard producto={{ ...producto, oferta: true, precioOferta: 2700 }} onAgregar={vi.fn()} />
      </MemoryRouter>
    )
    expect(screen.getByText('Oferta')).toBeInTheDocument()
  })

  test('desactiva el botón cuando no hay stock', () => {
    dibujar({ producto: { ...producto, stock: 0 }, onAgregar: vi.fn() })

    expect(screen.getByText('Agotado')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /añadir/i })).toBeDisabled()
  })
})
