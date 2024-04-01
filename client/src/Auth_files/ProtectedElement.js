import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider'; 

function ProtectedElement({ children }) {
    const { isLoggedIn } = useContext(AuthContext); 
    console.log(isLoggedIn);
    if (isLoggedIn) { // Directly check the isLoggedIn value
        return children;
    }
    return <Navigate to="/login" replace />;
    // return children;
}

export default ProtectedElement;
