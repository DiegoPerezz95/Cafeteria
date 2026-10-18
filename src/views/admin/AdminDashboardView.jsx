import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TarjetaResumen from '../../components/admin/TarjetaResumen'
import {
  formatearPrecio,
  obtenerOrdenes,
  obtenerProductos,
  obtenerProductosCriticos,
  obtenerUsuarios,
} from '../../data/datos'

const ACCESOS = [
  { ruta: '/admin/ordenes', icono: '🧾', titulo: 'Órdenes', texto: 'Revisa las compras y sus boletas.' },
  { ruta: '/admin/productos', icono: '☕', titulo: 'Productos', texto: 'Crea, edita y elimina productos.' },
  { ruta: '/admin/categorias', icono: '🏷️', titulo: 'Categorías', texto: 'Organiza el menú por categorías.' },
  { ruta: '/admin/usuarios', icono: '👥', titulo: 'Usuarios', texto: 'Administra cuentas y roles.' },
  { ruta: '/admin/reportes', icono: '📈', titulo: 'Reportes', texto: 'Ventas por producto y categoría.' },
  { ruta: '/admin/perfil', icono: '👤', titulo: 'Perfil', texto: 'Edita tus datos de administrador.' },
]

function AdminDashboardView() {
  const ordenesPagadas = obtenerOrdenes().filter((o) => o.estado === 'pagada')
  const ventas = ordenesPagadas.reduce((suma, o) => suma + o.total, 0)
  const productos = obtenerProductos()
  const stockTotal = productos.reduce((suma, p) => suma + p.stock, 0)
  const usuarios = obtenerUsuarios()

  return (
    <section>
      <h1 className="h3">Dashboard</h1>
      <p className="text-muted">Resumen de la actividad de la tienda.</p>

      <Row xs={1} md={3} className="g-3 mb-4">
        <Col>
          <TarjetaResumen titulo="Compras" valor={ordenesPagadas.length} detalle={`Ventas: ${formatearPrecio(ventas)}`} color="primary" icono="🛒" />
        </Col>
        <Col>
          <TarjetaResumen titulo="Productos" valor={productos.length} detalle={`Stock total: ${stockTotal} · Críticos: ${obtenerProductosCriticos().length}`} color="success" icono="📦" />
        </Col>
        <Col>
          <TarjetaResumen titulo="Usuarios" valor={usuarios.length} detalle={`Clientes: ${usuarios.filter((u) => u.rol === 'cliente').length}`} color="warning" icono="👥" />
        </Col>
      </Row>

      <Row xs={1} sm={2} lg={3} className="g-3">
        {ACCESOS.map((acceso) => (
          <Col key={acceso.ruta}>
            <Card as={Link} to={acceso.ruta} className="h-100 text-center text-decoration-none shadow-sm">
              <Card.Body>
                <div className="fs-2">{acceso.icono}</div>
                <Card.Title>{acceso.titulo}</Card.Title>
                <Card.Text className="text-muted small">{acceso.texto}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default AdminDashboardView
