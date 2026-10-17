// =====================================================================
// datos.js — "Base de datos" simulada de Café Aroma
// ---------------------------------------------------------------------
// Aquí están los datos iniciales de la tienda y las funciones CRUD
// (Crear, Leer, Actualizar, Eliminar) para cada tipo de dato.
// Todo se guarda en localStorage, así los cambios no se pierden al
// recargar la página. La primera vez se cargan los datos iniciales.
// =====================================================================

// ---------- Datos iniciales ----------

const CATEGORIAS_INICIALES = [
  { id: 1, nombre: 'Cafés calientes', emoji: '☕', descripcion: 'Espressos, lattes y cafés de filtro.' },
  { id: 2, nombre: 'Bebidas frías', emoji: '🧋', descripcion: 'Frappés, cold brew y bebidas heladas.' },
  { id: 3, nombre: 'Pastelería', emoji: '🍰', descripcion: 'Tortas, kuchenes y galletas caseras.' },
  { id: 4, nombre: 'Salados', emoji: '🥪', descripcion: 'Sándwiches y empanadas para acompañar.' },
]

const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Espresso', categoriaId: 1, emoji: '☕', precio: 2200, stock: 50, oferta: false, precioOferta: 0, destacado: true, descripcion: 'Shot intenso de café de especialidad tostado en casa.' },
  { id: 2, nombre: 'Café latte', categoriaId: 1, emoji: '🥛', precio: 3200, stock: 40, oferta: true, precioOferta: 2700, destacado: true, descripcion: 'Espresso doble con leche vaporizada y suave espuma.' },
  { id: 3, nombre: 'Cappuccino', categoriaId: 1, emoji: '☕', precio: 3300, stock: 4, oferta: false, precioOferta: 0, destacado: false, descripcion: 'Espresso, leche y mucha espuma con canela.' },
  { id: 4, nombre: 'Mocaccino', categoriaId: 1, emoji: '🍫', precio: 3600, stock: 25, oferta: false, precioOferta: 0, destacado: false, descripcion: 'Café con chocolate amargo y crema.' },
  { id: 5, nombre: 'Frappé de vainilla', categoriaId: 2, emoji: '🧋', precio: 3900, stock: 30, oferta: true, precioOferta: 3300, destacado: true, descripcion: 'Café helado batido con helado de vainilla.' },
  { id: 6, nombre: 'Cold brew', categoriaId: 2, emoji: '🧊', precio: 3500, stock: 3, oferta: false, precioOferta: 0, destacado: false, descripcion: 'Café infusionado en frío durante 18 horas.' },
  { id: 7, nombre: 'Torta de chocolate', categoriaId: 3, emoji: '🍰', precio: 3500, stock: 12, oferta: false, precioOferta: 0, destacado: true, descripcion: 'Porción de torta húmeda de chocolate amargo.' },
  { id: 8, nombre: 'Kuchen de frambuesa', categoriaId: 3, emoji: '🥧', precio: 3000, stock: 10, oferta: true, precioOferta: 2500, destacado: false, descripcion: 'Kuchen sureño con frambuesas frescas.' },
  { id: 9, nombre: 'Sándwich de pollo', categoriaId: 4, emoji: '🥪', precio: 4500, stock: 15, oferta: false, precioOferta: 0, destacado: false, descripcion: 'Pan ciabatta con pollo, palta y tomate.' },
  { id: 10, nombre: 'Empanada de queso', categoriaId: 4, emoji: '🥟', precio: 2000, stock: 2, oferta: true, precioOferta: 1600, destacado: false, descripcion: 'Empanada horneada rellena de queso derretido.' },
]

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Admin', apellidos: 'Café Aroma', correo: 'admin@cafearoma.cl', clave: 'admin123', rol: 'admin', calle: 'Av. Siempre Viva 123', region: 'Región Metropolitana', comuna: 'Santiago' },
  { id: 2, nombre: 'Camila', apellidos: 'Rojas', correo: 'cliente@cafearoma.cl', clave: 'cliente123', rol: 'cliente', calle: 'Los Aromos 456', region: 'Región Metropolitana', comuna: 'Maipú' },
]

const BLOGS = [
  {
    id: 1,
    titulo: 'Cómo preparar un buen café en casa',
    autor: 'Valentina, barista',
    fecha: '2026-09-15',
    emoji: '☕',
    resumen: 'Cinco consejos simples para que tu café de la mañana quede como el de la cafetería.',
    contenido: [
      'Usa café recién molido: el café molido pierde aroma en pocos días.',
      'Respeta la proporción: una buena base es 1 gramo de café por cada 15 ml de agua.',
      'El agua no debe hervir: lo ideal es entre 90 y 96 grados.',
      'Limpia tu cafetera seguido para que no queden sabores amargos.',
      'Prueba distintos métodos: prensa francesa, V60 o moka italiana.',
    ],
  },
  {
    id: 2,
    titulo: 'Nuestro nuevo kuchen de frambuesa',
    autor: 'Matías, pastelero',
    fecha: '2026-10-01',
    emoji: '🥧',
    resumen: 'La receta del sur que llegó a Café Aroma para quedarse.',
    contenido: [
      'El kuchen es una tradición del sur de Chile que llegó con los colonos alemanes.',
      'Nuestra versión usa frambuesas frescas y una masa suave hecha cada mañana.',
      'Durante octubre lo encuentras en la sección de Ofertas.',
    ],
  },
]

// Regiones y comunas para los formularios de dirección
export const REGIONES = {
  'Región Metropolitana': ['Santiago', 'Maipú', 'Providencia', 'Ñuñoa', 'Las Condes', 'Puente Alto', 'Cerrillos'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán'],
}

// Stock igual o menor a este número se considera "crítico"
export const STOCK_CRITICO = 5

// ---------- Funciones de apoyo (privadas) ----------

const CLAVES = {
  productos: 'cafe_productos',
  categorias: 'cafe_categorias',
  usuarios: 'cafe_usuarios',
  ordenes: 'cafe_ordenes',
}

function copiar(valor) {
  return JSON.parse(JSON.stringify(valor))
}

// Lee una lista desde localStorage. Si no existe, guarda los datos iniciales.
function leer(clave, datosIniciales) {
  const texto = localStorage.getItem(clave)
  if (texto) {
    try {
      return JSON.parse(texto)
    } catch {
      // Si el texto está dañado, volvemos a los datos iniciales
    }
  }
  localStorage.setItem(clave, JSON.stringify(datosIniciales))
  return copiar(datosIniciales)
}

function guardar(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista))
}

function siguienteId(lista) {
  return lista.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

// ---------- Utilidades públicas ----------

// Precio que paga el cliente (considera la oferta)
export function precioFinal(producto) {
  return producto.oferta && producto.precioOferta > 0 ? producto.precioOferta : producto.precio
}

// 3500 -> "$3.500"
export function formatearPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CL')
}

// ---------- CRUD Productos ----------

export function obtenerProductos() {
  return leer(CLAVES.productos, PRODUCTOS_INICIALES)
}

export function obtenerProductoPorId(id) {
  return obtenerProductos().find((p) => p.id === Number(id)) || null
}

export function obtenerProductosPorCategoria(categoriaId) {
  return obtenerProductos().filter((p) => p.categoriaId === Number(categoriaId))
}

export function obtenerOfertas() {
  return obtenerProductos().filter((p) => p.oferta)
}

export function obtenerDestacados() {
  return obtenerProductos().filter((p) => p.destacado)
}

export function obtenerProductosCriticos() {
  return obtenerProductos().filter((p) => p.stock <= STOCK_CRITICO)
}

// Busca por nombre o descripción, sin importar mayúsculas
export function buscarProductos(texto) {
  const busqueda = texto.trim().toLowerCase()
  if (!busqueda) return obtenerProductos()
  return obtenerProductos().filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda) ||
      p.descripcion.toLowerCase().includes(busqueda)
  )
}

export function crearProducto(datos) {
  const productos = obtenerProductos()
  const nuevo = {
    oferta: false,
    precioOferta: 0,
    destacado: false,
    emoji: '☕',
    ...datos,
    id: siguienteId(productos),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    categoriaId: Number(datos.categoriaId),
  }
  productos.push(nuevo)
  guardar(CLAVES.productos, productos)
  return nuevo
}

export function actualizarProducto(id, cambios) {
  const productos = obtenerProductos()
  const indice = productos.findIndex((p) => p.id === Number(id))
  if (indice === -1) return null

  const actualizado = { ...productos[indice], ...cambios, id: Number(id) }
  actualizado.precio = Number(actualizado.precio)
  actualizado.stock = Number(actualizado.stock)
  actualizado.categoriaId = Number(actualizado.categoriaId)
  actualizado.precioOferta = Number(actualizado.precioOferta || 0)

  productos[indice] = actualizado
  guardar(CLAVES.productos, productos)
  return actualizado
}

export function eliminarProducto(id) {
  const productos = obtenerProductos()
  const filtrados = productos.filter((p) => p.id !== Number(id))
  guardar(CLAVES.productos, filtrados)
  return filtrados.length < productos.length
}

// Resta del stock lo que se vendió (se usa al confirmar una compra)
export function descontarStock(items) {
  const productos = obtenerProductos()
  items.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id)
    if (producto) {
      producto.stock = Math.max(0, producto.stock - item.cantidad)
    }
  })
  guardar(CLAVES.productos, productos)
}

// ---------- CRUD Categorías ----------

export function obtenerCategorias() {
  return leer(CLAVES.categorias, CATEGORIAS_INICIALES)
}

export function obtenerCategoriaPorId(id) {
  return obtenerCategorias().find((c) => c.id === Number(id)) || null
}

export function crearCategoria(datos) {
  const categorias = obtenerCategorias()
  const nueva = { emoji: '☕', descripcion: '', ...datos, id: siguienteId(categorias) }
  categorias.push(nueva)
  guardar(CLAVES.categorias, categorias)
  return nueva
}

export function actualizarCategoria(id, cambios) {
  const categorias = obtenerCategorias()
  const indice = categorias.findIndex((c) => c.id === Number(id))
  if (indice === -1) return null
  categorias[indice] = { ...categorias[indice], ...cambios, id: Number(id) }
  guardar(CLAVES.categorias, categorias)
  return categorias[indice]
}

export function eliminarCategoria(id) {
  const categorias = obtenerCategorias()
  const filtradas = categorias.filter((c) => c.id !== Number(id))
  guardar(CLAVES.categorias, filtradas)
  return filtradas.length < categorias.length
}

// ---------- CRUD Usuarios ----------

export function obtenerUsuarios() {
  return leer(CLAVES.usuarios, USUARIOS_INICIALES)
}

export function obtenerUsuarioPorId(id) {
  return obtenerUsuarios().find((u) => u.id === Number(id)) || null
}

export function buscarUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase()
  return obtenerUsuarios().find((u) => u.correo.toLowerCase() === buscado) || null
}

// Lanza un error si el correo ya está registrado
export function crearUsuario(datos) {
  if (buscarUsuarioPorCorreo(datos.correo)) {
    throw new Error('Ya existe un usuario con ese correo')
  }
  const usuarios = obtenerUsuarios()
  const nuevo = { rol: 'cliente', ...datos, correo: datos.correo.trim(), id: siguienteId(usuarios) }
  usuarios.push(nuevo)
  guardar(CLAVES.usuarios, usuarios)
  return nuevo
}

export function actualizarUsuario(id, cambios) {
  const usuarios = obtenerUsuarios()
  const indice = usuarios.findIndex((u) => u.id === Number(id))
  if (indice === -1) return null
  usuarios[indice] = { ...usuarios[indice], ...cambios, id: Number(id) }
  guardar(CLAVES.usuarios, usuarios)
  return usuarios[indice]
}

export function eliminarUsuario(id) {
  const usuarios = obtenerUsuarios()
  const filtrados = usuarios.filter((u) => u.id !== Number(id))
  guardar(CLAVES.usuarios, filtrados)
  return filtrados.length < usuarios.length
}

// Devuelve el usuario si el correo y la clave son correctos; si no, null
export function validarCredenciales(correo, clave) {
  const usuario = buscarUsuarioPorCorreo(correo)
  if (usuario && usuario.clave === clave) return usuario
  return null
}

// ---------- Órdenes (compras) ----------

export function obtenerOrdenes() {
  return leer(CLAVES.ordenes, [])
}

export function obtenerOrdenPorId(id) {
  return obtenerOrdenes().find((o) => o.id === Number(id)) || null
}

export function obtenerOrdenesPorCorreo(correo) {
  const buscado = correo.toLowerCase()
  return obtenerOrdenes().filter((o) => o.cliente.correo.toLowerCase() === buscado)
}

// datos = { cliente, direccion, items, total, estado: 'pagada' | 'rechazada' }
export function crearOrden(datos) {
  const ordenes = obtenerOrdenes()
  const id = siguienteId(ordenes)
  const nueva = {
    ...datos,
    id,
    codigo: 'ORD-' + String(id).padStart(5, '0'),
    fecha: new Date().toISOString(),
  }
  ordenes.push(nueva)
  guardar(CLAVES.ordenes, ordenes)
  return nueva
}

// ---------- Blog (solo lectura) ----------

export function obtenerBlogs() {
  return copiar(BLOGS)
}

export function obtenerBlogPorId(id) {
  return obtenerBlogs().find((b) => b.id === Number(id)) || null
}
