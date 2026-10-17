import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import ListaProductos from '../components/ListaProductos'
import { buscarProductos, obtenerCategorias } from '../data/datos'

function ProductosView() {
  // El texto de búsqueda viene en la URL: /productos?q=latte
  const [searchParams] = useSearchParams()
  const busqueda = searchParams.get('q') || ''

  const [categoriaId, setCategoriaId] = useState('todas')
  const [orden, setOrden] = useState('nombre')

  const categorias = obtenerCategorias()

  // 1) Filtramos por texto  2) por categoría  3) ordenamos
  let productos = buscarProductos(busqueda)
  if (categoriaId !== 'todas') {
    productos = productos.filter((p) => p.categoriaId === Number(categoriaId))
  }
  productos = [...productos].sort((a, b) => {
    if (orden === 'precio-menor') return a.precio - b.precio
    if (orden === 'precio-mayor') return b.precio - a.precio
    return a.nombre.localeCompare(b.nombre)
  })

  return (
    <section>
      <h1>Productos</h1>
      {busqueda && (
        <p className="text-muted">
          Resultados para: <strong>"{busqueda}"</strong>
        </p>
      )}

      <Row className="g-2 mb-4">
        <Col md={4}>
          <Form.Group controlId="filtroCategoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
              <option value="todas">Todas</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="ordenProductos">
            <Form.Label>Ordenar por</Form.Label>
            <Form.Select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="nombre">Nombre (A-Z)</option>
              <option value="precio-menor">Precio: menor a mayor</option>
              <option value="precio-mayor">Precio: mayor a menor</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <ListaProductos productos={productos} />
    </section>
  )
}

export default ProductosView
