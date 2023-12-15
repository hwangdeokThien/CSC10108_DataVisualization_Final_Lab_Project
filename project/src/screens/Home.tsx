import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
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
                name={"Home"}
                isHome={true}
                onATClick={handleATClick}
                onCKClick={handleCKClick}
                onDTClick={handleDTClick}
                onTTClick={handleTTClick}
            />
            <div className="card-container">
                <Card onCardClick={handleATClick} />
                <Card onCardClick={handleATClick} />
                <Card onCardClick={handleATClick} />
                <Card onCardClick={handleATClick} />
            </div>
        </div>
    );
};

export default Home;
