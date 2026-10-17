import { Table } from 'react-bootstrap'
import { formatearPrecio } from '../data/datos'

// Tabla de solo lectura con los productos de una compra.
// Se usa en el checkout, en las vistas de pago y en la boleta del administrador.
function ResumenCompra({ items, total }) {
  return (
    <Table responsive size="sm" className="align-middle">
      <thead>
        <tr>
          <th></th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th className="text-end">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td className="fs-4">{item.emoji}</td>
            <td>{item.nombre}</td>
            <td>{formatearPrecio(item.precio)}</td>
            <td>{item.cantidad}</td>
            <td className="text-end">{formatearPrecio(item.precio * item.cantidad)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={4} className="text-end">Total</th>
          <th className="text-end">{formatearPrecio(total)}</th>
        </tr>
      </tfoot>
    </Table>
  )
}

export default ResumenCompra
