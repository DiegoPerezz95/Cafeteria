import { Col, Row } from 'react-bootstrap'
import BaristaCard from '../components/BaristaCard'

const equipo = [
  { id: 1, nombre: 'Valentina', cargo: 'Barista principal', especialidad: 'Latte art', emoji: '👩‍🍳' },
  { id: 2, nombre: 'Matías', cargo: 'Pastelero', especialidad: 'Tortas y kuchenes', emoji: '👨‍🍳' },
  { id: 3, nombre: 'Josefa', cargo: 'Atención al cliente', especialidad: 'Métodos de filtrado', emoji: '🙋‍♀️' },
]

function NosotrosView() {
  return (
    <section>
      <h1>Nosotros</h1>
      <p className="lead">
        Café Aroma nació en 2020 como un pequeño local de barrio. Tostamos nuestro propio
        café y preparamos la pastelería todos los días.
      </p>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <div className="p-4 rounded bg-white shadow-sm h-100">
            <h4>Misión</h4>
            <p className="mb-0">Ofrecer café de calidad en un espacio cálido, a precios justos.</p>
          </div>
        </Col>
        <Col md={6}>
          <div className="p-4 rounded bg-white shadow-sm h-100">
            <h4>Visión</h4>
            <p className="mb-0">Ser la cafetería favorita del barrio y llegar a todo Chile con despacho.</p>
          </div>
        </Col>
      </Row>

      <h2 className="mb-3">Nuestro equipo</h2>
      <Row xs={1} md={3} className="g-3">
        {equipo.map((barista) => (
          <Col key={barista.id}>
            <BaristaCard barista={barista} />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default NosotrosView
