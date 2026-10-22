import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

// Traemos los datos de las regiones y el componente que las dibuja
import { REGIONES } from '../../data/datos'
import SelectorRegionComuna from '../SelectorRegionComuna'

// 1. EL MOLDE: Definimos cómo es un usuario en blanco
const REGION_INICIAL = Object.keys(REGIONES)[0] // Agarra la primera región de la lista

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

// 2. EL EMPLEADO CAPTURADOR
function UsuarioForm({ usuarioInicial, onGuardar, esEdicion = false, textoBoton = 'Guardar' }) {
  
  // La memoria principal: Mezclamos el molde vacío con los datos que nos pase el jefe
  // Truco: Forzamos la clave a '' (vacío) para que al editar no se vea la contraseña real
  const [formulario, setFormulario] = useState({ ...USUARIO_VACIO, ...usuarioInicial, clave: '' })
  
  // La memoria para anotar los errores
  const [errores, setErrores] = useState({})


  // 1. LA FOTOCOPIADORA: Función que se ejecuta cada vez que tecleas algo
  function cambiar(event) {
    const { name, value } = event.target
    // Copiamos todo lo que ya estaba escrito y actualizamos solo el campo que cambió
    setFormulario({ ...formulario, [name]: value })
  }

  // 2. EL GUARDIA: Función que se ejecuta al presionar "Guardar"
  function enviar(event) {
    event.preventDefault() // Evita que la página parpadee y se recargue
    
    // Anotamos los errores en una lista vacía
    const encontrados = {}
    
    // Regla 1: El nombre no puede estar vacío
    if (formulario.nombre.trim() === '') {
      encontrados.nombre = 'El nombre es obligatorio.'
    }
    
    // Regla 2: La contraseña (mínimo 6 letras si es nuevo, o si decidió cambiarla al editar)
    if (!esEdicion && formulario.clave.length < 6) {
      encontrados.clave = 'Mínimo 6 caracteres.'
    }
    if (esEdicion && formulario.clave !== '' && formulario.clave.length < 6) {
      encontrados.clave = 'Mínimo 6 caracteres.'
    }

    // Guardamos los errores en la memoria
    setErrores(encontrados)

    // Si la lista de errores tiene al menos 1 elemento, frenamos todo y no guardamos
    if (Object.keys(encontrados).length > 0) return

    // Si todo está perfecto, preparamos los datos
    const datosFinales = { ...formulario }
    
    // Si estamos editando y el jefe no escribió una clave nueva, la borramos para no sobreescribirla
    if (esEdicion && datosFinales.clave === '') {
      delete datosFinales.clave
    }
    
    // Llamamos al componente "Jefe" y le entregamos los datos limpios
    onGuardar(datosFinales)
  }

  return (
    // onSubmit={enviar} significa: cuando presionen Enter o el botón, llama al Guardia
    <Form onSubmit={enviar} noValidate>
      
      <Row className="g-3 mb-3">
        {/* CAJA 1: Nombre (Ocupa la mitad de la pantalla en PC = md={6}) */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              name="nombre" 
              value={formulario.nombre} 
              onChange={cambiar} 
              isInvalid={!!errores.nombre} 
            />
            {/* Aquí aparece el mensaje de error en rojo si lo hay */}
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* CAJA 2: Apellidos */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control name="apellidos" value={formulario.apellidos} onChange={cambiar} />
          </Form.Group>
        </Col>

        {/* CAJA 3: Correo */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="correo" value={formulario.correo} onChange={cambiar} isInvalid={!!errores.correo} />
            <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* CAJA 4: Contraseña (Cambia el texto si estamos creando o editando) */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>{esEdicion ? 'Nueva clave (opcional)' : 'Contraseña'}</Form.Label>
            <Form.Control type="password" name="clave" value={formulario.clave} onChange={cambiar} isInvalid={!!errores.clave} />
            <Form.Control.Feedback type="invalid">{errores.clave}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* CAJA 5: Rol (Es un menú desplegable Select, no un texto normal) */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Rol</Form.Label>
            <Form.Select name="rol" value={formulario.rol} onChange={cambiar}>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* CAJA 6: Calle */}
        <Col md={12}>
          <Form.Group>
            <Form.Label>Dirección (Calle y número)</Form.Label>
            <Form.Control name="calle" value={formulario.calle} onChange={cambiar} />
          </Form.Group>
        </Col>
      </Row>

      {/* COMPONENTE INVITADO: Dibuja los selects de región y comuna. 
          Le pasamos una mini-fotocopiadora especial solo para él */}
      <SelectorRegionComuna
        region={formulario.region}
        comuna={formulario.comuna}
        onChange={(region, comuna) => setFormulario({ ...formulario, region, comuna })}
      />

      <Button type="submit" variant="success" className="mt-4">
        {textoBoton}
      </Button>

    </Form>
  )
}

export default UsuarioForm