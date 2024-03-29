import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { AUTH_ROUTE } from '../utils/consts';

const AppRouter = () => {

    const isAuth = useSelector(state => state.app.isAuth);

    return (
        <Routes>
            {
                isAuth && authRoutes.map(
                    ({path, Component}) => <Route key={path} path={path} Component={Component} exact />
                )
            }
            {
                publicRoutes.map(
                    ({path, Component}) => <Route key={path} path={path} Component={Component} exact />
                )
            }
            <Route path='/' element={<Navigate to={AUTH_ROUTE} />} />
        </Routes>
    )
}

export default AppRouter