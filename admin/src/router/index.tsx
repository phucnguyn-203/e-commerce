import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/login";
import Root from "../pages/root";
import Dashboard from "../pages/dashboard";
import Product from "../pages/product";

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Root />
                    </ProtectedRoute>
                }
            >
                <Route path="" element={<Dashboard />} />
                <Route path="/products" element={<Product />} />
            </Route>
        </React.Fragment>
    )
);

export default router;
