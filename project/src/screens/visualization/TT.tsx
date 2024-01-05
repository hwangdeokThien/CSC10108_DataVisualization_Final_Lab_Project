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

const TT: React.FC = () => {
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
    const [filterDataQ5, setFilterDataQ5] = useState<Data[]>();
    const [filterDataQ6, setFilterDataQ6] = useState<Data[]>();

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
            (order) => (order['Customer type'] === 'Normal' || order['Customer type'] === 'Member') &&
                new Date(order.Date).getFullYear() === 2019
        );

        const newcustomerCounts: { [key: string]: number } = {};

        filteredOrders.forEach((order) => {
            const dateString = formatDate(order.Date);

            let key = "";
            if (viewOption === 1) {
                key = new Date(dateString).getFullYear().toString();
            } else if (viewOption === 2) {
                key = format(new Date(dateString), "MMMM");
            }

            newcustomerCounts[key] = (newcustomerCounts[key] || 0) + 1;
        });

        const result: Data[] = Object.entries(newcustomerCounts).map(
            ([label, value]) => ({
                label,
                value,
            })
        );


        const filteredBranches = readData.filter(
            (order) => order['Branch'] === 'A' || order['Branch'] === 'B' || order['Branch'] === 'C'
        );
        const revenueByBranch: { [key: string]: number } = {};

        filteredBranches.forEach((order) => {
            const branch = order['Branch'];
            const grossIncome = parseFloat(order['gross income']); // Chuyển đổi thành số

            revenueByBranch[branch] = (revenueByBranch[branch] || 0) + grossIncome;
        });
        const result1: Data[] = Object.entries(revenueByBranch).map(
            ([label, value]) => ({
                label,
                value,
            })
        );
        setFilterDataQ5(result);
        setFilterDataQ6(result1);

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
                <p className="pb-5">Câu 5:</p>
                <p>Thống kê lượng khách hàng đến cửa hàng mỗi tháng trong năm 2019</p>


                {BarChart({
                    data: filterDataQ5 || static_data,
                    title: "Thống kê lượng khách hàng đến cửa hàng mỗi tháng trong năm 2019",
                    xlabel: "Tháng (2019)",
                    ylabel: "Số lượng<br>khách hàng",
                    height: 600,
                    width: 1000,
                })}

                <p>Đánh giá: Đồ thị cho ta thấy được khách hàng sẽ đến cửa hàng mua sắm vào tháng 1 (đầu năm) để mua những thế vật phẩm để có thể chuẩn bị cho 1 năm mới. Chính vì thế các cửa hàng phải luôn cung cấp thật nhiều hàng hóa (đặc biệt là phải quan tâm đến các sản phẩm mà nhu cầu của họ) vào đầu năm. Đồng thời, các cửa hàng phải có thêm một số chương trình khuyến mãi nhằm để thu hút khách hàng .</p>
                <p>=====================================================================================================================================</p>
                <p className="pb-5">Câu 6:</p>
                <p>So sánh tổng doanh thu của chi nhánh A, B, C.</p>
                {BarChart({
                    data: filterDataQ6 || static_data,
                    title: "Tổng doanh thu theo chi nhánh",
                    xlabel: "Chi nhánh",
                    ylabel: "Tổng <br> doanh thu",
                    height: 600,
                    width: 1000,
                })}
                <p>Đánh giá: Đồ thị cho ta thấy chi nhánh C (ở thành phố Naypyitaw của Myanmar)  là có thu nhập cao nhất trong cả 3 chi nhánh. Qua đây, ta cũng thấy được so hướng người dân đang có khả năng đổ dần thành phố Naypyitaw . Chính vì thế, Chi nhánh C cần phải có thêm kế hoạch để có thể thu hút thêm nhiều khách hàng hơn nữa bằng cách thêm các ưu đãi khi họ đăng kí thành viên. Còn 2 chi nhánh A(Yangon) và B(Mandaly) cần phải đưa ra chiến lược tiếp cận hoặc quảng cáo hiệu quả nhằm có thể thu hút khách hàng  để cho họ có thể biết đến cửa hàng của mình. </p>
            </div>
        </div>
    );
};

export default TT;
