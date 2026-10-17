import { Col, Form, Row } from 'react-bootstrap'
import { REGIONES } from '../data/datos'

// Dos selects conectados: al cambiar la región, se cargan sus comunas.
// Se usa en el registro y en el checkout.
function SelectorRegionComuna({ region, comuna, onChange, disabled = false }) {
  const comunas = REGIONES[region] || []

  function cambiarRegion(nuevaRegion) {
    // Al cambiar de región, elegimos la primera comuna de esa región
    onChange(nuevaRegion, REGIONES[nuevaRegion][0])
  }

  return (
    <Row className="g-3">
      <Col md={6}>
        <Form.Group controlId="region">
          <Form.Label>Región</Form.Label>
          <Form.Select
            value={region}
            onChange={(e) => cambiarRegion(e.target.value)}
            disabled={disabled}
          >
            {Object.keys(REGIONES).map((nombre) => (
              <option key={nombre} value={nombre}>{nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="comuna">
          <Form.Label>Comuna</Form.Label>
          <Form.Select
            value={comuna}
            onChange={(e) => onChange(region, e.target.value)}
            disabled={disabled}
          >
            {comunas.map((nombre) => (
              <option key={nombre} value={nombre}>{nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  )
}

export default SelectorRegionComuna
