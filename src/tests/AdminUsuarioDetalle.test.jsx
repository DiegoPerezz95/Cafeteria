import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { crearOrden } from '../data/datos'
import AdminUsuarioDetalleView from '../views/admin/AdminUsuarioDetalleView'
import { calcularVentasPorProducto } from '../views/admin/AdminReportesView'
import { renderConProviders } from './utils'

const ordenDePrueba = {
  cliente: { nombre: 'Camila', apellidos: 'Rojas', correo: 'cliente@cafearoma.cl' },
  direccion: { calle: 'Los Aromos 456', region: 'Región Metropolitana', comuna: 'Maipú' },
  items: [{ id: 1, nombre: 'Espresso', emoji: '☕', precio: 2200, cantidad: 2 }],
  total: 4400,
  estado: 'pagada',
}

describe('Historial de compras del usuario', () => {
  test('muestra las compras del usuario', () => {
    crearOrden(ordenDePrueba)
    renderConProviders(<AdminUsuarioDetalleView />, {
      ruta: '/admin/usuarios/2',
      path: '/admin/usuarios/:id',
    })

    expect(screen.getByText('Historial de compras')).toBeInTheDocument()
    expect(screen.getByText('ORD-00001')).toBeInTheDocument()
  })

  test('avisa cuando el usuario no tiene compras', () => {
    renderConProviders(<AdminUsuarioDetalleView />, {
      ruta: '/admin/usuarios/2',
      path: '/admin/usuarios/:id',
    })

    expect(screen.getByText(/todavía no tiene compras/i)).toBeInTheDocument()
  })
})

describe('calcularVentasPorProducto', () => {
  test('suma unidades y montos solo de las órdenes pagadas', () => {
    const ordenes = [
      { ...ordenDePrueba, estado: 'pagada' },
      { ...ordenDePrueba, estado: 'pagada' },
      { ...ordenDePrueba, estado: 'rechazada' },
    ]

    const resultado = calcularVentasPorProducto(ordenes)

    expect(resultado).toHaveLength(1)
    expect(resultado[0]).toMatchObject({ nombre: 'Espresso', unidades: 4, monto: 8800 })
  })
})
