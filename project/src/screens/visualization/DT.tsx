import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { parse, isValid, format } from "date-fns";
import { Data, BarChart } from "../../components/Chart/Bar";
import { DataPoint, LineChart } from "../../components/Chart/Line";

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
    const [filterDataQ7, setFilterDataQ7] = useState<DataPoint[]>();

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

    const fetchDataQ7 = async (selectedYear: number) => {
        const filePath: string = "../../data/supermarket_sales.csv";
        const readData = await d3.dsv(",", filePath);

        const filteredOrders = readData.filter(
            (order) =>
                parseFloat(order.cogs.replace(",", ".")) > 200 &&
                new Date(order.Date).getFullYear() === selectedYear
        );

        const orderCounts: { [key: string]: number } = {};

        filteredOrders.forEach((order) => {
            const dateString = formatDate(order.Date);
            const weekNumber = format(new Date(dateString), "I");

            orderCounts[weekNumber] = (orderCounts[weekNumber] || 0) + 1;
        });

        const result: DataPoint[] = Object.entries(orderCounts).map(
            ([x, y]) => ({
                x: parseInt(x),
                y,
            })
        );

        setFilterDataQ7(result);
    };

    useEffect(() => {
        fetchDataQ7(2019);
    }, []);

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
        // console.log(result);
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

            <div className="w-[80%] m-auto pt-5">
                <p className="">Câu hỏi 7:</p>
                <p className="font-sans pt-2 pb-5">
                    <text className="font-bold mr-1 ml-10">Yêu cầu:</text>
                    Hoạt động mua hàng (dựa trên tổng số đơn hàng đã thanh toán)
                    của cửa hàng theo thời gian.
                </p>

                {LineChart({
                    data: filterDataQ7 || [],
                    title: "Purchasing activity of the store over time",
                    xlabel: "Time (week)",
                    ylabel: "Number <br> of <br> invoices",
                    height: 600,
                    width: 800,
                })}

                <p className="">Câu hỏi 8:</p>
                <p className="font-sans pt-2 pb-5">
                    <text className="font-bold mr-1 ml-10">Yêu cầu:</text>
                    Xác định số lượng đơn hàng có giá trị trên 200$ trong năm
                    2019.
                </p>

                {BarChart({
                    data: filterDataQ8 || [],
                    title: "The number of orders worth over 200$ over time",
                    xlabel: "Time (month)",
                    ylabel: "Number <br> of <br> orders",
                    height: 600,
                    width: 800,
                })}
            </div>
        </div>
    );
};

export default DT;
