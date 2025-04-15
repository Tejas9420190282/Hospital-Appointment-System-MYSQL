import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function Doctor_Protected_Routes() {
    
    const role = sessionStorage.getItem("role");
    
    return role === 'doctor' ? <Outlet /> : <Navigate to="/admin-doctor-login" replace />
}

export default Doctor_Protected_Routes
