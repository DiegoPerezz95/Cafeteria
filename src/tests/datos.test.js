import { describe, expect, test } from 'vitest'
import {
  actualizarProducto,
  buscarProductos,
  crearProducto,
  eliminarProducto,
  formatearPrecio,
  obtenerOfertas,
  obtenerProductoPorId,
  obtenerProductos,
  obtenerProductosCriticos,
  precioFinal,
  STOCK_CRITICO,
} from '../data/datos'

describe('datos.js — CRUD de productos', () => {
  test('LEER: la primera vez carga los productos iniciales', () => {
    const productos = obtenerProductos()

    expect(productos.length).toBe(10)
    expect(localStorage.getItem('cafe_productos')).not.toBeNull()
  })

  test('CREAR: agrega un producto nuevo con un id único', () => {
    const nuevo = crearProducto({
      nombre: 'Té chai',
      categoriaId: 1,
      precio: 2800,
      stock: 20,
      descripcion: 'Té especiado con leche',
    })

    expect(nuevo.id).toBe(11)
    expect(obtenerProductos()).toHaveLength(11)
    expect(obtenerProductoPorId(11).nombre).toBe('Té chai')
  })

  test('ACTUALIZAR: cambia los datos de un producto existente', () => {
    actualizarProducto(1, { precio: 2500 })

    expect(obtenerProductoPorId(1).precio).toBe(2500)
  })

  test('ACTUALIZAR: devuelve null si el producto no existe', () => {
    expect(actualizarProducto(999, { precio: 1 })).toBeNull()
  })

  test('ELIMINAR: borra el producto de la lista', () => {
    const eliminado = eliminarProducto(1)

    expect(eliminado).toBe(true)
    expect(obtenerProductoPorId(1)).toBeNull()
    expect(obtenerProductos()).toHaveLength(9)
  })
})

describe('datos.js — búsquedas y utilidades', () => {
  test('buscarProductos encuentra sin importar mayúsculas', () => {
    const resultado = buscarProductos('LATTE')

    expect(resultado).toHaveLength(1)
    expect(resultado[0].nombre).toBe('Café latte')
  })

  test('obtenerOfertas solo devuelve productos en oferta', () => {
    const ofertas = obtenerOfertas()

    expect(ofertas.length).toBeGreaterThan(0)
    expect(ofertas.every((p) => p.oferta)).toBe(true)
  })

  test('obtenerProductosCriticos devuelve los de stock bajo', () => {
    const criticos = obtenerProductosCriticos()

    expect(criticos.every((p) => p.stock <= STOCK_CRITICO)).toBe(true)
  })

  test('precioFinal usa el precio de oferta cuando corresponde', () => {
    expect(precioFinal({ precio: 3000, oferta: true, precioOferta: 2500 })).toBe(2500)
    expect(precioFinal({ precio: 3000, oferta: false, precioOferta: 0 })).toBe(3000)
  })

  test('formatearPrecio agrega el signo $', () => {
    expect(formatearPrecio(3500)).toMatch(/^\$3\.?500$/)
  })
})
