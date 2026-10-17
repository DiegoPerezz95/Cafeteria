import { useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import PlatoCard from '../components/PlatoCard'

const platos = [
  {
    id: 1,
    nombre: 'Café latte',
    categoria: 'Bebida caliente',
    descripcion: 'Espresso doble con leche vaporizada.',
    precio: 3200,
  },
  {
    id: 2,
    nombre: 'Frappuccino de vainilla',
    categoria: 'Bebida fría',
    descripcion: 'Café helado batido con crema y vainilla.',
    precio: 3900,
  },
  {
    id: 3,
    nombre: 'Torta de chocolate',
    categoria: 'Pastelería',
    descripcion: 'Porción de torta húmeda de chocolate amargo.',
    precio: 3500,
  },
  {
    id: 4,
    nombre: 'Sándwich de pollo',
    categoria: 'Salado',
    descripcion: 'Pan ciabatta con pollo, palta y tomate.',
    precio: 4500,
  },
]

function MenuView() {
  const [seleccionado, setSeleccionado] = useState(null)

  function seleccionarPlato(plato) {
    setSeleccionado(plato)
    sessionStorage.setItem('platoSeleccionado', JSON.stringify(plato))
  }

  return (
    <section className="view-box view-blue">
      <div className="area-label">Vista: MenuView.jsx</div>

      <h1>Menú</h1>
      <p>
        Esta vista tiene la lista de platos y se la pasa al componente PlatoCard usando props.
      </p>

      {seleccionado && (
        <Alert variant="info">
          Agregaste: <strong>{seleccionado.nombre}</strong>{' '}
          (${seleccionado.precio.toLocaleString('es-CL')}).
          Quedó guardado en sessionStorage.
        </Alert>
      )}

      <Row className="g-3">
        {platos.map((plato) => (
          <Col md={6} lg={3} key={plato.id}>
            <PlatoCard plato={plato} onSeleccionar={seleccionarPlato} />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default MenuView
