import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './app/App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './app/routes/home'

import AuthLayout from './app/routes/auth/index.tsx';
import Login from './app/routes/auth/login/index.tsx';
import Register from './app/routes/auth/register/index.tsx';
import ProtectedRoute from './components/common/ProtectedRoute.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "/auth/login",
                        element: <Login />
                    },
                    {
                        path: "/auth/register",
                        element: <Register />
                    },

                ]
            },

            {
                path: "/",
                element: <ProtectedRoute>
                    <Home />
                </ProtectedRoute>,
            },

        ]
    },
    {
        path: "/*",
        element: <div>Not found</div>
    }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
