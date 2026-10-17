import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ResumenCompra from '../components/ResumenCompra'
import SelectorRegionComuna from '../components/SelectorRegionComuna'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { REGIONES, crearOrden, descontarStock, formatearPrecio } from '../data/datos'

const REGION_INICIAL = Object.keys(REGIONES)[0]

// Si hay sesión iniciada, el formulario parte con los datos del usuario
function datosIniciales(usuario) {
  return {
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellidos || '',
    correo: usuario?.correo || '',
    calle: usuario?.calle || '',
    entrega: 'despacho',
    departamento: '',
    region: usuario?.region || REGION_INICIAL,
    comuna: usuario?.comuna || REGIONES[REGION_INICIAL][0],
    indicaciones: '',
  }
}

function CheckoutView() {
  const { usuario } = useAuth()
  const { items, total, vaciarCarrito } = useCarrito()
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState(() => datosIniciales(usuario))
  const [errores, setErrores] = useState({})
  const [simularError, setSimularError] = useState(false)

  if (items.length === 0) {
    return (
      <Alert variant="info">
        No hay productos para pagar. <Link to="/productos">Ver productos</Link>
      </Alert>
    )
  }

  function cambiar(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function validar() {
    const encontrados = {}
    if (!formulario.nombre.trim()) encontrados.nombre = 'El nombre es obligatorio.'
    if (!formulario.apellidos.trim()) encontrados.apellidos = 'Los apellidos son obligatorios.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo)) encontrados.correo = 'Ingresa un correo válido.'
    // La calle solo es obligatoria si el pedido se despacha a domicilio
    if (formulario.entrega === 'despacho' && !formulario.calle.trim()) {
      encontrados.calle = 'La calle es obligatoria.'
    }
    return encontrados
  }

  function pagar(event) {
    event.preventDefault()
    const encontrados = validar()
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    // Simulamos el pago: si se marcó la casilla, el pago es rechazado
    const pagoAprobado = !simularError

    const orden = crearOrden({
      cliente: {
        nombre: formulario.nombre,
        apellidos: formulario.apellidos,
        correo: formulario.correo,
      },
      direccion: {
        entrega: formulario.entrega,
        calle: formulario.calle,
        departamento: formulario.departamento,
        region: formulario.region,
        comuna: formulario.comuna,
        indicaciones: formulario.indicaciones,
      },
      items,
      total,
      estado: pagoAprobado ? 'pagada' : 'rechazada',
    })

    if (pagoAprobado) {
      descontarStock(items)
      vaciarCarrito()
      navigate(`/pago-exitoso/${orden.id}`)
    } else {
      // Si el pago falla, el carrito se mantiene para volver a intentarlo
      navigate(`/pago-error/${orden.id}`)
    }
  }

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: 860 }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h1 className="h3 mb-0">Checkout</h1>
            <small className="text-muted">Completa tus datos para el envío</small>
          </div>
          <span className="badge bg-primary fs-6">Total a pagar: {formatearPrecio(total)}</span>
        </div>

        <ResumenCompra items={items} total={total} />

        <Form onSubmit={pagar} noValidate>
          <h2 className="h5 mt-4">Información del cliente</h2>
          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Group controlId="nombreCheckout">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={formulario.nombre} onChange={cambiar} isInvalid={!!errores.nombre} />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="apellidosCheckout">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control name="apellidos" value={formulario.apellidos} onChange={cambiar} isInvalid={!!errores.apellidos} />
                <Form.Control.Feedback type="invalid">{errores.apellidos}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="correoCheckout">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={formulario.correo} onChange={cambiar} isInvalid={!!errores.correo} />
                <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <h2 className="h5">Entrega</h2>
          <Form.Group className="mb-3" controlId="entregaCheckout" style={{ maxWidth: 320 }}>
            <Form.Label>Tipo de entrega</Form.Label>
            <Form.Select name="entrega" value={formulario.entrega} onChange={cambiar}>
              <option value="despacho">Despacho a domicilio</option>
              <option value="retiro">Retiro en tienda</option>
            </Form.Select>
          </Form.Group>

          {/* Renderizado condicional: la dirección solo se pide si hay despacho */}
          {formulario.entrega === 'despacho' ? (
            <>
              <Row className="g-3 mb-3">
                <Col md={8}>
                  <Form.Group controlId="calleCheckout">
                    <Form.Label>Calle</Form.Label>
                    <Form.Control name="calle" value={formulario.calle} onChange={cambiar} isInvalid={!!errores.calle} />
                    <Form.Control.Feedback type="invalid">{errores.calle}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="departamentoCheckout">
                    <Form.Label>Departamento (opcional)</Form.Label>
                    <Form.Control name="departamento" value={formulario.departamento} onChange={cambiar} placeholder="Ej: 603" />
                  </Form.Group>
                </Col>
              </Row>

              <div className="mb-3">
                <SelectorRegionComuna
                  region={formulario.region}
                  comuna={formulario.comuna}
                  onChange={(region, comuna) => setFormulario({ ...formulario, region, comuna })}
                />
              </div>

              <Form.Group className="mb-3" controlId="indicacionesCheckout">
                <Form.Label>Indicaciones para la entrega (opcional)</Form.Label>
                <Form.Control as="textarea" rows={2} name="indicaciones" value={formulario.indicaciones} onChange={cambiar} />
              </Form.Group>
            </>
          ) : (
            <Alert variant="info">
              Retira tu pedido en Av. Siempre Viva 123, Santiago, de lunes a sábado entre 08:00 y 20:00.
            </Alert>
          )}

          <Form.Check
            type="switch"
            id="simularError"
            className="mb-3 text-muted"
            label="Simular pago rechazado (modo prueba)"
            checked={simularError}
            onChange={(e) => setSimularError(e.target.checked)}
          />

          <div className="text-end">
            <Button type="submit" variant="success" size="lg">
              Pagar ahora {formatearPrecio(total)}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CheckoutView
