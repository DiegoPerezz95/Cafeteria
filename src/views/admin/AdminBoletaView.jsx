import { Alert, Badge, Button, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import DatosOrden from '../../components/DatosOrden'
import ResumenCompra from '../../components/ResumenCompra'
import { obtenerOrdenPorId } from '../../data/datos'

function AdminBoletaView() {
  const { id } = useParams()
  const orden = obtenerOrdenPorId(id)

  if (!orden) {
    return <Alert variant="danger">La orden no existe.</Alert>
  }

  return (
    <section>
      <Card className="shadow-sm mx-auto" style={{ maxWidth: 860 }}>
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <h1 className="h4 mb-0">Boleta {orden.codigo}</h1>
              <small className="text-muted">{new Date(orden.fecha).toLocaleString('es-CL')}</small>
            </div>
            <Badge bg={orden.estado === 'pagada' ? 'success' : 'danger'} className="align-self-start fs-6">
              {orden.estado}
            </Badge>
          </div>

          <DatosOrden orden={orden} />
          <ResumenCompra items={orden.items} total={orden.total} />

          <div className="d-flex gap-2">
            <Button variant="danger" onClick={() => window.print()}>Imprimir boleta</Button>
            <Button as={Link} to="/admin/ordenes" variant="outline-secondary">Volver</Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  )
}

export default AdminBoletaView
