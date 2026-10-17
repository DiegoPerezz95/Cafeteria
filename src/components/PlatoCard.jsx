import { Badge, Button, Card } from 'react-bootstrap'

function PlatoCard({ plato, onSeleccionar }) {
  return (
    <Card className="component-box component-blue h-100">
      <div className="area-label">Componente: PlatoCard</div>

      <Card.Body>
        <Badge bg="secondary" className="mb-2">{plato.categoria}</Badge>
        <Card.Title>{plato.nombre}</Card.Title>
        <Card.Text>{plato.descripcion}</Card.Text>
        <Card.Text>
          <strong>Precio:</strong> ${plato.precio.toLocaleString('es-CL')}
        </Card.Text>

        <Button variant="primary" onClick={() => onSeleccionar(plato)}>
          Pedir este plato
        </Button>
      </Card.Body>
    </Card>
  )
}

export default PlatoCard
