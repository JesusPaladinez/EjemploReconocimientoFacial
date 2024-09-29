import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const InicioSesionFacial = () => {
    const [loginStatus, setLoginStatus] = useState(null); // Estado del inicio de sesión
    const [isUserIdentified, setIsUserIdentified] = useState(false); // Indica si el usuario ha sido identificado
    const webcamRef = useRef(null); // Referencia a la cámara
    const navigate = useNavigate(); // Hook para la navegación

    // Configuraciones de la cámara
    const videoConstraints = {
        width: 480,
        height: 360,
        facingMode: "user" // Usar la cámara frontal
    };

    // Función para capturar la imagen desde la cámara y enviar al backend
    const captureAndLogin = async () => {
        // Capturar la imagen en formato base64
        const imageSrc = webcamRef.current.getScreenshot();

        if (!imageSrc) return;

        try {
            // Convertir la imagen base64 en un archivo Blob
            const blob = await fetch(imageSrc).then(res => res.blob());

            const formData = new FormData();
            formData.append('face_login', blob, 'face_login.png');

            // Enviar la imagen al backend
            const response = await axios.post('https://backendsenauthenticator.up.railway.app/api/inicio-sesion-facial/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Manejar la respuesta del backend
            if (response.data.matching) {
                setLoginStatus(`Usuario identificado: ${response.data.user_name}`);
                setIsUserIdentified(true); // Usuario identificado correctamente
            } else {
                setLoginStatus(response.data.message || 'Usuario no encontrado');
                setIsUserIdentified(false); // No identificado
            }
        } catch (error) {
            setLoginStatus('Error al intentar iniciar sesión. Inténtalo de nuevo.');
            setIsUserIdentified(false); // Error al intentar la identificación
        }
    };

    // Usar useEffect para iniciar la captura y reconocimiento automáticamente al cargar
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isUserIdentified) {
                captureAndLogin();
            }
        }, 3000); // Intentar cada 3 segundos

        // Limpiar intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [isUserIdentified]);

    // Función para redirigir al home
    const handleAccept = () => {
        navigate('/'); // Redirige a la ruta del Home
    };

    return (
        <div>
            <h1>Inicio de Sesión Facial</h1>
            <Webcam
                audio={false}
                height={360}
                ref={webcamRef}
                screenshotFormat="image/png"
                width={480}
                videoConstraints={videoConstraints}
            />

            {loginStatus && (
                <div>
                    <h3>{loginStatus}</h3>
                    {isUserIdentified && (
                        <button onClick={handleAccept}>Aceptar</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default InicioSesionFacial;
