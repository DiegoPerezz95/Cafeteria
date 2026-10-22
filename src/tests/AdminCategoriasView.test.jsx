// 'render' pone al empleado en un escenario virtual. 'screen' es la pantalla de ese escenario.
import { render, screen } from '@testing-library/react'

// 'userEvent' es un robot que simula a un humano tecleando y haciendo clics.
import userEvent from '@testing-library/user-event'

// Las herramientas del inspector: 'describe' (agrupa pruebas), 'test' (el simulacro) y 'expect' (revisa que el resultado sea correcto).
import { describe, expect, test } from 'vitest'

// Traemos los datos y al empleado que vamos a poner a prueba
import { obtenerCategorias } from '../data/datos'
import AdminCategoriasView from '../views/admin/AdminCategoriasView'

// 'describe' es la carpeta donde guardaremos todos los reportes de este empleado
describe('Pruebas del Inspector para AdminCategoriasView', () => {


    // SIMULACRO 1: Crear una categoría nueva
  test('crea una categoría nueva y la muestra en la tabla', async () => {
    
    // 1. Preparamos al robot (user) y dibujamos el componente en la memoria (render)
    const user = userEvent.setup()
    render(<AdminCategoriasView />)

    // 2. El robot busca la caja de texto etiquetada como "Nombre" y escribe "Tés"
    await user.type(screen.getByLabelText('Nombre'), 'Tés')
    
    // 3. El robot busca el botón que se llama "Crear" y le hace clic
    await user.click(screen.getByRole('button', { name: 'Crear' }))

    // 4. EL JUEZ: Comprueba que la palabra "Tés" haya aparecido en la pantalla virtual
    expect(screen.getByText('Tés')).toBeInTheDocument()
    
    // 5. EL JUEZ: Comprueba que la lista de datos interna ahora haya crecido a 5 elementos
    expect(obtenerCategorias()).toHaveLength(5)
  })
  
  test('muestra un error si el nombre esta vacio', async () => {
    const user = userEvent.setup()
    render(<AdminCategoriasView />)

    await user.click(screen.getByRole('button', {name: 'Crear'}))

    expect(screen.getByRole('alert')).toHaveTextContent('El nombre de la categoría es obligatorio.')
  })

  // SIMULACRO 3: Editar una categoría existente
  test('edita el nombre de una categoría', async () => {
    
    // 1. Preparamos el escenario
    const user = userEvent.setup()
    render(<AdminCategoriasView />)

    // 2. Buscamos TODOS los botones que digan "Editar" y le hacemos clic al primero (el [0])
    await user.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    
    // 3. El robot busca la cajita de edición, borra lo que había, y escribe el nuevo nombre
    const input = screen.getByLabelText('Editar nombre')
    await user.clear(input) // Limpia el texto anterior
    await user.type(input, 'Cafés de grano') // Escribe el nuevo
    
    // 4. Hacemos clic en Guardar
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    // 5. EL JUEZ: Comprueba que el nuevo nombre ("Cafés de grano") aparezca en la pantalla
    expect(screen.getByText('Cafés de grano')).toBeInTheDocument()
    
    // 6. EL JUEZ: Comprueba que el dato interno en la lista también se haya actualizado
    expect(obtenerCategorias()[0].nombre).toBe('Cafés de grano')
  })


  // Aquí adentro escribiremos nuestros 3 simulacros (tests)

})