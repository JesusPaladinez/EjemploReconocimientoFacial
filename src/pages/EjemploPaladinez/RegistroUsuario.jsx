import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroUsuario() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombreCompleto.trim() === '' || numeroDocumento.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Guardar los datos en localStorage
        localStorage.setItem('nombreCompleto', nombreCompleto);
        localStorage.setItem('numeroDocumento', numeroDocumento);

        // Redirigir a la página de captura facial
        navigate('/capturaFacial');
    };

    return (
        <div>
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Completo:
                    <input
                        type="text"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        placeholder="Ingresa tu nombre completo"
                    />
                </label>
                <br />
                <label>
                    Número de Documento:
                    <input
                        type="text"
                        value={numeroDocumento}
                        onChange={(e) => setNumeroDocumento(e.target.value)}
                        placeholder="Ingresa tu número de documento"
                    />
                </label>
                <br />
                <button type="submit">Siguiente</button>
            </form>
        </div>
    );
}

export default RegistroUsuario;
