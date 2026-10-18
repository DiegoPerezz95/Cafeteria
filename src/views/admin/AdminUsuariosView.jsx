import { useState } from 'react'
import { Badge, Button, ButtonGroup, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { eliminarUsuario, obtenerUsuarios } from '../../data/datos'

function AdminUsuariosView() {
  const { usuario: yo } = useAuth()
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios())

  function eliminar(id) {
    eliminarUsuario(id)
    setUsuarios(obtenerUsuarios())
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Button as={Link} to="/admin/usuarios/nuevo" variant="success">+ Nuevo usuario</Button>
      </div>

      <Table responsive hover className="align-middle bg-white">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Comuna</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre} {u.apellidos}</td>
              <td>{u.correo}</td>
              <td>
                <Badge bg={u.rol === 'admin' ? 'dark' : 'secondary'}>{u.rol}</Badge>
              </td>
              <td>{u.comuna}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button as={Link} to={`/admin/usuarios/${u.id}`} variant="outline-dark">Ver</Button>
                  <Button as={Link} to={`/admin/usuarios/${u.id}/editar`} variant="outline-primary">Editar</Button>
                  <Button
                    variant="outline-danger"
                    disabled={yo?.id === u.id}
                    title={yo?.id === u.id ? 'No puedes eliminar tu propia cuenta' : ''}
                    onClick={() => eliminar(u.id)}
                  >
                    Eliminar
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

export default AdminUsuariosView
