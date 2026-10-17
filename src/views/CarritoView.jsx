import { Alert, Button, ButtonGroup, Card, Col, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../data/datos'

function CarritoView() {
  const { items, total, totalProductos, cambiarCantidad, eliminarDelCarrito, vaciarCarrito } =
    useCarrito()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <section>
        <h1>Carrito de compras</h1>
        <Alert variant="info">
          Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
        </Alert>
      </section>
    )
  }

  return (
    <section>
      <h1 className="mb-4">Carrito de compras</h1>

      <Row className="g-4">
        <Col lg={8}>
          <Table responsive className="align-middle bg-white">
            <thead>
              <tr>
                <th></th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="fs-3">{item.emoji}</td>
                  <td>{item.nombre}</td>
                  <td>{formatearPrecio(item.precio)}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-secondary"
                        aria-label={`Restar ${item.nombre}`}
                        onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                      >
                        −
                      </Button>
                      <Button variant="light" disabled>{item.cantidad}</Button>
                      <Button
                        variant="outline-secondary"
                        aria-label={`Sumar ${item.nombre}`}
                        disabled={item.cantidad >= item.stock}
                        onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td>{formatearPrecio(item.precio * item.cantidad)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      aria-label={`Eliminar ${item.nombre}`}
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5">Resumen</h2>
              <p className="mb-1">Productos: {totalProductos}</p>
              <p className="fs-4">
                Total: <strong data-testid="total-carrito">{formatearPrecio(total)}</strong>
              </p>
              <div className="d-grid gap-2">
                <Button variant="success" onClick={() => navigate('/checkout')}>
                  Comprar ahora
                </Button>
                <Button variant="outline-secondary" onClick={vaciarCarrito}>
                  Vaciar carrito
                </Button>
                <Button as={Link} to="/productos" variant="link">
                  Seguir comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default CarritoView
