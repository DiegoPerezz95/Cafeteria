import { useState } from 'react'
import { Alert, Badge, Button, ButtonGroup, Nav, Table } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import {
  eliminarProducto,
  formatearPrecio,
  obtenerCategoriaPorId,
  obtenerProductos,
  STOCK_CRITICO,
} from '../../data/datos'

// soloCriticos = true muestra solo los productos con poco stock
function AdminProductosView({ soloCriticos = false }) {
  // Guardamos la lista en el estado para que la tabla se actualice al eliminar
  const [productos, setProductos] = useState(() => obtenerProductos())
  const [porEliminar, setPorEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const visibles = soloCriticos ? productos.filter((p) => p.stock <= STOCK_CRITICO) : productos

  function confirmarEliminacion(producto) {
    eliminarProducto(producto.id)
    setProductos(obtenerProductos())
    setPorEliminar(null)
    setMensaje(`Se eliminó "${producto.nombre}".`)
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Productos</h1>
        <Button as={Link} to="/admin/productos/nuevo" variant="success">+ Nuevo producto</Button>
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Link as={NavLink} to="/admin/productos" end>Todos</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/productos/criticos">Stock crítico (≤ {STOCK_CRITICO})</Nav.Link>
      </Nav>

      {mensaje && <Alert variant="info" dismissible onClose={() => setMensaje('')}>{mensaje}</Alert>}

      {visibles.length === 0 ? (
        <Alert variant="success">No hay productos con stock crítico. 🎉</Alert>
      ) : (
        <Table responsive hover className="align-middle bg-white">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((producto) => (
              <tr key={producto.id}>
                <td className="fs-4">{producto.emoji}</td>
                <td>
                  {producto.nombre}
                  {producto.oferta && <Badge bg="danger" className="ms-2">Oferta</Badge>}
                </td>
                <td>{obtenerCategoriaPorId(producto.categoriaId)?.nombre || '—'}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>
                  <Badge bg={producto.stock <= STOCK_CRITICO ? 'danger' : 'secondary'}>{producto.stock}</Badge>
                </td>
                <td>
                  {porEliminar === producto.id ? (
                    <ButtonGroup size="sm">
                      <Button variant="danger" onClick={() => confirmarEliminacion(producto)}>Sí, eliminar</Button>
                      <Button variant="outline-secondary" onClick={() => setPorEliminar(null)}>Cancelar</Button>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup size="sm">
                      <Button as={Link} to={`/admin/productos/${producto.id}`} variant="outline-dark">Ver</Button>
                      <Button as={Link} to={`/admin/productos/${producto.id}/editar`} variant="outline-primary">Editar</Button>
                      <Button
                        variant="outline-danger"
                        aria-label={`Eliminar ${producto.nombre}`}
                        onClick={() => setPorEliminar(producto.id)}
                      >
                        Eliminar
                      </Button>
                    </ButtonGroup>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  )
}

export default AdminProductosView
