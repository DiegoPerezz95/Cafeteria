import { Button, Carousel, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoriaCard from '../components/CategoriaCard'
import ListaProductos from '../components/ListaProductos'
import { obtenerCategorias, obtenerDestacados } from '../data/datos'

const banners = [
  { emoji: '☕', titulo: 'Café de especialidad', texto: 'Tostado en casa cada semana.' },
  { emoji: '🥧', titulo: ' Nuevo kuchen de frambuesa', texto: 'Míralo en la sección de ofertas.' },
  { emoji: '🧋', titulo: 'Bebidas frías', texto: 'Para los días de calor.' },
]

function HomeView() {
  const categorias = obtenerCategorias()
  const destacados = obtenerDestacados()

  return (
    <>
      <Carousel className="mb-5 banner-cafe">
        {banners.map((banner) => (
          <Carousel.Item key={banner.titulo}>
            <div className="banner-slide">
              <span className="banner-emoji">{banner.emoji}</span>
            </div>
            <Carousel.Caption>
              <h3>{banner.titulo}</h3>
              <p>{banner.texto}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h2 className="text-center mb-3">Categorías</h2>
      <Row xs={2} md={4} className="g-3 mb-5">
        {categorias.map((categoria) => (
          <Col key={categoria.id}>
            <CategoriaCard categoria={categoria} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Destacados</h2>
        <Button as={Link} to="/productos" variant="outline-dark">Ver todos</Button>
      </div>
      <ListaProductos productos={destacados} />
    </>
  )
}

export default HomeView
