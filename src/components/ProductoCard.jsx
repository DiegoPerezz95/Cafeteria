import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatearPrecio, precioFinal, STOCK_CRITICO } from '../data/datos'

// Tarjeta reutilizable de un producto.
// Recibe el producto por props y avisa al padre con onAgregar cuando se presiona "Añadir".
function ProductoCard({ producto, onAgregar }) {
  const agotado = producto.stock === 0

  return (
    <Card className="h-100 shadow-sm producto-card">
      <div className="producto-imagen">{producto.emoji}</div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          {producto.oferta && <Badge bg="danger" className="me-1">Oferta</Badge>}
          {!agotado && producto.stock <= STOCK_CRITICO && (
            <Badge bg="warning" text="dark">¡Últimas {producto.stock}!</Badge>
          )}
          {agotado && <Badge bg="secondary">Agotado</Badge>}
        </div>

        <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">{producto.descripcion}</Card.Text>

        <Card.Text className="small mb-2">Stock: {producto.stock}</Card.Text>
        
        <div className="mb-3">
          {producto.oferta && (
            <span className="text-muted text-decoration-line-through me-2">
              {formatearPrecio(producto.precio)}
            </span>
          )}
          <strong className="precio">{formatearPrecio(precioFinal(producto))}</strong>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="dark"
            disabled={agotado}
            onClick={() => onAgregar(producto)}
          >
            Añadir
          </Button>
          <Button as={Link} to={`/productos/${producto.id}`} variant="outline-secondary">
            Ver detalle
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductoCard
