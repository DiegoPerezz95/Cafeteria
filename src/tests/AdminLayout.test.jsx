// Las herramientas de dibujo e inspección
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

// Herramientas para simular el navegador y las páginas
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// Los componentes reales de tu proyecto
import AdminLayout from '../components/admin/AdminLayout'
import { AuthProvider } from '../context/AuthContext'
import { guardarSesion } from './utils'

// EL ESCENARIO VIRTUAL
// Crea un mini-universo donde el usuario intenta entrar directamente a la ruta "/admin"
// EL ESCENARIO VIRTUAL
function dibujarPanel() {
  return render(
    <MemoryRouter initialEntries={['/admin']}> {/* robot entra y con initial hace click */}
      <AuthProvider> {/* encender el sistema de credenciales */}
        <Routes> {/* Paso 3: El robot despliega el mapa del sitio */}
          {/* Aquí instalamos a nuestro guardia */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<p>Contenido del panel</p>} />
          </Route>
          
          {/* Aquí construimos una sala de espera falsa por si el guardia los rechaza */}
          <Route path="/login" element={<p>Página de login</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Pruebas del Guardia de Seguridad (AdminLayout)', () => {

    // SIMULACRO 1: El Intruso (Sin sesión iniciada)
  test('sin sesión, redirige a la página de login', () => {
    
    // 1. PREPARAR Y ACTUAR: Arrancamos la mini-aplicación de prueba. 
    // Como no le hemos inyectado ningún usuario, el sistema asume que nadie ha iniciado sesión.
    // Recuerda que el robot entrará directo a '/admin'.
    dibujarPanel()

    // 2. EL JUEZ VERIFICA EL CASTIGO: 
    // Comprueba que el Guardia efectivamente lo haya pateado hacia la calle (Login).
    expect(screen.getByText('Página de login')).toBeInTheDocument()
    
    // 3. EL JUEZ VERIFICA EL TESORO:
    // Comprueba que el visitante NUNCA haya logrado ver el texto secreto de la Zona VIP.
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })

  // SIMULACRO 2: El Cliente Curioso (Tiene sesión, pero no es admin)
  test('un cliente ve el mensaje de acceso denegado', () => {
    
    // 1. FABRICAR UNA IDENTIFICACIÓN FALSA: 
    guardarSesion({ id: 2, nombre: 'Camila', correo: 'cliente@cafearoma.cl', rol: 'cliente' })
    
    // 2. ACTUAR: El robot intenta entrar directo a la Zona VIP
    dibujarPanel()

    // 3. EL JUEZ VERIFICA EL RECHAZO: 
    // Usamos el texto exacto que nos mostró el error
    expect(screen.getByText('Acceso Denegado')).toBeInTheDocument()
    
    // 4. EL JUEZ VERIFICA EL TESORO:
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })


  // SIMULACRO 3: El Jefe (Tiene sesión y ES administrador)
  test('un administrador ve el menú y el contenido', () => {
    
    // 1. FABRICAR IDENTIFICACIÓN VIP:
    // Le inyectamos al robot una sesión con rol de 'admin'
    guardarSesion({ id: 1, nombre: 'Admin', correo: 'admin@cafearoma.cl', rol: 'admin' })
    
    // 2. ACTUAR: El robot entra a la Zona VIP
    dibujarPanel()

    // 3. EL JUEZ VERIFICA EL TESORO:
    // Como es administrador, el guardia lo dejó pasar y AHORA SÍ puede ver el contenido secreto.
    expect(screen.getByText('Contenido del panel')).toBeInTheDocument()
    
    // 4. EL JUEZ VERIFICA LOS ACCESOS:
    // Comprobamos que el panel le muestre los enlaces para administrar.
    // Ojo: la letra 'i' después de las barras (/productos/i) significa "ignorar mayúsculas y minúsculas".
    expect(screen.getByRole('link', { name: /productos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /usuarios/i })).toBeInTheDocument()
  })

  // Aquí pondremos a prueba al guardia con 3 tipos de visitantes

})