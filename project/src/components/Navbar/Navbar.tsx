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
}

const Navbar: React.FC<NavbarProps> = ({
    name,
    isHome,
    onATClick,
    onCKClick,
    onDTClick,
    onTTClick,
}) => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/");
    };
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between h-32 items-center pl-10 pr-10">
                <div className="flex gap-4 items-center">
                    <div className="logo">
                        {isHome ? (
                            <FaHome
                                className="text-[25px] icon text-blue-700 hover:text-blue-500"
                                onClick={handleHomeClick}
                            />
                        ) : (
                            <FaChartArea
                                className="text-[25px] icon text-blue-700 hover:text-blue-500"
                                onClick={handleHomeClick}
                            />
                        )}
                    </div>
                    <div className="name text-2xl font-extrabold tracking-tight dark:text-white text-slate-800">
                        <span onClick={handleHomeClick}>{name}</span>
                    </div>
                </div>

                <div className="flex gap-8">
                    <li
                        className="boldicon hover:text-slate-700 text-[18px]"
                        onClick={onATClick}
                    >
                        AT
                    </li>
                    <li
                        className="icon hover:text-slate-700 text-[18px]"
                        onClick={onCKClick}
                    >
                        CK
                    </li>
                    <li
                        className="icon hover:text-slate-700 text-[18px]"
                        onClick={onDTClick}
                    >
                        DT
                    </li>
                    <li
                        className="icon hover:text-slate-700 text-[18px]"
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
