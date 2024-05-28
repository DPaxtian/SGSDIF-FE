import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from '../../App.jsx';
import Login from '../inicio-sesion/Login.jsx';
import ProtectedRoute from './rutas-protegidas.jsx';

const Redireccionador = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si el token está en el localStorage y es válido
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route 
                        path="/*" 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <App />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
};

export default Redireccionador;
