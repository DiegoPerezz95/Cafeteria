import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
  return (
    <Card className="h-100 shadow-sm">
      <div className="producto-imagen">{blog.emoji}</div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{blog.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted small">
          {blog.autor} · {blog.fecha}
        </Card.Subtitle>
        <Card.Text className="flex-grow-1">{blog.resumen}</Card.Text>
        <Button as={Link} to={`/blog/${blog.id}`} variant="outline-dark">
          Leer más
        </Button>
      </Card.Body>
    </Card>
  )
}

export default BlogCard
