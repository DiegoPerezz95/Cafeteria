import { Alert, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import ProductoForm from '../../components/admin/ProductoForm'
import { actualizarProducto, crearProducto, obtenerProductoPorId } from '../../data/datos'

// La misma vista sirve para /admin/productos/nuevo y /admin/productos/:id/editar
function AdminProductoFormView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)
  const producto = esEdicion ? obtenerProductoPorId(id) : null

  if (esEdicion && !producto) {
    return <Alert variant="danger">El producto no existe.</Alert>
  }

  function guardar(datos) {
    if (esEdicion) {
      actualizarProducto(id, datos)
    } else {
      crearProducto(datos)
    }
    navigate('/admin/productos')
  }

  return (
    <section>
      <h1 className="h3 mb-3">{esEdicion ? `Editar: ${producto.nombre}` : 'Nuevo producto'}</h1>
      <Card className="shadow-sm">
        <Card.Body>
          <ProductoForm
            productoInicial={producto || {}}
            onGuardar={guardar}
            textoBoton={esEdicion ? 'Guardar cambios' : 'Crear producto'}
          />
        </Card.Body>
      </Card>
    </section>
  )
}

export default AdminProductoFormView
