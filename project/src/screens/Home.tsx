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

    const handleDashboardClick = () => {
        navigate("/dashboard");
    };

    return (
        <div className="w-[100%] m-auto">
            <Navbar
                name={"Home"}
                isHome={true}
                onATClick={handleATClick}
                onCKClick={handleCKClick}
                onDTClick={handleDTClick}
                onTTClick={handleTTClick}
                onDashboardClick={handleDashboardClick}
            />
            <div className="card-container grid grid-rows-2 gap-4 justify-center items-center">
                <div className="mr-10 ml-auto">
                    <Card
                        onCardClick={handleATClick}
                        name="Anh Tuan"
                        role="Team Member"
                        avatarUrl=""
                        backgroundUrl="https://drive.google.com/uc?export=view&id=1xk3Q_AF4QUq7GNiOOZmynHvRvVMODP2p"
                    />
                    <Card
                        onCardClick={handleCKClick}
                        name="Chi Khang"
                        role="Team Member"
                        avatarUrl=""
                        backgroundUrl="https://drive.google.com/uc?export=view&id=10UlERlk7nR7sbjezeR_2tvYcwSttF_H1"
                    />
                </div>
                <div className="ml-10 mr-auto">
                    <Card
                        onCardClick={handleDTClick}
                        name="Duc Thien"
                        role="Team Leader"
                        avatarUrl="https://drive.google.com/uc?export=view&id=1TFcUY_uXr3_cEhRRpoiEXcLX8nF7jZLl"
                        backgroundUrl="https://drive.google.com/uc?export=view&id=1_1_RKTCzhfvPwcKrbvW_DSscelm2fNet"
                    />
                    <Card
                        onCardClick={handleTTClick}
                        name="Thanh Thien"
                        role="Team Member"
                        avatarUrl=""
                        backgroundUrl="https://drive.google.com/uc?export=view&id=1MvI4j3Sj4OHC3sOqZMPo2smh9aOYIqUN"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
