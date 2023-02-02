import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = null; // TODO: determine if authorized, from redux later.

    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
