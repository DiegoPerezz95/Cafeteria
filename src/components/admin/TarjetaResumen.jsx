import { Card } from 'react-bootstrap'

function TarjetaResumen({ titulo, valor, detalle, color = 'primary', icono}) {
    return (
        <Card bg={color} text={color === 'warning' ? 'dark' : 'white'} className="h-100 shadow-sm">
            <Card.Body>

                {/* Contenedor que empuja el texto a la izquierda y el icono a la derecha */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        {/* Imprimimos el título en letra pequeña y mayúsculas */}
                        <div className="small text-uppercase">{titulo}</div>
                        
                        {/* Imprimimos el número o valor en letra grande y negrita */}
                        <div className="fs-2 fw-bold">{valor}</div>
                    </div>
                    
                    {/* Imprimimos el emoji al lado derecho */}
                    <span className="fs-1">{icono}</span>
                </div>
                
                {/* TRUCO REACT: Esto significa "SI (&&) el jefe me mandó un detalle, entonces dibuja este div. Si no, ignóralo" */}
                {detalle && <div className="small mt-2">{detalle}</div>}
                
                {/* Aquí adentro pondremos los textos en el siguiente paso */}

            </Card.Body>
        </Card>

    )
}

export default TarjetaResumen
