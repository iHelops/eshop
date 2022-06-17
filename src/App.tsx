import React from 'react';
import {BrowserRouter, useRoutes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import FullProduct from "./pages/FullProduct";
import Cart from "./pages/Cart";

const Router = () => {
    return useRoutes([
        {
            path: "/", element: <Home/>,
        },
        {
            path: "/search/:query", element: <Home/>
        },
        {
            path: "/product/:id", element: <FullProduct/>
        },
        {
            path: "/cart", element: <Cart/>
        }
    ]);
};

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Router/>
        </BrowserRouter>
    );
}

export default App;
