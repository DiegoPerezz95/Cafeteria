import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import PanelReserva from '../components/PanelReserva'

function ReservaView() {
  const [nombre, setNombre] = useState('')
  const [personas, setPersonas] = useState('2')
  const [reserva, setReserva] = useState(null)
  const [ultimaVista, setUltimaVista] = useState('')

  useEffect(() => {
    // Al entrar a la vista leemos la reserva guardada (si existe)
    const guardada = localStorage.getItem('reservaCafe')
    setReserva(guardada ? JSON.parse(guardada) : null)

    sessionStorage.setItem('ultimaVista', 'Reserva')
    setUltimaVista(sessionStorage.getItem('ultimaVista') || '')
  }, [])

  function guardarReserva(event) {
    event.preventDefault()
    const nuevaReserva = { nombre, personas: Number(personas) }

    localStorage.setItem('reservaCafe', JSON.stringify(nuevaReserva))
    setReserva(nuevaReserva)
    setNombre('')
    setPersonas('2')
  }

  function cancelarReserva() {
    localStorage.removeItem('reservaCafe')
    sessionStorage.removeItem('ultimaVista')
    sessionStorage.removeItem('platoSeleccionado')
    setReserva(null)
    setUltimaVista('')
  }

  return (
    <section className="view-box view-purple">
      <div className="area-label">Vista: ReservaView.jsx</div>

      <h1>Reserva tu mesa</h1>

      <p>
        La reserva se guarda en localStorage, así que sigue ahí aunque cierres el navegador.
        sessionStorage solo dura mientras la pestaña esté abierta.
      </p>

      <div className="component-box component-pink mb-3">
        <div className="area-label">Formulario dentro de ReservaView</div>

        <Form onSubmit={guardarReserva}>
          <Form.Group className="mb-3" controlId="nombreCliente">
            <Form.Label>Nombre del cliente</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              placeholder="Ej: Camila"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cantidadPersonas">
            <Form.Label>Cantidad de personas</Form.Label>
            <Form.Select
              value={personas}
              onChange={(event) => setPersonas(event.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit">Guardar reserva</Button>
        </Form>
      </div>

      <PanelReserva
        reserva={reserva}
        ultimaVista={ultimaVista}
        onCancelar={cancelarReserva}
      />
    </section>
  )
}

export default ReservaView
