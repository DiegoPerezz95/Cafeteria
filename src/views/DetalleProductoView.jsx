import { useState } from 'react'
import { Alert, Badge, Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import ListaProductos from '../components/ListaProductos'
import { useCarrito } from '../context/CarritoContext'
import {
  formatearPrecio,
  obtenerCategoriaPorId,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  precioFinal,
} from '../data/datos'

function DetalleProductoView() {
  const { id } = useParams()
  const { agregarAlCarrito } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  const producto = obtenerProductoPorId(id)

  if (!producto) {
    return (
      <Alert variant="danger">
        El producto no existe. <Link to="/productos">Volver a productos</Link>
      </Alert>
    )
  }

  const categoria = obtenerCategoriaPorId(producto.categoriaId)
  const relacionados = obtenerProductosPorCategoria(producto.categoriaId).filter(
    (p) => p.id !== producto.id
  )

  function agregar() {
    agregarAlCarrito(producto, cantidad)
    setAgregado(true)
  }

  return (
    <section>
      <Row className="g-4 mb-5">
        <Col md={5}>
          <div className="detalle-imagen">{producto.emoji}</div>
        </Col>
        <Col md={7}>
          {categoria && <Badge bg="secondary" className="mb-2">{categoria.nombre}</Badge>}
          <h1>{producto.nombre}</h1>
          <p className="lead">{producto.descripcion}</p>

          <h3 className="precio">
            {producto.oferta && (
              <small className="text-muted text-decoration-line-through me-2 fs-5">
                {formatearPrecio(producto.precio)}
              </small>
            )}
            {formatearPrecio(precioFinal(producto))}
          </h3>
          <p className="text-muted">Stock disponible: {producto.stock}</p>

          {agregado && (
            <Alert variant="success">
              Agregaste {cantidad} {producto.nombre} al carrito.
            </Alert>
          )}

          <div className="d-flex gap-2 align-items-end">
            <Form.Group controlId="cantidadProducto" style={{ maxWidth: 120 }}>
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
              />
            </Form.Group>
            <Button variant="dark" onClick={agregar} disabled={producto.stock === 0}>
              Añadir al carrito
            </Button>
          </div>
        </Col>
      </Row>

      {relacionados.length > 0 && (
        <>
          <h2 className="mb-3">También te puede gustar</h2>
          <ListaProductos productos={relacionados} />
        </>
      )}
    </section>
  )
}

export default DetalleProductoView
