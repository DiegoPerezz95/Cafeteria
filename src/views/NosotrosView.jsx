import { Col, Row } from 'react-bootstrap'
import BaristaCard from '../components/BaristaCard'

const equipo = [
  { id: 1, nombre: 'Valentina', cargo: 'Barista principal', especialidad: 'Latte art', emoji: '👩‍🍳' },
  { id: 2, nombre: 'Matías', cargo: 'Pastelero', especialidad: 'Tortas y kuchenes', emoji: '👨‍🍳' },
  { id: 3, nombre: 'Josefa', cargo: 'Atención al cliente', especialidad: 'Métodos de filtrado', emoji: '🙋‍♀️' },
]

function NosotrosView() {
  return (
    <section className="view-box view-green">
      <div className="area-label">Vista: NosotrosView.jsx</div>

      <h1>Nosotros</h1>
      <p>
        Café Aroma nació en 2020 como un pequeño local de barrio. Tostamos nuestro propio
        café y preparamos la pastelería todos los días.
      </p>

      <h4 className="mt-4">Nuestro equipo</h4>
      <Row className="g-3">
        {equipo.map((barista) => (
          <Col md={4} key={barista.id}>
            <BaristaCard barista={barista} />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default NosotrosView
