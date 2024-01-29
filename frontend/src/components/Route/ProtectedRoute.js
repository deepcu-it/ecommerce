import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    if (loading) {
        // You might want to render a loading indicator here
        return <Loader/>;
    }

    return (
        <Routes>
            {!loading && (
                <Route
                    {...rest}
                    element={
                        isAuthenticated ? (
                            <Component />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            )}
        </Routes>
    );
};

export default ProtectedRoute;
