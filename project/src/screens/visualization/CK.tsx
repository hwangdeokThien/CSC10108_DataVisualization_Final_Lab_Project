import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { parse, isValid, format } from "date-fns";
import { Data, BarChart } from "../../components/Chart/BarCharQ4";
import { DataDBC, DualBarChart } from "../../components/Chart/DualBarChart";

//import { GroupedBarChart} from "../../components/Chart/GroupBarChart";
//import { useEffect } from "react";
const static_data1: DataDBC[] = [
    { label: "Apples", value1: 100, value2: 100 },
    { label: "Bananas", value1: 200, value2: 100 },
    { label: "Oranges", value1: 50, value2: 100 },
    { label: "Kiwis", value1: 150, value2: 100 },
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

    function formatDate(dateString: string) {
        const formats = ["MM/dd/yyyy", "yyyy-MM-dd", "MM-dd-yyyy", "dd-MMM-yy"];
        let parsedDate: Date | null = null;

        for (const formatStr of formats) {
            parsedDate = parse(dateString, formatStr, new Date());

            if (isValid(parsedDate)) {
                break;
            }
        }

        if (parsedDate && isValid(parsedDate)) {
            const formattedDate = format(parsedDate, "MM/dd/yyyy");
            return formattedDate;
        }

        return dateString;
    }
    const fetchData = async (viewOption: number = 2) => {
        const datapath = "./../data/q3.csv";
        const data = await d3.dsv(",", datapath);
        const productline = d3.rollup(
            data,
            (v) => v.length,
            (d) => d.ProductLine,
            (d) => d.Gender
        );
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

            orderCounts[key] = (orderCounts[key] || 0) + 1;
        });
        
        const result: Data[] = Object.entries(orderCounts).map(
            ([label, value]) => ({
                label,
                value,
            })
        );
        console.log(result);
        setFilterDataQ3(result);

        setFilterDataQ3(result);
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
            {/* <div className="w-[85%] m-auto">
                <LinePlot data={[1, 2, 3, 4]} />
            </div> */}
            <div className="w-[80%] m-auto pt-5">
                <p className="pb-5">
                    Câu hỏi 3: Statistics on the number of male/female customers
                    who have made purchases for each product type.{" "}
                </p>
                {DualBarChart({
                    data: static_data1,
                    title: "Statistic",
                    xlabel: "Product Line",
                    ylabel: "Number <br> of <br> customers",
                    height: 600,
                    width: 800,
                })}
                <script src="../../components/Chart/GroupBarChart.ts"></script>
                <p className="pb-5">
                    Câu hỏi 4: Identify the date (day, month, year) with the
                    highest number of customer visits for purchases.
                </p>
            </div>
        </div>
    );
};

export default CK;
