# Café Aroma — React + Vite

Aplicación de una cafetería hecha con React y Vite, basada en la estructura del proyecto de las 6 clases.

Incluye React Bootstrap, React Router, componentes reutilizables con props, state con `useState`,
`useEffect`, formularios controlados, localStorage, sessionStorage y pruebas unitarias con Vitest.

## Ejecutar

```bash
npm install
npm run dev
```

En EC2:

```bash
npm run dev -- --host 0.0.0.0
```

## Páginas

| Ruta | Vista | Qué muestra |
|---|---|---|
| `/` | `HomeView` | Bienvenida, horario y contador de tazas |
| `/menu` | `MenuView` | Menú de la cafetería con tarjetas `PlatoCard` |
| `/reserva` | `ReservaView` | Formulario de reserva guardado en localStorage |
| `/nosotros` | `NosotrosView` | Historia del local y tarjetas del equipo (`BaristaCard`) |
| `/contacto` | `ContactoView` | Formulario de contacto que guarda una lista de mensajes |

## Estructura

```text
src/
├── components/
│   ├── AppNavbar.jsx
│   ├── BaristaCard.jsx
│   ├── ContadorTazas.jsx
│   ├── PanelReserva.jsx
│   └── PlatoCard.jsx
├── views/
│   ├── ContactoView.jsx
│   ├── HomeView.jsx
│   ├── MenuView.jsx
│   ├── NosotrosView.jsx
│   └── ReservaView.jsx
├── tests/
│   ├── setup.js
│   ├── ContactoView.test.jsx
│   ├── ContadorTazas.test.jsx
│   ├── NosotrosView.test.jsx
│   ├── PlatoCard.test.jsx
│   └── ReservaView.test.jsx
├── App.jsx
├── main.jsx
└── styles.css
```

## Pruebas incluidas con Vitest

- `ContadorTazas.test.jsx`: estado inicial, sumar una taza y que no baje de cero.
- `PlatoCard.test.jsx`: props y callback simulado con `vi.fn()`.
- `ReservaView.test.jsx`: guardar la reserva en `localStorage` y cancelarla.
- `NosotrosView.test.jsx`: una tarjeta por cada integrante (lista con `.map()`).
- `ContactoView.test.jsx`: enviar un mensaje y guardarlo en una lista en `localStorage`.

```bash
npm test
npm run test:run
npm run coverage
```
