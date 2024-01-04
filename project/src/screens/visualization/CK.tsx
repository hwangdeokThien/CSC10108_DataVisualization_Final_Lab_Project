import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { parse, isValid, format } from "date-fns";
//import { Data, BarChart } from "../../components/Chart/Bar";
import { Data, DualBarChart } from "../../components/Chart/DualBarChart";

//import { GroupedBarChart} from "../../components/Chart/GroupBarChart";
//import { useEffect } from "react";

const static_data: Data[] = [
    { label: "Apples", value1: 100,value2: 100},
    { label: "Bananas", value1: 200, value2: 100},
    { label: "Oranges", value1: 50,value2: 100 },
    { label: "Kiwis", value1: 150,value2: 100 },
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
        const datapath = "./../data/q3.csv";
        const data = await d3.dsv(",", datapath);
        const productline = d3.rollup(data, v => v.length, d => d.ProductLine, d => d.Gender)
        console.log(productline);
        //const PDT: { [key: string]: number } = {};
        /*const aggregate = Array.from(productline, ([ProductLine, count]) => {
            const obj = {};
            for (const [Gender, num] of count) {
                obj.ProductLine = ProductLine;
                obj[Gender] = num;
            }
            return obj;
        })*/
        const aggregate = Array.from(productline, ([ProductLine, count]) => {
            const obj = {};
            for (const [Gender, num] of count) {
                obj.ProductLine = ProductLine;
                obj[Gender] = num;
            }
            return obj;
        })

        
        /*const result: Data[] = Object.entries(aggregate).map(
            ([label, value]) => ({
                label,
                value,
            })
        );
        

        setFilterDataQ3(result);*/
        //console.log(filterDataQ3);
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
                {DualBarChart({
                    data: filterDataQ3 || static_data,
                    title: "Statistic",
                    xlabel: "Product Line",
                    ylabel: "Number <br> of <br> customers",
                    height: 600,
                    width: 800,
                })}
                <script src="../../components/Chart/GroupBarChart.ts">

                </script>
                <p className="pb-5">Câu hỏi 4: Identify the date (day, month, year) with the highest number of customer visits for purchases.</p>
                
            </div>
        </div>
    );
};


export default CK;
