import React from 'react';
import GestionarSolicitudComponente from '../../componentes/solicitudes/gestionar-solicitud-componente';
import { useLocation } from 'react-router-dom';

export default function GestionarSolicitudPagina() {
    const location = useLocation();
    const solicitud = location.state?.solicitud;

    return (
        <GestionarSolicitudComponente solicitud={solicitud} />
    );
}
