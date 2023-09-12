import React, { FC } from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutePaths } from '@/app/router/router';
import useAuth from '@/app/hooks/useAuth';
// import { RootState } from '@/app/store/store';

const PrivateRoute: FC = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={RoutePaths.SIGNIN} replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;

/* export const PrivateRoute: FC = () => {
    const user = useSelector((rootState: RootState) => rootState.user);
    if (!user) {
        return <Navigate to={RoutePaths.SIGNIN} replace />;
    }
    return <Outlet />;
}; */
