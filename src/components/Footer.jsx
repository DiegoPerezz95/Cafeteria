import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer-cafe py-3 mt-auto">
      <Container className="d-flex flex-column flex-md-row justify-content-between gap-2">
        <span>☕ Café Aroma — Av. Siempre Viva 123, Santiago</span>
        <span>Lunes a sábado de 08:00 a 20:00</span>
      </Container>
    </footer>
  )
}

export default Footer
