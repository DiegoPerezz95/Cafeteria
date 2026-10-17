// =====================================================================
// CarritoContext — estado global del carrito de compras
// ---------------------------------------------------------------------
// Un "Context" permite compartir datos entre muchos componentes sin
// pasarlos por props uno por uno. Aquí guardamos el carrito para que
// el Navbar (que muestra el total) y las vistas de productos y compra
// usen la misma información. El carrito se guarda en localStorage.
// =====================================================================
import { createContext, useContext, useEffect, useState } from 'react'
import { precioFinal } from '../data/datos'

const CLAVE_CARRITO = 'cafe_carrito'

const CarritoContext = createContext(null)

function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  // La función dentro de useState se ejecuta solo la primera vez
  const [items, setItems] = useState(() => leerCarrito())

  // Cada vez que cambia el carrito, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items))
  }, [items])

  function agregarAlCarrito(producto, cantidad = 1) {
    setItems((actuales) => {
      const existente = actuales.find((item) => item.id === producto.id)

      if (existente) {
        // Si ya está en el carrito, solo sumamos la cantidad (sin pasar el stock)
        return actuales.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: Math.min(item.cantidad + cantidad, producto.stock) }
            : item
        )
      }

      return [
        ...actuales,
        {
          id: producto.id,
          nombre: producto.nombre,
          emoji: producto.emoji,
          precio: precioFinal(producto),
          stock: producto.stock,
          cantidad: Math.min(cantidad, producto.stock),
        },
      ]
    })
  }

  function cambiarCantidad(id, cantidad) {
    setItems((actuales) =>
      actuales
        .map((item) =>
          item.id === id ? { ...item, cantidad: Math.min(cantidad, item.stock) } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  function eliminarDelCarrito(id) {
    setItems((actuales) => actuales.filter((item) => item.id !== id))
  }

  function vaciarCarrito() {
    setItems([])
  }

  // Valores calculados a partir del estado
  const totalProductos = items.reduce((suma, item) => suma + item.cantidad, 0)
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  const valor = {
    items,
    totalProductos,
    total,
    agregarAlCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

// Hook para usar el carrito desde cualquier componente
export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  }
  return contexto
}
