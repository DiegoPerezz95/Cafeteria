import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NoEncontradoView() {
  return (
    <section className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Esta página no existe (o todavía la estamos preparando ☕).</p>
      <Button as={Link} to="/" variant="dark">Volver al inicio</Button>
    </section>
  )
}

export default NoEncontradoView
