import { Container, Row, Col, Nav, Navbar, Alert, Button } from 'react-bootstrap' // Agrega Alert
import { Link, Outlet, Navigate, useNavigate } from 'react-router-dom' // Agrega Navigate
import { useAuth } from '../../context/AuthContext' // <-- 1. Nuestro guardia de seguridad



const SECCIONES = [
  { ruta: '/admin', texto: 'Dashboard', icono: '📊' },
  { ruta: '/admin/productos', texto: 'Productos', icono: '☕' },
  { ruta: '/admin/categorias', texto: 'Categorías', icono: '🏷️' },
  { ruta: '/admin/usuarios', texto: 'Usuarios', icono: '👥' }
]



function AdminLayout() {
  // 2. Extraemos los datos del usuario conectado
  const { usuario, esAdmin, cerrarSesion} = useAuth()
  const navigate = useNavigate()

// REGLA 1: Si no hay usuario, lo pateamos a la pantalla de login sin preguntar
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // REGLA 2: Si hay usuario pero NO es admin (es un cliente normal), le bloqueamos el paso
  if (!esAdmin) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Acceso Denegado</Alert.Heading>
          <p>Tu cuenta no tiene permisos para ver esta sección.</p>
          <Link to="/">Volver a la tienda</Link>
        </Alert>
      </Container>
    )
  }


  function salir() {
    cerrarSesion()
    navigate('/')
  }

  // Si sobrevive a los dos "if" de arriba, significa que es Admin. Recién ahí React lee el return principal:
  return (
    <div className="min-vh-100 d-flex flex-column">
      
      {/* 1. LA BARRA SUPERIOR (Fija) */}
     <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>☕ Mi Panel de Admin</Navbar.Brand>
          {/* 4. Mostramos el nombre usando la variable del guardia */}
          <span className="text-light">Hola, {usuario.nombre}</span>
        </Container>
      </Navbar>
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          
          {/* 2. EL MENÚ LATERAL (Fijo) */}
          <Col md={3} lg={2} className="bg-light py-3 border-end">
            <Nav className="flex-column">
                {/* Le decimos a React: por cada "seccion" en la lista, dibuja un Link */}
              {SECCIONES.map((seccion) => (
                <Nav.Link as={Link} to={seccion.ruta} key={seccion.ruta}>
                  {seccion.icono} {seccion.texto}
                </Nav.Link>
              ))}
            </Nav>


            {/* NUEVO: Botones inferiores */}
            <hr />
            <div className="d-grid gap-2">
              <Button as={Link} to="/" variant="dark" size="sm">🏪 Ir a la tienda</Button>
              <Button variant="danger" size="sm" onClick={salir}>Cerrar sesión</Button>
            </div>


          </Col>

          {/* 3. EL HUECO DINÁMICO (Outlet) */}
          <Col md={9} lg={10} className="py-4 bg-white">
            <div className="border border-danger p-3 mb-3 bg-light">
               <p className="text-danger mb-0">Todo lo de arriba y la izquierda es el Layout. Lo de abajo es el Outlet 👇</p>
            </div>
            
            <Outlet /> 

          </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default AdminLayout