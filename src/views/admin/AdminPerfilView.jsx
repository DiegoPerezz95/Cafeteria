import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { actualizarUsuario } from '../../data/datos'

function AdminPerfilView() {
  const { usuario, actualizarSesion } = useAuth()
  const [nombre, setNombre] = useState(usuario?.nombre || '')
  const [apellidos, setApellidos] = useState(usuario?.apellidos || '')
  const [clave, setClave] = useState('')
  const [mensaje, setMensaje] = useState(null) // { tipo, texto }

  // AdminLayout ya exige sesión, pero por seguridad no dibujamos nada sin usuario
  if (!usuario) return null

  function guardar(event) {
    event.preventDefault()
    if (!nombre.trim()) {
      setMensaje({ tipo: 'danger', texto: 'El nombre es obligatorio.' })
      return
    }
    if (clave && clave.length < 6) {
      setMensaje({ tipo: 'danger', texto: 'La nueva contraseña debe tener al menos 6 caracteres.' })
      return
    }

    const cambios = { nombre, apellidos }
    if (clave) cambios.clave = clave

    const actualizado = actualizarUsuario(usuario.id, cambios)
    actualizarSesion(actualizado)
    setClave('')
    setMensaje({ tipo: 'success', texto: 'Perfil actualizado.' })
  }

  return (
    <section>
      <h1 className="h3 mb-3">Mi perfil</h1>
      <Card className="shadow-sm" style={{ maxWidth: 640 }}>
        <Card.Body>
          {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}
          <p className="text-muted">{usuario.correo} · rol: {usuario.rol}</p>
          <Form onSubmit={guardar} noValidate>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="nombrePerfil">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="apellidosPerfil">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="clavePerfil">
                  <Form.Label>Nueva contraseña (opcional)</Form.Label>
                  <Form.Control type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="success" className="mt-3">Guardar</Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  )
}

export default AdminPerfilView
