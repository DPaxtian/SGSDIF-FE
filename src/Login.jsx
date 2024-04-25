import React, { useState } from 'react';
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
    const [showPlaceholder, setShowPlaceholder] = useState({ user: true, password: true });
    return (
        <div className="login-form-container">
            <div className="card">
                <img src={loginXalapa} className="card-xalapa"/>
                <img src={difLogo} className="card-dif"/>
                <img src={logoAyuntamiento} className="card-ayuntamiento"/>
                <div className="input-container">
                    <img src={iconoUser} className="input-icon" />
                    <input
                        type="text"
                        className="input-field"
                        placeholder={showPlaceholder.user ? "user" : ""}
                        onFocus={() => setShowPlaceholder({ ...showPlaceholder, user: false })}
                        onBlur={() => setShowPlaceholder({ ...showPlaceholder, user: true })}
                    />
                </div>
                <div className="inputPassword-container" >
                    <img src={iconoContrasenia} className="inputPassword-icon" />
                    <input
                        type="password"
                        className="inputPassword-field"
                        placeholder={showPlaceholder.password ? "password" : ""}
                        onFocus={() => setShowPlaceholder({ ...showPlaceholder, password: false })}
                        onBlur={() => setShowPlaceholder({ ...showPlaceholder, password: true })}
                    />
                </div>
                <button type="submit" className="login-button">Log in</button> 
                <label className="forgot-password-label">
                    Forgot password?
                </label>
            </div>
        </div>
    );
}

export default Login;