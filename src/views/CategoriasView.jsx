import { Alert, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CategoriaCard from '../components/CategoriaCard'
import ListaProductos from '../components/ListaProductos'
import { obtenerCategoriaPorId, obtenerCategorias, obtenerProductosPorCategoria } from '../data/datos'

// Sirve para /categorias (muestra la primera) y para /categorias/:id
function CategoriasView() {
  const { id } = useParams()
  const categorias = obtenerCategorias()

  const categoria = id ? obtenerCategoriaPorId(id) : categorias[0]

  return (
    <section>
      <h1 className="mb-3">Categorías</h1>

      <Row xs={2} md={4} className="g-3 mb-4">
        {categorias.map((c) => (
          <Col key={c.id}>
            <CategoriaCard categoria={c} activa={categoria?.id === c.id} />
          </Col>
        ))}
      </Row>

      {categoria ? (
        <>
          <h2>{categoria.emoji} {categoria.nombre}</h2>
          <p className="text-muted">{categoria.descripcion}</p>
          <ListaProductos
            productos={obtenerProductosPorCategoria(categoria.id)}
            mensajeVacio="Esta categoría todavía no tiene productos."
          />
        </>
      ) : (
        <Alert variant="danger">La categoría no existe.</Alert>
      )}
    </section>
  )
}

export default CategoriasView
