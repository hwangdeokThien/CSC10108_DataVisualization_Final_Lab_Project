import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
// import LinePlot from "../../components/Chart/Line";
import { Data, BarChart } from "../../components/Chart/Bar";
import * as d3 from "d3";

const static_data: Data[] = [
    { label: "Apples", value: 100 },
    { label: "Bananas", value: 200 },
    { label: "Oranges", value: 50 },
    { label: "Kiwis", value: 150 },
];

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

    const handleDashboardClick = () => {
        navigate("/dashboard");
    };

    const fetchData = async () => {
        const filePath: string = "../../data/supermarket_sales.csv";
        const data = await d3.dsv(";", filePath);
        console.log(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full m-auto">
            <Navbar
                name={"Visualize"}
                isHome={false}
                onATClick={handleATClick}
                onCKClick={handleCKClick}
                onDTClick={handleDTClick}
                onTTClick={handleTTClick}
                onDashboardClick={handleDashboardClick}
            />
            {/* <div className="w-[85%] m-auto">
                <LinePlot data={[1, 2, 3, 4]} />
            </div> */}
            <div className="w-[80%] m-auto pt-5">
                <p className="pb-5">This is testing chart</p>
                {
                    // this is testing csv in creating chart
                }
                <div>{BarChart({ data: static_data })}</div>
            </div>
        </div>
    );
};

export default DT;
