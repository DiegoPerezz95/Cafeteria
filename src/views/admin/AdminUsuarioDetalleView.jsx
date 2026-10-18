import { Alert, Badge, Button, Card, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { formatearPrecio, obtenerOrdenesPorCorreo, obtenerUsuarioPorId } from '../../data/datos'

function AdminUsuarioDetalleView() {
  const { id } = useParams()
  const usuario = obtenerUsuarioPorId(id)

  if (!usuario) {
    return <Alert variant="danger">El usuario no existe.</Alert>
  }

  const compras = obtenerOrdenesPorCorreo(usuario.correo)

  return (
    <section>
      <h1 className="h3 mb-3">{usuario.nombre} {usuario.apellidos}</h1>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <p className="mb-1"><strong>Correo:</strong> {usuario.correo}</p>
          <p className="mb-1"><strong>Rol:</strong> {usuario.rol}</p>
          <p className="mb-3"><strong>Dirección:</strong> {usuario.calle}, {usuario.comuna}, {usuario.region}</p>
          <Button as={Link} to={`/admin/usuarios/${usuario.id}/editar`} size="sm" variant="primary">Editar usuario</Button>
        </Card.Body>
      </Card>

      <h2 className="h5">Historial de compras</h2>
      {compras.length === 0 ? (
        <Alert variant="secondary">Este usuario todavía no tiene compras.</Alert>
      ) : (
        <Table responsive className="bg-white align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {compras.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.codigo}</td>
                <td>{new Date(orden.fecha).toLocaleDateString('es-CL')}</td>
                <td>{orden.items.reduce((s, i) => s + i.cantidad, 0)}</td>
                <td>{formatearPrecio(orden.total)}</td>
                <td>
                  <Badge bg={orden.estado === 'pagada' ? 'success' : 'danger'}>{orden.estado}</Badge>
                </td>
                <td>
                  <Button as={Link} to={`/admin/ordenes/${orden.id}`} size="sm" variant="outline-dark">Ver boleta</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  )
}

export default AdminUsuarioDetalleView
