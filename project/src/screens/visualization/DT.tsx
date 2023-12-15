import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const DT: React.FC = () => {
    const navigate = useNavigate();

    const handleATClick = () => {
        navigate("/at");
    };

    const handleCKClick = () => {
        navigate("/ck");
    };

    const handleDTClick = () => {
        navigate("/dt");
    };

    const handleTTClick = () => {
        navigate("/tt");
    };

    return (
        <div className="w-[85%] m-auto">
            <Navbar
                name={"Visualize"}
                isHome={false}
                onATClick={handleATClick}
                onCKClick={handleCKClick}
                onDTClick={handleDTClick}
                onTTClick={handleTTClick}
            />
            <h2>DucThien</h2>
        </div>
    );
};

export default DT;
