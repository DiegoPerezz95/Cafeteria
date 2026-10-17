import { Card } from 'react-bootstrap'

function BaristaCard({ barista }) {
  return (
    <Card className="component-box component-green h-100">
      <div className="area-label">Componente: BaristaCard</div>

      <Card.Body>
        <div className="barista-emoji">{barista.emoji}</div>
        <Card.Title>{barista.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{barista.cargo}</Card.Subtitle>
        <Card.Text>Especialidad: {barista.especialidad}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default BaristaCard
