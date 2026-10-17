import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CategoriaCard({ categoria, activa = false }) {
  return (
    <Card
      as={Link}
      to={`/categorias/${categoria.id}`}
      className={`h-100 text-center text-decoration-none categoria-card ${activa ? 'activa' : ''}`}
    >
      <Card.Body>
        <div className="categoria-emoji">{categoria.emoji}</div>
        <Card.Title className="fs-6 mb-0">{categoria.nombre}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default CategoriaCard
