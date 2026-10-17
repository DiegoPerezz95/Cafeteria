import ListaProductos from '../components/ListaProductos'
import { obtenerOfertas } from '../data/datos'

function OfertasView() {
  return (
    <section>
      <h1>Ofertas 🔥</h1>
      <p className="text-muted">Productos con precio rebajado por tiempo limitado.</p>
      <ListaProductos productos={obtenerOfertas()} mensajeVacio="Por ahora no hay ofertas." />
    </section>
  )
}

export default OfertasView
