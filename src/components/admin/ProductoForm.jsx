import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { obtenerCategorias } from '../../data/datos'

const PRODUCTO_VACIO = {
  nombre: '',
  descripcion: '',
  categoriaId: '',
  precio: '',
  stock: '',
  emoji: '☕',
  oferta: false,
  precioOferta: '',
  destacado: false,
}

export function validarProducto(datos) {
  const errores = {}
  if (!datos.nombre.trim()) errores.nombre = 'El nombre es obligatorio.'
  if (!datos.categoriaId) errores.categoriaId = 'Elige una categoría.'
  if (!(Number(datos.precio) > 0)) errores.precio = 'El precio debe ser mayor a 0.'
  if (datos.stock === '' || Number(datos.stock) < 0) errores.stock = 'El stock no puede ser negativo.'
  if (datos.oferta) {
    const oferta = Number(datos.precioOferta)
    if (!(oferta > 0) || oferta >= Number(datos.precio)) {
      errores.precioOferta = 'El precio de oferta debe ser menor al precio normal.'
    }
  }
  return errores
}

// Formulario reutilizable: sirve para crear y para editar productos.
// Recibe los datos iniciales por props y avisa al padre con onGuardar.
function ProductoForm({ productoInicial, onGuardar, textoBoton = 'Guardar' }) {
  const [formulario, setFormulario] = useState({ ...PRODUCTO_VACIO, ...productoInicial })
  const [errores, setErrores] = useState({})
  const categorias = obtenerCategorias()

  function cambiar(event) {
    const { name, value, type, checked } = event.target
    setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value })
  }

  function enviar(event) {
    event.preventDefault()
    const encontrados = validarProducto(formulario)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    onGuardar({
      ...formulario,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      categoriaId: Number(formulario.categoriaId),
      precioOferta: formulario.oferta ? Number(formulario.precioOferta) : 0,
    })
  }

  return (
    <Form onSubmit={enviar} noValidate>
      <Row className="g-3">
        <Col md={8}>
          <Form.Group controlId="nombreProducto">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={formulario.nombre} onChange={cambiar} isInvalid={!!errores.nombre} />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="emojiProducto">
            <Form.Label>Ícono (emoji)</Form.Label>
            <Form.Control name="emoji" value={formulario.emoji} onChange={cambiar} />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group controlId="descripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={2} name="descripcion" value={formulario.descripcion} onChange={cambiar} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="categoriaProducto">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoriaId" value={formulario.categoriaId} onChange={cambiar} isInvalid={!!errores.categoriaId}>
              <option value="">Selecciona...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.categoriaId}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="precioProducto">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="precio" value={formulario.precio} onChange={cambiar} isInvalid={!!errores.precio} />
            <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="stockProducto">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={formulario.stock} onChange={cambiar} isInvalid={!!errores.stock} />
            <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Check
            type="switch"
            id="ofertaProducto"
            name="oferta"
            label="En oferta"
            checked={formulario.oferta}
            onChange={cambiar}
          />
          <Form.Check
            type="switch"
            id="destacadoProducto"
            name="destacado"
            label="Destacado en el inicio"
            checked={formulario.destacado}
            onChange={cambiar}
          />
        </Col>

        {/* Este campo solo aparece si el producto está en oferta */}
        {formulario.oferta && (
          <Col md={4}>
            <Form.Group controlId="precioOfertaProducto">
              <Form.Label>Precio de oferta</Form.Label>
              <Form.Control type="number" name="precioOferta" value={formulario.precioOferta} onChange={cambiar} isInvalid={!!errores.precioOferta} />
              <Form.Control.Feedback type="invalid">{errores.precioOferta}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        )}
      </Row>

      <Button type="submit" variant="success" className="mt-4">{textoBoton}</Button>
    </Form>
  )
}

export default ProductoForm
