import { Alert, Col, Row } from 'react-bootstrap'
import ContadorTazas from '../components/ContadorTazas'

function HomeView() {
  return (
    <section className="view-box view-green">
      <div className="area-label">Vista: HomeView.jsx</div>

      <h1>Bienvenidos a Café Aroma</h1>
      <p>Café de especialidad, pastelería casera y un lugar tranquilo para estudiar.</p>

      <Alert variant="success">
        Revisa nuestro menú y reserva tu mesa desde la página de Reserva.
      </Alert>

      <Row className="g-3">
        <Col md={7}>
          <div className="component-box component-green">
            <div className="area-label">Componente visual dentro de la vista</div>
            <h4>Horario de atención</h4>
            <ul className="mb-0">
              <li>Lunes a viernes: 08:00 a 20:00</li>
              <li>Sábado: 09:00 a 18:00</li>
              <li>Domingo: 10:00 a 14:00</li>
              <li>Wifi gratis para clientes</li>
              <li>Opciones sin lactosa y veganas</li>
            </ul>
          </div>
        </Col>

        <Col md={5}>
          <ContadorTazas />
        </Col>
      </Row>
    </section>
  )
}

export default HomeView
