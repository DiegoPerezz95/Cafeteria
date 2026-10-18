import { useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio, obtenerCategorias } from '../data/datos'

function AppNavbar() {
  const [busqueda, setBusqueda] = useState('')
  const { total, totalProductos } = useCarrito()
  const { usuario, esAdmin, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const categorias = obtenerCategorias()

  // Al buscar, vamos a /productos?q=texto y ProductosView filtra la lista
  function buscar(event) {
    event.preventDefault()
    navigate(`/productos?q=${encodeURIComponent(busqueda.trim())}`)
  }

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <Navbar className="navbar-cafe" data-bs-theme="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ☕ Café Aroma
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <NavDropdown title="Categorías" id="menu-categorias">
              {categorias.map((categoria) => (
                <NavDropdown.Item as={Link} to={`/categorias/${categoria.id}`} key={categoria.id}>
                  {categoria.emoji} {categoria.nombre}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/categorias">Ver todas</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>

          <Form className="d-flex my-2 my-lg-0 me-lg-2" onSubmit={buscar} role="search">
            <Form.Control
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar productos"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              className="me-2"
            />
            <Button type="submit" variant="outline-light">Buscar</Button>
          </Form>

          <Button as={Link} to="/carrito" variant="success" className="me-lg-2 mb-2 mb-lg-0">
            🛒 Carrito ({totalProductos}) {formatearPrecio(total)}
          </Button>

          {/* Renderizado condicional: cambia según si hay sesión iniciada */}
          {usuario ? (
            <NavDropdown title={`Hola, ${usuario.nombre}`} id="menu-usuario" align="end">
              <NavDropdown.ItemText className="small text-muted">{usuario.correo}</NavDropdown.ItemText>
              <NavDropdown.Divider />
              {esAdmin && (
                <NavDropdown.Item as={Link} to="/admin">⚙️ Panel de administrador</NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={salir}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <div className="d-flex gap-2">
              <Button as={Link} to="/login" variant="outline-light">Iniciar sesión</Button>
              <Button as={Link} to="/registro" variant="light">Crear cuenta</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
