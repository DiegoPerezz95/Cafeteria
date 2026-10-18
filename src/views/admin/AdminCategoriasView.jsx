import { useState } from 'react'
import { Alert, Button, ButtonGroup, Card, Col, Form, Row, Table } from 'react-bootstrap'
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  obtenerCategorias,
  obtenerProductosPorCategoria,
} from '../../data/datos'

const CATEGORIA_VACIA = { nombre: '', emoji: '🏷️', descripcion: '' }

function AdminCategoriasView() {
  const [categorias, setCategorias] = useState(() => obtenerCategorias())
  const [nueva, setNueva] = useState(CATEGORIA_VACIA)
  const [editando, setEditando] = useState(null) // copia de la categoría que se está editando
  const [error, setError] = useState('')

  function recargar() {
    setCategorias(obtenerCategorias())
  }

  function crear(event) {
    event.preventDefault()
    if (!nueva.nombre.trim()) {
      setError('El nombre de la categoría es obligatorio.')
      return
    }
    crearCategoria(nueva)
    setNueva(CATEGORIA_VACIA)
    setError('')
    recargar()
  }

  function guardarEdicion() {
    if (!editando.nombre.trim()) {
      setError('El nombre de la categoría es obligatorio.')
      return
    }
    actualizarCategoria(editando.id, editando)
    setEditando(null)
    setError('')
    recargar()
  }

  function eliminar(categoria) {
    eliminarCategoria(categoria.id)
    recargar()
  }

  return (
    <section>
      <h1 className="h3 mb-3">Categorías</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h2 className="h5">Nueva categoría</h2>
          <Form onSubmit={crear} noValidate>
            <Row className="g-2 align-items-end">
              <Col md={4}>
                <Form.Group controlId="nombreCategoria">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control value={nueva.nombre} onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="emojiCategoria">
                  <Form.Label>Ícono</Form.Label>
                  <Form.Control value={nueva.emoji} onChange={(e) => setNueva({ ...nueva, emoji: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="descripcionCategoria">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control value={nueva.descripcion} onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={2} className="d-grid">
                <Button type="submit" variant="success">Crear</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Table responsive className="align-middle bg-white">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => {
            const cantidad = obtenerProductosPorCategoria(categoria.id).length
            const enEdicion = editando?.id === categoria.id

            return (
              <tr key={categoria.id}>
                <td className="fs-4">{categoria.emoji}</td>
                <td>
                  {enEdicion ? (
                    <Form.Control
                      size="sm"
                      aria-label="Editar nombre"
                      value={editando.nombre}
                      onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                    />
                  ) : (
                    categoria.nombre
                  )}
                </td>
                <td className="small text-muted">{categoria.descripcion}</td>
                <td>{cantidad}</td>
                <td>
                  {enEdicion ? (
                    <ButtonGroup size="sm">
                      <Button variant="success" onClick={guardarEdicion}>Guardar</Button>
                      <Button variant="outline-secondary" onClick={() => setEditando(null)}>Cancelar</Button>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup size="sm">
                      <Button variant="outline-primary" onClick={() => setEditando({ ...categoria })}>Editar</Button>
                      <Button
                        variant="outline-danger"
                        disabled={cantidad > 0}
                        title={cantidad > 0 ? 'No se puede eliminar: tiene productos' : ''}
                        onClick={() => eliminar(categoria)}
                      >
                        Eliminar
                      </Button>
                    </ButtonGroup>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </section>
  )
}

export default AdminCategoriasView
