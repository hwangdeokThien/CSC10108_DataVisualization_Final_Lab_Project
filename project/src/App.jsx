import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Page1 from "./screens/visualization/DT";
import Page2 from "./screens/visualization/CK";
import Page3 from "./screens/visualization/AT";
import Page4 from "./screens/visualization/TT";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
                <Route path="/page4" element={<Page4 />} />
            </Routes>
        </Router>
    );
};

export default App;
