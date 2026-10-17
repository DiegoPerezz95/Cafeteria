import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import SelectorRegionComuna from '../components/SelectorRegionComuna'
import { useAuth } from '../context/AuthContext'
import { REGIONES } from '../data/datos'

const REGION_INICIAL = Object.keys(REGIONES)[0]

const FORMULARIO_VACIO = {
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  confirmarClave: '',
  calle: '',
  region: REGION_INICIAL,
  comuna: REGIONES[REGION_INICIAL][0],
}

// Revisa el formulario y devuelve un objeto con los errores encontrados
export function validarRegistro(datos) {
  const errores = {}
  if (!datos.nombre.trim()) errores.nombre = 'El nombre es obligatorio.'
  if (!datos.apellidos.trim()) errores.apellidos = 'Los apellidos son obligatorios.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) errores.correo = 'Ingresa un correo válido.'
  if (datos.clave.length < 6) errores.clave = 'La contraseña debe tener al menos 6 caracteres.'
  if (datos.clave !== datos.confirmarClave) errores.confirmarClave = 'Las contraseñas no coinciden.'
  if (!datos.calle.trim()) errores.calle = 'La dirección es obligatoria.'
  return errores
}

function RegistroView() {
  // Un solo estado (objeto) para todo el formulario
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')

  const { registrar } = useAuth()
  const navigate = useNavigate()

  // Actualiza solo el campo que cambió (según el atributo "name" del input)
  function cambiar(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function enviar(event) {
    event.preventDefault()
    const encontrados = validarRegistro(formulario)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    try {
      const datos = { ...formulario }
      delete datos.confirmarClave
      registrar(datos)
      navigate('/')
    } catch (error) {
      setErrorGeneral(error.message)
    }
  }

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 720 }}>
      <Card.Body className="p-4">
        <h1 className="h3 mb-3">Crear cuenta</h1>

        {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

        <Form onSubmit={enviar} noValidate>
          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Group controlId="nombreRegistro">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={formulario.nombre} onChange={cambiar} isInvalid={!!errores.nombre} />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="apellidosRegistro">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control name="apellidos" value={formulario.apellidos} onChange={cambiar} isInvalid={!!errores.apellidos} />
                <Form.Control.Feedback type="invalid">{errores.apellidos}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="correoRegistro">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={formulario.correo} onChange={cambiar} isInvalid={!!errores.correo} />
                <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="claveRegistro">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="clave" value={formulario.clave} onChange={cambiar} isInvalid={!!errores.clave} />
                <Form.Control.Feedback type="invalid">{errores.clave}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="confirmarClaveRegistro">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control type="password" name="confirmarClave" value={formulario.confirmarClave} onChange={cambiar} isInvalid={!!errores.confirmarClave} />
                <Form.Control.Feedback type="invalid">{errores.confirmarClave}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="calleRegistro">
                <Form.Label>Dirección (calle y número)</Form.Label>
                <Form.Control name="calle" value={formulario.calle} onChange={cambiar} isInvalid={!!errores.calle} />
                <Form.Control.Feedback type="invalid">{errores.calle}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="mb-4">
            <SelectorRegionComuna
              region={formulario.region}
              comuna={formulario.comuna}
              onChange={(region, comuna) => setFormulario({ ...formulario, region, comuna })}
            />
          </div>

          <Button type="submit" variant="dark" className="w-100">Registrarme</Button>
        </Form>

        <p className="mt-3 mb-0 text-center small">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </Card.Body>
    </Card>
  )
}

export default RegistroView
