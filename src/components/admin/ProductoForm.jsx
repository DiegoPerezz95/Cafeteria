import { useState } from "react";
import { Form, Button } from "react-bootstrap"; // Dejamos solo esta línea
import { obtenerCategorias } from '../../data/datos'; // <-- AGREGA ESTO

function ProductoForm(props) {
    const [formulario, setFormulario] = useState({
        nombre: '',
        precio: '',
        categoriaId:'',
        stock:'',
        ...props.productoInicial
    })

    // NUEVA MEMORIA PARA ERRORES:
    const [errores, setErrores] = useState({})
    //
    const categorias = obtenerCategorias()

    // FUNCIÓN 1: Solo para cuando el usuario teclea
    function cambiarTexto(event){
        const { name, value } = event.target
        setFormulario({
            ...formulario, 
            [name]: value  
        })
    }

    // FUNCIÓN 2: NUEVA - Solo para cuando el usuario presiona el botón "Guardar"
    function enviarFormulario(event) {
        event.preventDefault()
        
        // 1. Creamos una libreta temporal de errores
        const encontrados = {}
        
        // 2. Revisamos las reglas
        if (formulario.nombre.trim() === '') {
            encontrados.nombre = 'El nombre no puede estar vacío'
        }
        if (Number(formulario.precio) <= 0) {
            encontrados.precio = 'El precio debe ser mayor a 0'
        }

        // 3. Guardamos los errores en nuestra memoria para que la pantalla los muestre
        setErrores(encontrados)

        // 4. Si encontramos algún error, detenemos la función aquí mismo con "return"
        if (Object.keys(encontrados).length > 0) {
            return 
        }

        // 5. Si pasamos todas las pruebas, llamamos al jefe
        props.onGuardar(formulario) 
    }

    return(
        <Form onSubmit={enviarFormulario} className="p-4 bg-white rounded text-dark">
            <h2> Creando formulario </h2> 

            <Form.Group className="mb-3">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={cambiarTexto}
                    placeholder="Escribe un nombre"
                    isInvalid={!!errores.nombre} // <-- Pone el borde rojo si hay error
                />
                <Form.Control.Feedback type="invalid">
                    {errores.nombre} {/* <-- Muestra el mensaje de error */}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    name="precio"
                    value={formulario.precio}
                    onChange={cambiarTexto}
                    placeholder="Escribe el precio"
                    isInvalid={!!errores.precio} // <-- Pone el borde rojo si hay error
                />
                <Form.Control.Feedback type="invalid">
                    {errores.precio} {/* <-- Muestra el mensaje de error */}
                </Form.Control.Feedback>
            </Form.Group>
            

            <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                    name="categoriaId"
                    value={formulario.categoriaId}
                    onChange={cambiarTexto}
                >
                    <option value="">Selecciona...</option>
                    {categorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                    type="number"
                    name="stock"
                    value={formulario.stock}
                    onChange={cambiarTexto}
                    placeholder="Escribe el stock"
                />
            </Form.Group>

            <p>Producto: <strong className="text-primary">{formulario.nombre}</strong></p>
            <p>Precio: <strong className="text-success">${formulario.precio}</strong></p>
            <p>CategoriaId: <strong className="text-success">{formulario.categoriaId}</strong></p>
            <p>Stock: <strong className="text-success">{formulario.stock}</strong></p>

            <Button type="submit" variant="success" className="mt-3">
                Guardar Producto
            </Button>
        </Form>
    )
}

export default ProductoForm