import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import imagenFondoLogin from './assets/img/fondoLogin.png';
import loginXalapa from './assets/img/logoXalapa.jpg';
import difLogo from './assets/img/dif_logo.png';
import logoAyuntamiento from './assets/img/logoAyuntamiento.png';
import iconoUser from './assets/img/usuario.png';
import iconoContrasenia from './assets/img/contrasenia.png';
import { BiFontSize } from 'react-icons/bi';
import App from './App.jsx'
function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ user: '', password: '' });
    const [showPlaceholder, setShowPlaceholder] = useState({ user: true, password: true });

    const handleLogin = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Validar credenciales
        if (credentials.user === "prueba@DIF.com.mx" && credentials.password === "dev") {
            navigate('/dashboard'); // Redirige al dashboard si las credenciales son correctas
        } else {
            alert("Credenciales incorrectas"); // Alerta o manejo de error más sofisticado
        }
    };

    return (
        <form className="login-form-container" onSubmit={handleLogin}>
            <div className="card">
                <img src={loginXalapa} className="card-xalapa" />
                <img src={difLogo} className="card-dif" />
                <img src={logoAyuntamiento} className="card-ayuntamiento" />
                <div className="input-container">
                    <img src={iconoUser} className="input-icon" />
                    <input
                        type="text"
                        className="input-field"
                        placeholder={showPlaceholder.user ? "Usuario" : ""}
                        onFocus={() => setShowPlaceholder({ ...showPlaceholder, user: false })}
                        onBlur={() => setShowPlaceholder({ ...showPlaceholder, user: true })}
                        onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
                    />
                </div>
                <div className="inputPassword-container" >
                    <img src={iconoContrasenia} className="inputPassword-icon" />
                    <input
                        type="password"
                        className="inputPassword-field"
                        placeholder={showPlaceholder.password ? "Contraseña" : ""}
                        onFocus={() => setShowPlaceholder({ ...showPlaceholder, password: false })}
                        onBlur={() => setShowPlaceholder({ ...showPlaceholder, password: true })}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="login-button">Iniciar sesión</button>
            </div>
        </form>
    );
}

export default Login;
