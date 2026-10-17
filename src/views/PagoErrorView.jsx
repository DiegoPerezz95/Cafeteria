import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import DatosOrden from '../components/DatosOrden'
import ResumenCompra from '../components/ResumenCompra'
import { obtenerOrdenPorId } from '../data/datos'

function PagoErrorView() {
  const { id } = useParams()
  const orden = obtenerOrdenPorId(id)

  if (!orden) {
    return <Alert variant="danger">No encontramos esa compra.</Alert>
  }

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 860 }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between flex-wrap gap-2">
          <h1 className="h3 text-danger">❌ No se pudo realizar el pago</h1>
          <small className="text-muted">Código de orden: {orden.codigo}</small>
        </div>
        <p className="text-muted">Tu carrito sigue guardado. Puedes intentarlo nuevamente.</p>

        <div className="text-center mb-4">
          <Button as={Link} to="/checkout" variant="success">
            Volver a realizar el pago
          </Button>
        </div>

        <DatosOrden orden={orden} />
        <ResumenCompra items={orden.items} total={orden.total} />
      </Card.Body>
    </Card>
  )
}

export default PagoErrorView
