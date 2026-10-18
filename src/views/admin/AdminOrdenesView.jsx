import { Alert, Badge, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatearPrecio, obtenerOrdenes } from '../../data/datos'

function AdminOrdenesView() {
  // Las más nuevas primero
  const ordenes = [...obtenerOrdenes()].reverse()

  return (
    <section>
      <h1 className="h3 mb-3">Órdenes / Boletas</h1>

      {ordenes.length === 0 ? (
        <Alert variant="secondary">Todavía no hay órdenes. Haz una compra desde la tienda para verla aquí.</Alert>
      ) : (
        <Table responsive hover className="bg-white align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Comuna</th>
              <th>Total</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.codigo}</td>
                <td>{new Date(orden.fecha).toLocaleString('es-CL')}</td>
                <td>{orden.cliente.nombre} {orden.cliente.apellidos}</td>
                <td>{orden.direccion.comuna}</td>
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

export default AdminOrdenesView
