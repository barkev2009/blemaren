import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';

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
        </Routes>
    )
}

export default AppRouter