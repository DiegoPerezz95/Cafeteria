import { useState } from 'react'
import { Alert, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import UsuarioForm from '../../components/admin/UsuarioForm'
import { actualizarUsuario, crearUsuario, obtenerUsuarioPorId } from '../../data/datos'

// Sirve para /admin/usuarios/nuevo y /admin/usuarios/:id/editar
function AdminUsuarioFormView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const esEdicion = Boolean(id)
  const usuario = esEdicion ? obtenerUsuarioPorId(id) : null

  if (esEdicion && !usuario) {
    return <Alert variant="danger">El usuario no existe.</Alert>
  }

  function guardar(datos) {
    try {
      if (esEdicion) {
        actualizarUsuario(id, datos)
      } else {
        crearUsuario(datos)
      }
      navigate('/admin/usuarios')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section>
      <h1 className="h3 mb-3">{esEdicion ? `Editar: ${usuario.nombre}` : 'Nuevo usuario'}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="shadow-sm">
        <Card.Body>
          <UsuarioForm
            usuarioInicial={usuario || {}}
            esEdicion={esEdicion}
            onGuardar={guardar}
            textoBoton={esEdicion ? 'Guardar cambios' : 'Crear usuario'}
          />
        </Card.Body>
      </Card>
    </section>
  )
}

export default AdminUsuarioFormView
