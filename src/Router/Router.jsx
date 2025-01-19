import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from '../Layout/Layout'
import Loader from '../components/Loader'
const Home = lazy(() => import("../Pages/Home/Home"))
const Login = lazy(() => import("../Pages/Login/Login"))
const Signup = lazy(() => import("../Pages/Signup/Signup"))
const ConnectionReq = lazy(() => import("../Pages/Request/ConnectionReq"))
const Connection = lazy(() => import("../Pages/connection/Connection"))

function Router() {
    const router = createBrowserRouter([{
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element:
                    <Suspense fallback={<Loader />} >
                        <Home />
                    </Suspense>
            },

            {
                path: "/connection",
                element: <Suspense fallback={<Loader />} >
                    <Connection />
                </Suspense>

            },
            {
                path: "/request",
                element: <Suspense fallback={<Loader />} >
                    <ConnectionReq />
                </Suspense>
            },
        ]
    }, {
        path: "/login",
        element: <Suspense fallback={< Loader />} >
            <Login />
        </Suspense >
    }, {
        path: "/signup",
        element: <Suspense fallback={< Loader />} >
            <Signup />
        </Suspense >
    },])

    return (
        <RouterProvider router={router} />
    )
}

export default Router