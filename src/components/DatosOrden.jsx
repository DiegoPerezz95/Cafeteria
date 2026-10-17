import { Col, Row } from 'react-bootstrap'

// Muestra los datos del cliente y la dirección de una orden (solo lectura)
function DatosOrden({ orden }) {
  const { cliente, direccion } = orden

  return (
    <Row className="g-2 mb-3 small">
      <Col md={6}>
        <h6>Cliente</h6>
        <div>{cliente.nombre} {cliente.apellidos}</div>
        <div className="text-muted">{cliente.correo}</div>
      </Col>
      <Col md={6}>
        <h6>Entrega</h6>
        {/* Las órdenes antiguas no tienen "entrega": se consideran despacho */}
        {direccion.entrega === 'retiro' ? (
          <div>Retiro en tienda</div>
        ) : (
          <>
            <div>
              Despacho: {direccion.calle}
              {direccion.departamento && `, ${direccion.departamento}`}
            </div>
            <div className="text-muted">{direccion.comuna}, {direccion.region}</div>
            {direccion.indicaciones && <div className="fst-italic">"{direccion.indicaciones}"</div>}
          </>
        )}
      </Col>
    </Row>
  )
}

export default DatosOrden
