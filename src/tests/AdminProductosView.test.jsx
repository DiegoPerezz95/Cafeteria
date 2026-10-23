// Las herramientas del inspector
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

// Los datos y el componente a probar
import { obtenerProductoPorId } from '../data/datos'
import AdminProductosView from '../views/admin/AdminProductosView'

// Nuestro dibujante especial
import { renderConProviders } from './utils'

describe('Pruebas del Inspector de Productos (AdminProductosView)', () => {

  // SIMULACRO 1: Verificar que la tabla carga completa
  test('muestra una fila por cada producto', () => {
    
    // 1. PREPARAR: Dibujamos la tabla.
    // Usamos 'renderConProviders' (una herramienta de tu utils.js) porque este componente
    // necesita el Router para funcionar. Es como el 'dibujarPanel' que hicimos antes, pero reutilizable.
    renderConProviders(<AdminProductosView />)

    // 2. EL JUEZ VERIFICA:
    // Cuenta cuántos botones de eliminar hay en la pantalla para saber cuántas filas se dibujaron.
    expect(screen.getAllByRole('button', { name: /^eliminar /i })).toHaveLength(10)
  })

     // SIMULACRO 2: Eliminar un producto (El camino destructivo)
  test('elimina un producto después de confirmar', async () => {
    
    // 1. PREPARAR: Dibujamos la tabla y preparamos a nuestro robot
    const user = userEvent.setup()
    renderConProviders(<AdminProductosView />)

    // 2. ACTUAR (Petición): El robot hace clic en eliminar específicamente el "Espresso"
    await user.click(screen.getByRole('button', { name: 'Eliminar Espresso' }))
    
    // 3. ACTUAR (Confirmación): El sistema lanza la alerta de seguridad. El robot confirma.
    // Usamos /sí, eliminar/i para que no le importen las mayúsculas
    await user.click(screen.getByRole('button', { name: /sí, eliminar/i }))

    // 4. EL JUEZ VERIFICA LO VISUAL:
    // Comprueba que el botón del Espresso ya NO esté en la pantalla (usando queryByRole)
    expect(screen.queryByRole('button', { name: 'Eliminar Espresso' })).not.toBeInTheDocument()
    
    // Comprueba que la tabla ahora solo tenga 9 botones de eliminar (antes eran 10)
    expect(screen.getAllByRole('button', { name: /^eliminar /i })).toHaveLength(9)
    
    // 5. EL JUEZ VERIFICA LOS DATOS INTERNOS:
    // Comprueba que si buscamos el producto 1 (Espresso) en la base de datos central, dé "nulo"
    expect(obtenerProductoPorId(1)).toBeNull()
  })

  // SIMULACRO 3: El Arrepentimiento (Cancelar eliminación)
  test('si se cancela, el producto no se elimina', async () => {
    
    // 1. PREPARAR: Escenario y robot listos
    const user = userEvent.setup()
    renderConProviders(<AdminProductosView />)

    // 2. ACTUAR: El robot hace clic en eliminar el Espresso, levantando la alerta
    await user.click(screen.getByRole('button', { name: 'Eliminar Espresso' }))
    
    // 3. ACTUAR: El robot se arrepiente y hace clic en Cancelar
    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    // 4. EL JUEZ VERIFICA LOS DATOS INTERNOS:
    // Comprobamos en el "cerebro" (base de datos) que el producto 1 (Espresso) siga existiendo.
    // Al usar 'not.toBeNull()', exigimos que el dato NO esté vacío.
    expect(obtenerProductoPorId(1)).not.toBeNull()
  })

  // SIMULACRO 4: El filtro de poco inventario
  test('con soloCriticos muestra solo los productos con poco stock', () => {
    
    // 1. PREPARAR: Dibujamos la tabla, pero le encendemos el interruptor "soloCriticos"
    renderConProviders(<AdminProductosView soloCriticos />)

    // 2. EL JUEZ VERIFICA LA CANTIDAD:
    // Exige que ahora solo haya 3 botones de eliminar (porque solo 3 productos tienen poco stock)
    expect(screen.getAllByRole('button', { name: /^eliminar /i })).toHaveLength(3)
    
    // 3. EL JUEZ VERIFICA A UN "SOSPECHOSO":
    // Asegura que el "Cold brew" (que sabemos que se está agotando) sí aparezca en la pantalla
    expect(screen.getByText('Cold brew')).toBeInTheDocument()
  })

})