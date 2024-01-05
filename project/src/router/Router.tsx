// src/router/Router.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import AT from "../screens/visualization/AT";
import CK from "../screens/visualization/CK";
import DT from "../screens/visualization/DT";
import TT from "../screens/visualization/AT";
import DashBoard from "../screens/visualization/DashBoard";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/at" element={<AT />} />
                <Route path="/ck" element={<CK />} />
                <Route path="/dt" element={<DT />} />
                <Route path="/tt" element={<TT />} />
                <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
