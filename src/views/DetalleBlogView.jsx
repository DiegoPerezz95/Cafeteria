import { Alert, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { obtenerBlogPorId } from '../data/datos'

function DetalleBlogView() {
  const { id } = useParams()
  const blog = obtenerBlogPorId(id)

  if (!blog) {
    return <Alert variant="danger">La publicación no existe.</Alert>
  }

  return (
    <article className="mx-auto" style={{ maxWidth: 760 }}>
      <div className="detalle-imagen mb-4">{blog.emoji}</div>
      <h1>{blog.titulo}</h1>
      <p className="text-muted">{blog.autor} · {blog.fecha}</p>
      <p className="lead">{blog.resumen}</p>
      {blog.contenido.map((parrafo) => (
        <p key={parrafo}>{parrafo}</p>
      ))}
      <Button as={Link} to="/blog" variant="outline-dark">← Volver al blog</Button>
    </article>
  )
}

export default DetalleBlogView
