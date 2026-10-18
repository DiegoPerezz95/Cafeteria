import { Alert, Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { formatearPrecio, obtenerCategoriaPorId, obtenerProductoPorId, STOCK_CRITICO } from '../../data/datos'

function AdminProductoDetalleView() {
  const { id } = useParams()
  const producto = obtenerProductoPorId(id)

  if (!producto) {
    return <Alert variant="danger">El producto no existe.</Alert>
  }

  return (
    <section>
      <h1 className="h3 mb-3">Detalle de producto</h1>
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="g-4">
            <Col md={3} className="text-center display-1">{producto.emoji}</Col>
            <Col md={9}>
              <h2 className="h4">{producto.nombre}</h2>
              <p className="text-muted">{producto.descripcion}</p>
              <ul className="list-unstyled">
                <li><strong>Categoría:</strong> {obtenerCategoriaPorId(producto.categoriaId)?.nombre || '—'}</li>
                <li><strong>Precio:</strong> {formatearPrecio(producto.precio)}</li>
                <li>
                  <strong>Oferta:</strong>{' '}
                  {producto.oferta ? formatearPrecio(producto.precioOferta) : 'No'}
                </li>
                <li>
                  <strong>Stock:</strong> {producto.stock}{' '}
                  {producto.stock <= STOCK_CRITICO && <Badge bg="danger">Crítico</Badge>}
                </li>
                <li><strong>Destacado:</strong> {producto.destacado ? 'Sí' : 'No'}</li>
              </ul>
              <div className="d-flex gap-2">
                <Button as={Link} to={`/admin/productos/${producto.id}/editar`} variant="primary">Editar</Button>
                <Button as={Link} to="/admin/productos" variant="outline-secondary">Volver</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </section>
  )
}

export default AdminProductoDetalleView
