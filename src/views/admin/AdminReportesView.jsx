import { Card, Col, ProgressBar, Row, Table } from 'react-bootstrap'
import TarjetaResumen from '../../components/admin/TarjetaResumen'
import {
  formatearPrecio,
  obtenerCategorias,
  obtenerOrdenes,
  obtenerProductoPorId,
  obtenerProductosCriticos,
} from '../../data/datos'

// Calcula las ventas agrupadas por producto a partir de las órdenes pagadas
export function calcularVentasPorProducto(ordenes) {
  const ventas = {}
  ordenes
    .filter((o) => o.estado === 'pagada')
    .forEach((orden) => {
      orden.items.forEach((item) => {
        if (!ventas[item.id]) {
          ventas[item.id] = { id: item.id, nombre: item.nombre, emoji: item.emoji, unidades: 0, monto: 0 }
        }
        ventas[item.id].unidades += item.cantidad
        ventas[item.id].monto += item.precio * item.cantidad
      })
    })
  return Object.values(ventas).sort((a, b) => b.monto - a.monto)
}

function AdminReportesView() {
  const ordenes = obtenerOrdenes()
  const pagadas = ordenes.filter((o) => o.estado === 'pagada')
  const rechazadas = ordenes.length - pagadas.length
  const totalVentas = pagadas.reduce((suma, o) => suma + o.total, 0)
  const ticketPromedio = pagadas.length ? Math.round(totalVentas / pagadas.length) : 0

  const porProducto = calcularVentasPorProducto(ordenes)

  // Ventas por categoría (usamos la categoría actual de cada producto)
  const porCategoria = obtenerCategorias().map((categoria) => {
    const monto = porProducto
      .filter((v) => obtenerProductoPorId(v.id)?.categoriaId === categoria.id)
      .reduce((suma, v) => suma + v.monto, 0)
    return { ...categoria, monto }
  })

  return (
    <section>
      <h1 className="h3 mb-3">Reportes</h1>

      <Row xs={1} md={4} className="g-3 mb-4">
        <Col><TarjetaResumen titulo="Ventas" valor={formatearPrecio(totalVentas)} color="success" icono="💰" /></Col>
        <Col><TarjetaResumen titulo="Compras pagadas" valor={pagadas.length} color="primary" icono="✅" /></Col>
        <Col><TarjetaResumen titulo="Pagos rechazados" valor={rechazadas} color="danger" icono="❌" /></Col>
        <Col><TarjetaResumen titulo="Ticket promedio" valor={formatearPrecio(ticketPromedio)} color="warning" icono="🧾" /></Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h2 className="h5">Ventas por producto</h2>
              {porProducto.length === 0 ? (
                <p className="text-muted mb-0">Aún no hay ventas.</p>
              ) : (
                <Table size="sm" responsive>
                  <thead>
                    <tr><th>Producto</th><th>Unidades</th><th className="text-end">Monto</th></tr>
                  </thead>
                  <tbody>
                    {porProducto.map((v) => (
                      <tr key={v.id}>
                        <td>{v.emoji} {v.nombre}</td>
                        <td>{v.unidades}</td>
                        <td className="text-end">{formatearPrecio(v.monto)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h2 className="h5">Ventas por categoría</h2>
              {porCategoria.map((c) => (
                <div key={c.id} className="mb-2">
                  <div className="d-flex justify-content-between small">
                    <span>{c.emoji} {c.nombre}</span>
                    <span>{formatearPrecio(c.monto)}</span>
                  </div>
                  <ProgressBar now={totalVentas ? (c.monto / totalVentas) * 100 : 0} variant="success" />
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5">Productos con stock crítico</h2>
              <ul className="mb-0">
                {obtenerProductosCriticos().map((p) => (
                  <li key={p.id}>{p.nombre}: {p.stock} unidades</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default AdminReportesView
