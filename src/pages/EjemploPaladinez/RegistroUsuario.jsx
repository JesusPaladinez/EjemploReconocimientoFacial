import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function RegistroUsuario() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que todos los campos requeridos estén llenos
        if (nombreCompleto.trim() === '' || tipoDocumento.trim() === '' || numeroDocumento.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Guardar los datos en localStorage (opcional, para uso posterior)
        localStorage.setItem('nombreCompleto', nombreCompleto);
        localStorage.setItem('tipoDocumento', tipoDocumento);
        localStorage.setItem('numeroDocumento', numeroDocumento);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        // Redirigir a la página de captura facial
        navigate('/capturaFacial');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Formulario de Registro</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombres y apellidos:</label>
                        <input
                            type="text"
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
                            placeholder="Ingresa tu nombre completo"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Documento:</label>
                        <select
                            value={tipoDocumento}
                            onChange={(e) => setTipoDocumento(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Selecciona el tipo de documento</option>
                            <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                            <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                            <option value="Cédula de extranjería">Cédula de extranjería</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número de Documento:</label>
                        <input
                            type="text"
                            value={numeroDocumento}
                            onChange={(e) => setNumeroDocumento(e.target.value)}
                            placeholder="Ingresa tu número de documento"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Siguiente
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegistroUsuario;
