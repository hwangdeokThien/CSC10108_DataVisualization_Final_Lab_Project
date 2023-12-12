import React from "react";
import Navbar from "../components/Navbar/Navbar";

const Home: React.FC = () => {
    return (
        <div className="w-[85%] m-auto bg-white">
            <Navbar name={"Home"} />
            <p>hello world</p>
        </div>
    );
};

export default Home;
