import { Card } from 'react-bootstrap'

// Tarjeta de color con un número grande (para el dashboard y reportes)
function TarjetaResumen({ titulo, valor, detalle, color = 'primary', icono }) {
  return (
    <Card bg={color} text={color === 'warning' ? 'dark' : 'white'} className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="small text-uppercase">{titulo}</div>
            <div className="fs-2 fw-bold">{valor}</div>
          </div>
          <span className="fs-1">{icono}</span>
        </div>
        {detalle && <div className="small mt-2">{detalle}</div>}
      </Card.Body>
    </Card>
  )
}

export default TarjetaResumen
