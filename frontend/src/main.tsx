import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './app/App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import AuthLayout from './app/routes/auth/index.tsx';
import Login from './app/routes/auth/login/index.tsx';
import Register from './app/routes/auth/register/index.tsx';
import ProtectedRoute from './components/common/ProtectedRoute.tsx';
import HomeLayout from './app/routes/home';
import Issues from './app/routes/my-issues/index.tsx';
import PublicIssues from './app/routes/public-issues/index.tsx';
import Analytics from './app/routes/analytics';
import MapView from './app/routes/map-view';
import Dashboard from './app/routes/dashboard';
import IssueDetails from './app/routes/my-issues/id/index.tsx';
import PublicIssueDetailsPage from './app/routes/public-issues/id/index.tsx';

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
                    <HomeLayout />
                </ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    },
                    {
                        path: "/my-issues",
                        element: <ProtectedRoute>
                            <Issues />
                        </ProtectedRoute>
                    },
                    {
                        path: "/my-issues/:id",
                        element: <ProtectedRoute>
                            <IssueDetails />
                        </ProtectedRoute>
                    },
                    {
                        path: "/public-issues",
                        element: <ProtectedRoute>
                            <PublicIssues />
                        </ProtectedRoute>
                    },
                    {
                        path: "/public-issues/:id",
                        element: <ProtectedRoute>
                            <PublicIssueDetailsPage />
                        </ProtectedRoute>
                    },
                    {
                        path: "/analytics",
                        element: <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    },
                    {
                        path: "/map-view",
                        element: <ProtectedRoute>
                            <MapView />
                        </ProtectedRoute>
                    }
                ]
            }
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
