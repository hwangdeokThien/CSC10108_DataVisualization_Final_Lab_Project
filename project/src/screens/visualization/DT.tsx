import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { parse, isValid, format } from "date-fns";
import { Data, BarChart } from "../../components/Chart/Bar";

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

    // const [data, setData] = useState<d3.DSVRowArray<string>>();
    const [filterDataQ8, setFilterDataQ8] = useState<Data[]>();

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

        // Return the original string if parsing fails
        return dateString;
    }

    const fetchData = async (viewOption: number = 2) => {
        const filePath: string = "../../data/supermarket_sales.csv";
        const readData = await d3.dsv(",", filePath);
        // setData(readData);

        const filteredOrders = readData.filter(
            (order) => parseFloat(order.cogs.replace(",", ".")) > 200
        );

        const orderCounts: { [key: string]: number } = {};

        filteredOrders.forEach((order) => {
            const dateString = formatDate(order.Date);

            let key = "";
            if (viewOption === 1) {
                key = new Date(dateString).getFullYear().toString();
            } else if (viewOption === 2) {
                key = format(new Date(dateString), "MMMM");
            }

            orderCounts[key] = (orderCounts[key] || 0) + 1;
        });

        const result: Data[] = Object.entries(orderCounts).map(
            ([label, value]) => ({
                label,
                value,
            })
        );

        setFilterDataQ8(result);
    };

    // console.log(data);

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

                <div>
                    {BarChart({
                        data: filterDataQ8 || static_data,
                        title: "Statistic",
                        xlabel: "Year",
                        ylabel: "Number <br> of <br> orders",
                    })}
                </div>
            </div>
        </div>
    );
};

export default DT;
