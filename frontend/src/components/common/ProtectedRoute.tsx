import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../app/utils/auth';



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Redirect to login page if not authenticated
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;