import { Button } from 'react-bootstrap'

function PanelReserva({ reserva, ultimaVista, onCancelar }) {
  return (
    <div className="component-box component-purple">
      <div className="area-label">Componente: PanelReserva</div>

      <h4>Datos guardados</h4>

      <p className="mb-1">
        <strong>localStorage:</strong>{' '}
        {reserva
          ? `Reserva a nombre de ${reserva.nombre} para ${reserva.personas} persona(s)`
          : 'Todavía no hay una reserva guardada'}
      </p>

      <p>
        <strong>sessionStorage:</strong>{' '}
        {ultimaVista || 'Todavía no hay una vista registrada'}
      </p>

      <Button variant="outline-danger" onClick={onCancelar}>
        Cancelar reserva
      </Button>
    </div>
  )
}

export default PanelReserva
