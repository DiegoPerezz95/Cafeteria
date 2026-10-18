import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { REGIONES } from '../../data/datos'
import SelectorRegionComuna from '../SelectorRegionComuna'

const REGION_INICIAL = Object.keys(REGIONES)[0]

const USUARIO_VACIO = {
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  rol: 'cliente',
  calle: '',
  region: REGION_INICIAL,
  comuna: REGIONES[REGION_INICIAL][0],
}

// Sirve para crear y editar usuarios. Al editar, la contraseña es opcional.
function UsuarioForm({ usuarioInicial, onGuardar, esEdicion = false, textoBoton = 'Guardar' }) {
  const [formulario, setFormulario] = useState({ ...USUARIO_VACIO, ...usuarioInicial, clave: '' })
  const [errores, setErrores] = useState({})

  function cambiar(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function validar() {
    const encontrados = {}
    if (!formulario.nombre.trim()) encontrados.nombre = 'El nombre es obligatorio.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo)) encontrados.correo = 'Ingresa un correo válido.'
    if (!esEdicion && formulario.clave.length < 6) encontrados.clave = 'Mínimo 6 caracteres.'
    if (esEdicion && formulario.clave && formulario.clave.length < 6) encontrados.clave = 'Mínimo 6 caracteres.'
    return encontrados
  }

  function enviar(event) {
    event.preventDefault()
    const encontrados = validar()
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    const datos = { ...formulario }
    // Si al editar no se escribió una contraseña nueva, no la cambiamos
    if (esEdicion && !datos.clave) delete datos.clave
    onGuardar(datos)
  }

  return (
    <Form onSubmit={enviar} noValidate>
      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group controlId="nombreUsuario">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={formulario.nombre} onChange={cambiar} isInvalid={!!errores.nombre} />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="apellidosUsuario">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control name="apellidos" value={formulario.apellidos} onChange={cambiar} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="correoUsuario">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="correo" value={formulario.correo} onChange={cambiar} isInvalid={!!errores.correo} />
            <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="claveUsuario">
            <Form.Label>{esEdicion ? 'Nueva contraseña (opcional)' : 'Contraseña'}</Form.Label>
            <Form.Control type="password" name="clave" value={formulario.clave} onChange={cambiar} isInvalid={!!errores.clave} />
            <Form.Control.Feedback type="invalid">{errores.clave}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="rolUsuario">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="rol" value={formulario.rol} onChange={cambiar}>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group controlId="calleUsuario">
            <Form.Label>Dirección</Form.Label>
            <Form.Control name="calle" value={formulario.calle} onChange={cambiar} />
          </Form.Group>
        </Col>
      </Row>

      <SelectorRegionComuna
        region={formulario.region}
        comuna={formulario.comuna}
        onChange={(region, comuna) => setFormulario({ ...formulario, region, comuna })}
      />

      <Button type="submit" variant="success" className="mt-4">{textoBoton}</Button>
    </Form>
  )
}

export default UsuarioForm
