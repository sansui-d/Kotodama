import React from 'react';
import { createBrowserRouter } from 'react-router-dom'

const Home = React.lazy(() => import('@pages/Home'))

const routers = createBrowserRouter([
    {
        path: '/',
        name: '主页',
        element: <Home />
    }
]);

export default routers;