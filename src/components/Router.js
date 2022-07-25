import React from 'react'

import { Routes, Route, } from "react-router-dom";
import Customers from '../pages/Customers';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';

const Router = () => {
    return (
       
            <Routes>
                <Route  path="/" exact element={<Dashboard />} />
                <Route  path="/customers" element={<Customers />}  />
                <Route  path="/products" element={<Products />} />
            </Routes>
        
    )
}

export default Router
