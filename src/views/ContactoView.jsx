import { useEffect, useState } from 'react'
import { Alert, Button, Form, ListGroup } from 'react-bootstrap'

function ContactoView() {
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    // Leemos la lista de mensajes guardados (es un arreglo en formato JSON)
    const guardados = localStorage.getItem('mensajesCafe')
    setMensajes(guardados ? JSON.parse(guardados) : [])
  }, [])

  function enviarMensaje(event) {
    event.preventDefault()
    const nuevo = { id: Date.now(), nombre, mensaje }
    const lista = [...mensajes, nuevo]

    localStorage.setItem('mensajesCafe', JSON.stringify(lista))
    setMensajes(lista)
    setNombre('')
    setMensaje('')
    setEnviado(true)
  }

  return (
    <section className="view-box view-blue">
      <div className="area-label">Vista: ContactoView.jsx</div>

      <h1>Contacto</h1>
      <p>📍 Av. Siempre Viva 123, Santiago · 📞 +56 9 1234 5678</p>

      {enviado && <Alert variant="success">¡Gracias! Tu mensaje fue enviado.</Alert>}

      <div className="component-box component-pink mb-3">
        <div className="area-label">Formulario dentro de ContactoView</div>

        <Form onSubmit={enviarMensaje}>
          <Form.Group className="mb-3" controlId="nombreContacto">
            <Form.Label>Tu nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mensajeContacto">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mensaje}
              onChange={(event) => setMensaje(event.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit">Enviar mensaje</Button>
        </Form>
      </div>

      <div className="component-box component-purple">
        <div className="area-label">Mensajes guardados en localStorage</div>
        {mensajes.length === 0 ? (
          <p className="mb-0">Todavía no hay mensajes.</p>
        ) : (
          <ListGroup>
            {mensajes.map((m) => (
              <ListGroup.Item key={m.id}>
                <strong>{m.nombre}:</strong> {m.mensaje}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </section>
  )
}

export default ContactoView
