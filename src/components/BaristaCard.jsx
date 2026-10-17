import { Card } from 'react-bootstrap'

function BaristaCard({ barista }) {
  return (
    <Card className="h-100 text-center shadow-sm">
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
