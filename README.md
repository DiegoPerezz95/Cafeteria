# ☕ Café Aroma — Tienda online en React + Vite

Proyecto de la Evaluación Parcial 2 (DSY1104). Es la tienda online de la cafetería **Café Aroma**,
con una parte pública para clientes y un panel de administración.

## Tecnologías

- **React 19 + Vite**
- **React Router**: navegación entre páginas
- **React Bootstrap**: diseño responsive (celular, tablet y escritorio)
- **localStorage**: persistencia de datos (simula una base de datos)
- **Vitest + Testing Library**: pruebas unitarias y cobertura

## Cómo ejecutar

```bash
npm install
npm run dev
```

En EC2:

```bash
npm run dev -- --host 0.0.0.0
```

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@cafearoma.cl | admin123 |
| Cliente | cliente@cafearoma.cl | cliente123 |

## Vistas

### Tienda (pública)

| Ruta | Vista |
|---|---|
| `/` | Inicio: carrusel, categorías y productos destacados |
| `/productos` | Catálogo con búsqueda, filtro por categoría y orden por precio |
| `/productos/:id` | Detalle de producto |
| `/categorias` y `/categorias/:id` | Productos separados por categoría |
| `/ofertas` | Productos en oferta |
| `/nosotros` | Historia y equipo |
| `/blog` y `/blog/:id` | Blog y detalle de cada publicación |
| `/contacto` | Formulario de contacto |
| `/registro` | Crear cuenta |
| `/login` | Iniciar sesión |
| `/carrito` | Carrito de compras |
| `/checkout` | Datos del cliente y dirección de entrega |
| `/pago-exitoso/:id` | Compra realizada |
| `/pago-error/:id` | Pago rechazado |

### Administrador (requiere iniciar sesión como admin)

| Ruta | Vista |
|---|---|
| `/admin` | Dashboard |
| `/admin/ordenes` y `/admin/ordenes/:id` | Órdenes y boleta |
| `/admin/productos` | Listado, crear, ver, editar y eliminar productos |
| `/admin/productos/criticos` | Productos con stock crítico |
| `/admin/categorias` | Crear, editar y eliminar categorías |
| `/admin/usuarios` | Listado, crear, ver, editar y eliminar usuarios + historial de compras |
| `/admin/reportes` | Ventas por producto y por categoría |
| `/admin/perfil` | Perfil del administrador |

## Estructura

```text
src/
├── data/datos.js           # "Base de datos" simulada + funciones CRUD
├── context/
│   ├── CarritoContext.jsx  # Estado global del carrito
│   └── AuthContext.jsx     # Sesión del usuario
├── components/             # Componentes reutilizables (tarjetas, formularios, layout)
│   └── admin/              # Componentes del panel de administración
├── views/                  # Una vista por página de la tienda
│   └── admin/              # Vistas del panel de administración
├── tests/                  # Pruebas unitarias con Vitest
├── App.jsx                 # Rutas
└── main.jsx                # Punto de entrada
```

## Pruebas

```bash
npm test            # modo observador
npm run test:run    # una sola vez
npm run coverage    # reporte de cobertura (carpeta coverage/)
```

Las pruebas cubren:

- **Renderizado**: listas de productos, carrito, historial de compras.
- **Renderizado condicional**: mensajes de error en login y formularios, aviso de carrito vacío,
  acceso denegado al panel, campo de precio de oferta.
- **Props**: `ProductoCard` y `ProductoForm` reciben datos y funciones (`vi.fn()`).
- **Estado**: formularios que cambian al escribir, cantidades del carrito.
- **Eventos**: clics en botones (añadir, eliminar, pagar) y envío de formularios.
- **Lógica CRUD**: crear, leer, actualizar y eliminar en `datos.js`.
