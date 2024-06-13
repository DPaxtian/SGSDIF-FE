import React, { useState } from 'react';
import '../../Login.css';
import difLogo from '../../assets/img/dif_logo.png';
import logoAyuntamiento from '../../assets/img/logoAyuntamiento.png';
import iconoUser from '../../assets/img/usuario.png';
import iconoContrasenia from '../../assets/img/contrasenia.png';
import { BiFontSize } from 'react-icons/bi';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Login({ onLoginSuccess }) {
    const toast = useToast()
    const [showPlaceholder, setShowPlaceholder] = useState({ nombre_usuario: true, contrasena: true });
    const [credentials, setCredentials] = useState({ nombre_usuario: '', contrasena: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = `${import.meta.env.VITE_APP_API_URL_LOGIN}`;

        try {
            const response = await axios.post(apiUrl, credentials);

            if (response.status === 200) {
                const token = response.data.token_acceso;
                console.log('Inicio de sesión exitoso', response.data);
                localStorage.setItem('token_acceso', token);
                onLoginSuccess();
                navigate('/');
            } else if (response.status === 404) {
                toast({
                    title: "Usuario o contraseña incorrectos",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error en la solicitud', error);
            toast({
                title: "Error en la solicitud. Intente nuevamente.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="login-form-container">
            <form className="card" onSubmit={handleSubmit}>
                <img src={difLogo} className="card-dif" />
                <img src={logoAyuntamiento} className="card-ayuntamiento" />
                <div className="input-container">
                    <img src={iconoUser} className="input-icon" />
                    <input
                        type="text"
                        name="nombre_usuario"
                        className="input-field"
                        placeholder={showPlaceholder.user ? "Nombre de usuario" : ""}
                        onFocus={() => setShowPlaceholder({ ...showPlaceholder, user: false })}
                        onBlur={() => setShowPlaceholder({ ...showPlaceholder, user: true })}
                        onChange={handleInputChange}
                        value={credentials.nombre_usuario}
                    />
                </div>
                <div className="inputPassword-container" >
                    <img src={iconoContrasenia} className="inputPassword-icon" />
                    <input
                        type="password"
                        name="contrasena"
                        className="inputPassword-field"
                        placeholder={showPlaceholder.password ? "Contraseña" : ""}
                        onFocus={() => setShowPlaceholder({ ...showPlaceholder, password: false })}
                        onBlur={() => setShowPlaceholder({ ...showPlaceholder, password: true })}
                        onChange={handleInputChange}
                        value={credentials.contrasena}
                    />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
                <label className="forgot-password-label">
                    ¿Olvidaste la contraseña?
                </label>
            </form>
        </div>
    );
}

export default Login;