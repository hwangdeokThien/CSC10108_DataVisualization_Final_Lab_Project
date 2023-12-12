import React from "react";
import { IoHomeOutline } from "react-icons/io5";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between h-32 items-center pl-16 pr-10">
                <div className="flex gap-4 items-center">
                    <div className="logo">
                        <IoHomeOutline className="text-[25px] icon hover:text-[#a5a6a6]" />
                    </div>
                    <div className="name text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                        <span>Home</span>
                    </div>
                </div>

                <div className="flex gap-8">
                    <li className="icon hover:text-[#a5a6a6] text-[18px]">
                        About us
                    </li>
                    <li className="icon hover:text-[#a5a6a6] text-[18px]">
                        Donate
                    </li>
                    <li className="icon hover:text-[#a5a6a6] text-[18px]">
                        Receive
                    </li>
                    <div className="language text-[18px]">
                        <select>
                            <option value="en">English</option>
                            <option value="vi">Vietnamese</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
