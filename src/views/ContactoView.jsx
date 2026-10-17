import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'

const FORMULARIO_VACIO = { nombre: '', correo: '', mensaje: '' }

function ContactoView() {
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO)
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  function cambiar(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function enviar(event) {
    event.preventDefault()

    if (!formulario.nombre.trim() || !formulario.mensaje.trim()) {
      setError('Completa tu nombre y tu mensaje.')
      setEnviado(false)
      return
    }

    // Guardamos el mensaje en localStorage (se agrega a la lista de mensajes)
    const guardados = JSON.parse(localStorage.getItem('mensajesCafe') || '[]')
    guardados.push({ id: Date.now(), ...formulario })
    localStorage.setItem('mensajesCafe', JSON.stringify(guardados))

    setFormulario(FORMULARIO_VACIO)
    setError('')
    setEnviado(true)
  }

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 640 }}>
      <Card.Body className="p-4">
        <h1 className="h3">Contacto</h1>
        <p className="text-muted">📍 Av. Siempre Viva 123, Santiago · 📞 +56 9 1234 5678</p>

        {error && <Alert variant="danger">{error}</Alert>}
        {enviado && <Alert variant="success">¡Gracias! Tu mensaje fue enviado.</Alert>}

        <Form onSubmit={enviar} noValidate>
          <Form.Group className="mb-3" controlId="nombreContacto">
            <Form.Label>Tu nombre</Form.Label>
            <Form.Control name="nombre" value={formulario.nombre} onChange={cambiar} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="correoContacto">
            <Form.Label>Correo (opcional)</Form.Label>
            <Form.Control type="email" name="correo" value={formulario.correo} onChange={cambiar} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mensajeContacto">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} name="mensaje" value={formulario.mensaje} onChange={cambiar} />
          </Form.Group>

          <Button type="submit" variant="dark">Enviar mensaje</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ContactoView
