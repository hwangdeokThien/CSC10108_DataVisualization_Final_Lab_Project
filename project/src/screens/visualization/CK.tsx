import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { parse, isValid, format } from "date-fns";
import { Data, BarChart } from "../../components/Chart/Bar";
//import { GroupedBarChart} from "../../components/Chart/GroupBarChart";
//import { useEffect } from "react";

const static_data: Data[] = [
    { label: "Apples", value: 100 },
    { label: "Bananas", value: 200 },
    { label: "Oranges", value: 50 },
    { label: "Kiwis", value: 150 },
];

const CK: React.FC = () => {
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

    //const [filterDataQ8, setFilterDataQ8] = useState<Data[]>();

    const [filterDataQ3, setFilterDataQ3] = useState<Data[]>();

    const fetchData = async (viewOption: number = 2) => {
        const datapath: string = "./../data/q3.csv";
        const data = await d3.dsv(",", datapath);
        return data
        var productline = d3.rollup(data, v => v.length, d => d.ProductLine, d => d.Gender)
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
            <h2>CkVis Page</h2>
            {/* <div className="w-[85%] m-auto">
                <LinePlot data={[1, 2, 3, 4]} />
            </div> */}
            <div className="w-[80%] m-auto pt-5">
                <p className="pb-5">Câu hỏi 3: Statistics on the number of male/female customers who have made purchases for each product type. </p>
                <script src="../../components/Chart/GroupBarChart.js"> 

                </script>
                <p className="pb-5">Câu hỏi 4: Identify the date (day, month, year) with the highest number of customer visits for purchases.</p>
                <p>Khi viết thế này thì không biết kết qủa sẽ trông thế nào</p>
                
            </div>
        </div>
    );
};


export default CK;
