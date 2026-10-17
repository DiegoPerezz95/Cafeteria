import { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import DatosOrden from '../components/DatosOrden'
import ResumenCompra from '../components/ResumenCompra'
import { obtenerOrdenPorId } from '../data/datos'

function PagoExitosoView() {
  const { id } = useParams()
  const orden = obtenerOrdenPorId(id)
  const [boletaEnviada, setBoletaEnviada] = useState(false)

  if (!orden) {
    return <Alert variant="danger">No encontramos esa compra.</Alert>
  }

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 860 }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between flex-wrap gap-2">
          <h1 className="h3 text-success">✅ Se ha realizado la compra</h1>
          <small className="text-muted">Código de orden: {orden.codigo}</small>
        </div>
        <p className="text-muted">Gracias por tu compra. Te enviaremos el pedido a la dirección indicada.</p>

        <DatosOrden orden={orden} />
        <ResumenCompra items={orden.items} total={orden.total} />

        {/* Envío simulado: no hay servidor de correo, solo mostramos la confirmación */}
        {boletaEnviada && (
          <Alert variant="success">Boleta enviada a {orden.cliente.correo}.</Alert>
        )}

        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <Button variant="danger" onClick={() => window.print()}>Imprimir boleta</Button>
          <Button variant="success" onClick={() => setBoletaEnviada(true)}>Enviar boleta por email</Button>
          <Button as={Link} to="/productos" variant="outline-dark">Seguir comprando</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PagoExitosoView
