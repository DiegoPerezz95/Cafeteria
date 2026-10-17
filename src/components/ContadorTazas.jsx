import { useState } from 'react'
import { Button } from 'react-bootstrap'

function ContadorTazas() {
  const [tazas, setTazas] = useState(0)

  function agregarTaza() {
    setTazas(tazas + 1)
  }

  function quitarTaza() {
    // No dejamos que el contador baje de cero
    if (tazas > 0) {
      setTazas(tazas - 1)
    }
  }

  return (
    <div className="component-box component-orange">
      <div className="area-label">Componente: ContadorTazas</div>

      <h4>Tazas de hoy</h4>
      <p>Tazas: {tazas}</p>

      <div className="d-flex gap-2">
        <Button variant="warning" onClick={agregarTaza}>
          Agregar taza
        </Button>
        <Button variant="outline-secondary" onClick={quitarTaza}>
          Quitar taza
        </Button>
      </div>
    </div>
  )
}

export default ContadorTazas
