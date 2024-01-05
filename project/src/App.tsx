import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import DT from "./screens/visualization/DT";
import CK from "./screens/visualization/CK";
import AT from "./screens/visualization/AT";
import TT from "./screens/visualization/TT";
import DashBoard from "./screens/visualization/DashBoard";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/DT" element={<DT />} />
                <Route path="/CK" element={<CK />} />
                <Route path="/AT" element={<AT />} />
                <Route path="/TT" element={<TT />} />
                <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
        </Router>
    );
};

export default App;
