import { Alert, Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const SECCIONES = [
  { ruta: '/admin', texto: 'Dashboard', icono: '📊', end: true },
  { ruta: '/admin/ordenes', texto: 'Órdenes', icono: '🧾' },
  { ruta: '/admin/productos', texto: 'Productos', icono: '☕' },
  { ruta: '/admin/categorias', texto: 'Categorías', icono: '🏷️' },
  { ruta: '/admin/usuarios', texto: 'Usuarios', icono: '👥' },
  { ruta: '/admin/reportes', texto: 'Reportes', icono: '📈' },
  { ruta: '/admin/perfil', texto: 'Perfil', icono: '👤' },
]

// Estructura del panel: barra lateral + contenido.
// Además "protege" las rutas: solo un administrador puede verlas.
function AdminLayout() {
  const { usuario, esAdmin, cerrarSesion } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // 1) Sin sesión: lo mandamos a iniciar sesión y guardamos a dónde quería ir
  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  // 2) Con sesión pero sin permisos: mostramos un aviso
  if (!esAdmin) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Acceso solo para administradores</Alert.Heading>
          <p className="mb-0">
            Tu cuenta no tiene permisos para ver esta sección. <Link to="/">Volver a la tienda</Link>
          </p>
        </Alert>
      </Container>
    )
  }

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar className="navbar-cafe" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin">☕ Café Aroma · Admin</Navbar.Brand>
          <span className="text-light small">{usuario.nombre} ({usuario.correo})</span>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={3} lg={2} className="admin-sidebar py-3">
            <Nav className="flex-md-column" variant="pills" aria-label="Menú del administrador">
              {SECCIONES.map((seccion) => (
                <Nav.Link as={NavLink} to={seccion.ruta} end={seccion.end} key={seccion.ruta}>
                  {seccion.icono} {seccion.texto}
                </Nav.Link>
              ))}
            </Nav>
            <hr />
            <div className="d-grid gap-2">
              <Button as={Link} to="/" variant="dark" size="sm">🏪 Ir a la tienda</Button>
              <Button variant="danger" size="sm" onClick={salir}>Cerrar sesión</Button>
            </div>
          </Col>

          <Col md={9} lg={10} as="main" className="py-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminLayout
