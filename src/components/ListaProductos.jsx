import { useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { useCarrito } from '../context/CarritoContext'
import ProductoCard from './ProductoCard'

// Muestra una grilla de productos y se encarga de agregarlos al carrito.
function ListaProductos({ productos, mensajeVacio = 'No se encontraron productos.' }) {
  const { agregarAlCarrito } = useCarrito()
  const [ultimoAgregado, setUltimoAgregado] = useState(null)

  function agregar(producto) {
    agregarAlCarrito(producto)
    setUltimoAgregado(producto.nombre)
  }

  // Renderizado condicional: si la lista viene vacía mostramos un aviso
  if (productos.length === 0) {
    return <Alert variant="warning">{mensajeVacio}</Alert>
  }

  return (
    <>
      {ultimoAgregado && (
        <Alert variant="success" dismissible onClose={() => setUltimoAgregado(null)}>
          Agregaste <strong>{ultimoAgregado}</strong> al carrito.
        </Alert>
      )}

      <Row xs={1} sm={2} lg={4} className="g-3">
        {productos.map((producto) => (
          <Col key={producto.id}>
            <ProductoCard producto={producto} onAgregar={agregar} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ListaProductos
