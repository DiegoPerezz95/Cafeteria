import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginView() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Si nos mandaron aquí desde otra página (ej: /admin), volvemos a ella
  const destino = location.state?.desde || '/'

  function enviar(event) {
    event.preventDefault()

    if (!correo.trim() || !clave) {
      setError('Ingresa tu correo y tu contraseña.')
      return
    }

    if (iniciarSesion(correo, clave)) {
      navigate(destino, { replace: true })
    } else {
      setError('Correo o contraseña incorrectos.')
    }
  }

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 420 }}>
      <Card.Body className="p-4">
        <h1 className="h3 mb-3">Iniciar sesión</h1>

        {/* El mensaje de error solo aparece cuando hay un error */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={enviar} noValidate>
          <Form.Group className="mb-3" controlId="correoLogin">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="nombre@correo.cl"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="claveLogin">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Ingresar
          </Button>
        </Form>

        <p className="mt-3 mb-0 text-center small">
          ¿No tienes cuenta? <Link to="/registro">Crea una aquí</Link>
        </p>
        <p className="mt-2 mb-0 text-center small text-muted">
          Prueba: cliente@cafearoma.cl / cliente123 — admin@cafearoma.cl / admin123
        </p>
      </Card.Body>
    </Card>
  )
}

export default LoginView
