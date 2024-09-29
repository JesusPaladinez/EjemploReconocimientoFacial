import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function CapturaFacial() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [mostrarBotonAceptar, setMostrarBotonAceptar] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        startCamera();

        const captureTimeout = setTimeout(() => {
            captureImage();
        }, 5000);

        return () => {
            stopCamera();
            clearTimeout(captureTimeout);
        };
    }, []);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                streamRef.current = stream;
                videoRef.current.srcObject = stream;

                // Añadir el evento para asegurar que el video se reproduzca después de cargar los metadatos
                videoRef.current.addEventListener('loadedmetadata', () => {
                    videoRef.current.play().catch(err => {
                        console.error("Error al intentar reproducir el video:", err);
                    });
                });
            })
            .catch(err => {
                console.error("Error al acceder a la cámara: ", err);
            });
    };


    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = 640;
            canvasRef.current.height = 480;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            canvasRef.current.toBlob((blob) => {
                const newFile = new File([blob], "face.jpg", { type: 'image/jpeg' });
                setFile(newFile);
                submitData(newFile); // Enviar la imagen capturada
            }, 'image/jpeg');
        }
    };

    const submitData = async (capturedFile) => {
        const nombreCompleto = localStorage.getItem('nombreCompleto');
        const tipoDocumento = localStorage.getItem('tipoDocumento');
        const numeroDocumento = localStorage.getItem('numeroDocumento');
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (!capturedFile || !nombreCompleto || !tipoDocumento || !numeroDocumento || !email || !password) {
            setError("Faltan datos. No se puede registrar.");
            return;
        }

        const formData = new FormData();
        formData.append('first_name', nombreCompleto);
        formData.append('tipo_documento_usuario', tipoDocumento);
        formData.append('numero_documento_usuario', numeroDocumento);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('face_register', capturedFile);

        try {
            // Agrega los headers que el backend espera, incluyendo autenticación si es necesario
            const token = localStorage.getItem('token'); // Suponiendo que guardas un token JWT
            const response = await axios.post('https://backendsenauthenticator.up.railway.app/api/usuarios/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,  // Agrega el token de autenticación si es necesario
                },
            }); 

            // Mostrar mensaje de éxito y el botón de aceptar después de 2 segundos
            setRegistroExitoso(true);
            setTimeout(() => {
                setMostrarBotonAceptar(true);
            }, 2000);
        } catch (err) {
            console.error("Error al enviar los datos:", err.response?.data || err.message);
            setError(err.response?.data || { message: err.message }); // Modificado para almacenar solo el mensaje
        }
    };

    const handleAceptar = () => {
        navigate('/'); // Redirigir al home
    };

    return (
        <div>
            <h2>Captura Facial</h2>
            <div>
                <video ref={videoRef} style={{ width: '320px', height: '240px' }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
            </div>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>} {/* Modificado para mostrar solo el mensaje de error */}

            {registroExitoso && <p>Registro exitoso. ¡Gracias por registrarte!</p>}

            {mostrarBotonAceptar && (
                <button onClick={handleAceptar}>
                    Aceptar
                </button>
            )}
        </div>
    );
}

export default CapturaFacial;
