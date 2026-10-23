// Las herramientas de inspección
import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

// Las funciones reales de tu proyecto
import { crearOrden } from '../data/datos'
import AdminUsuarioDetalleView from '../views/admin/AdminUsuarioDetalleView'
import { calcularVentasPorProducto } from '../views/admin/AdminReportesView'
import { renderConProviders } from './utils'

// LA BOLETA FALSA: 
// Creamos un molde de una compra perfecta para usarla en nuestros simulacros.
const ordenDePrueba = {
  cliente: { nombre: 'Camila', apellidos: 'Rojas', correo: 'cliente@cafearoma.cl' },
  direccion: { calle: 'Los Aromos 456', region: 'Región Metropolitana', comuna: 'Maipú' },
  items: [{ id: 1, nombre: 'Espresso', emoji: '☕', precio: 2200, cantidad: 2 }],
  total: 4400,
  estado: 'pagada',
}

describe('Auditoría del perfil de usuario (Historial de compras)', () => {
  
  // SIMULACRO 1: El cliente con historial
  test('muestra las compras del usuario', () => {
    
    // 1. PREPARAR LOS DATOS: Plantamos nuestra boleta falsa en el sistema.
    crearOrden(ordenDePrueba)
    
    // 2. PREPARAR EL ESCENARIO: Dibujamos el perfil del usuario.
    // OJO AQUÍ: Como esta página depende de leer la URL para saber qué usuario cargar (ej: /usuarios/2),
    // le pasamos al robot la ruta exacta donde debe "pararse".
    renderConProviders(<AdminUsuarioDetalleView />, {
      ruta: '/admin/usuarios/2',
      path: '/admin/usuarios/:id',
    })

    // 3. EL JUEZ VERIFICA: 
    // Busca que el título exista y que el número de boleta (ORD-00001) se haya dibujado.
    expect(screen.getByText('Historial de compras')).toBeInTheDocument()
    expect(screen.getByText('ORD-00001')).toBeInTheDocument()
  })

  // SIMULACRO 2: El cliente nuevo (sin compras)
  test('avisa cuando el usuario no tiene compras', () => {
    
    // 1. PREPARAR: Dibujamos nuevamente el perfil del usuario en el navegador virtual.
    renderConProviders(<AdminUsuarioDetalleView />, {
      ruta: '/admin/usuarios/2',
      path: '/admin/usuarios/:id',
    })

    // 2. EL JUEZ VERIFICA:
    // Exigimos que la pantalla muestre el texto de aviso. 
    // Usamos las barras / /i para que el robot encuentre la frase sin importar si usaste mayúsculas o minúsculas.
    expect(screen.getByText(/todavía no tiene compras/i)).toBeInTheDocument()
  })


  // EL EXAMEN DE MATEMÁTICAS (Lógica pura, sin componentes visuales)
describe('Auditoría del Contador (calcularVentasPorProducto)', () => {
  
  test('suma unidades y montos solo de las órdenes pagadas', () => {
    
    // 1. PREPARAR LA TRAMPA: Creamos una lista con 3 boletas usando nuestra orden de prueba.
    // Ojo aquí: Las dos primeras están pagadas, pero la tercera dice "rechazada".
    const ordenes = [
      { ...ordenDePrueba, estado: 'pagada' },
      { ...ordenDePrueba, estado: 'pagada' },
      { ...ordenDePrueba, estado: 'rechazada' },
    ]

    // 2. ACTUAR: Le pasamos esta lista con trampa a tu función contadora.
    const resultado = calcularVentasPorProducto(ordenes)

    // 3. EL JUEZ VERIFICA LA REGLA:
    // Exigimos que el resultado solo tenga 1 producto consolidado (el Espresso).
    expect(resultado).toHaveLength(1)
    
    // 4. EL JUEZ VERIFICA LAS MATEMÁTICAS:
    // Sabiendo que cada orden tenía 2 Espressos a $2.200 c/u, y solo hay 2 órdenes válidas...
    // El robot exige que la suma exacta sea: 4 unidades y $8.800 en total.
    expect(resultado[0]).toMatchObject({ nombre: 'Espresso', unidades: 4, monto: 8800 })
  })
})

})