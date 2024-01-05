import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaChartArea } from "react-icons/fa";

interface NavbarProps {
    isHome: boolean;
    name: string;
    onATClick: () => void;
    onCKClick: () => void;
    onDTClick: () => void;
    onTTClick: () => void;
    onDashboardClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    name,
    isHome,
    onATClick,
    onCKClick,
    onDTClick,
    onTTClick,
    onDashboardClick,
}) => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    };
    return (
        <div className="flex flex-col bg-cyan-600">
            <div className="w-[85%] m-auto flex flex-row justify-between h-32 items-center pl-10 pr-10">
                <div className="flex gap-4 items-center">
                    <div className="logo">
                        {isHome ? (
                            <FaHome
                                className="text-[25px] icon text-white hover:text-slate-700"
                                onClick={handleHomeClick}
                            />
                        ) : (
                            <FaChartArea
                                className="text-[25px] icon text-white hover:text-slate-700"
                                onClick={handleHomeClick}
                            />
                        )}
                    </div>
                    <div className="name text-2xl tracking-tight dark:text-white text-white">
                        <span onClick={handleHomeClick}>{name}</span>
                    </div>
                </div>

                <div className="flex gap-8">
                    <li
                        className="text-white hover:text-slate-700 text-[18px]"
                        onClick={onDashboardClick}
                    >
                        Dash Board
                    </li>
                    <li
                        className="text-white hover:text-slate-700 text-[18px]"
                        onClick={onATClick}
                    >
                        AT
                    </li>
                    <li
                        className="text-white hover:text-slate-700 text-[18px]"
                        onClick={onCKClick}
                    >
                        CK
                    </li>
                    <li
                        className="text-white hover:text-slate-700 text-[18px]"
                        onClick={onDTClick}
                    >
                        DT
                    </li>
                    <li
                        className="text-white hover:text-slate-700 text-[18px]"
                        onClick={onTTClick}
                    >
                        TT
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
