// =====================================================================
// AuthContext — sesión del usuario (iniciar sesión, registrarse, salir)
// ---------------------------------------------------------------------
// Guarda en localStorage quién inició sesión, para que la sesión siga
// activa aunque se recargue la página. Nunca guardamos la contraseña
// en la sesión.
// =====================================================================
import { createContext, useContext, useState } from 'react'
import { crearUsuario, validarCredenciales } from '../data/datos'

const CLAVE_SESION = 'cafe_sesion'

const AuthContext = createContext(null)

// Copia del usuario sin la contraseña
function sinClave(usuario) {
  const copia = { ...usuario }
  delete copia.clave
  return copia
}

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leerSesion())

  function guardarSesion(datosUsuario) {
    const publico = sinClave(datosUsuario)
    localStorage.setItem(CLAVE_SESION, JSON.stringify(publico))
    setUsuario(publico)
  }

  // Devuelve true si el correo y la clave son correctos
  function iniciarSesion(correo, clave) {
    const encontrado = validarCredenciales(correo, clave)
    if (!encontrado) return false
    guardarSesion(encontrado)
    return true
  }

  // Crea la cuenta y deja la sesión iniciada. Si el correo existe, lanza un error.
  function registrar(datos) {
    const nuevo = crearUsuario({ ...datos, rol: 'cliente' })
    guardarSesion(nuevo)
    return nuevo
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION)
    setUsuario(null)
  }

  // Se usa cuando el usuario edita sus datos (por ejemplo, desde su perfil)
  function actualizarSesion(datosUsuario) {
    guardarSesion(datosUsuario)
  }

  const valor = {
    usuario,
    esAdmin: usuario?.rol === 'admin',
    iniciarSesion,
    registrar,
    cerrarSesion,
    actualizarSesion,
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return contexto
}
