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
                <p className="font-bold font-sans">Câu hỏi 7:</p>
                <p className="font-sans pt-2 pb-5">
                    <div>
                        <text className="font-bold mr-1 ml-10">Yêu cầu:</text>
                        Hoạt động mua hàng (dựa trên tổng số đơn hàng đã thanh
                        toán) của cửa hàng theo thời gian.
                    </div>

                    <div className="pt-5">
                        <text className="font-bold mr-1 ml-10">
                            Thiết kế biểu đồ:
                        </text>
                        <div className="pl-14 pt-2">
                            Ở trong yêu cầu này, ta sẽ sử dụng hai thuộc tính là
                            Date để xác định thời gian và CNT(Invoice ID) để đếm
                            số lượng các đơn của cửa hàng.
                        </div>
                        <div className="pl-14 pt-5">
                            Ta sẽ sử dụng các kênh sau:
                        </div>
                        <div className="pl-14 pt-2">
                            - Vị trí theo chiều dọc: thuộc tính số lượng các đơn
                            hàng
                        </div>
                        <div className="pl-14 pt-2">
                            - Vị trí theo chiều ngang: thuộc tính thời gian
                            (tuần)
                        </div>{" "}
                        <div className="pl-14 pt-2">
                            - Màu sắc để tăng hiệu quả biểu đạt{" "}
                        </div>
                        <div className="pl-14 pt-5">
                            Để biểu diễn các giá trị ta đánh dấu bằng cách sử
                            dụng Points vì các giá trị số lượng đơn hàng và thời
                            gian (biểu diễn bằng số) đều là các đại lượng Q
                            (values).
                        </div>
                        <div className="pl-14 pt-5">
                            Để thể hiện được tính thay đổi theo thời gian trong
                            hoạt động mua bán thì ta sẽ kết nối các điểm giá
                            trị, tạo thành line chart.
                        </div>
                    </div>
                </p>

                {LineChart({
                    data: filterDataQ7 || [],
                    title: "Purchasing activity of the store over time",
                    xlabel: "Time (week)",
                    ylabel: "Number <br> of <br> invoices",
                    height: 600,
                    width: 800,
                })}

                <p className="font-sans pt-2 pb-5">
                    <div>
                        <text className="font-bold mr-1 ml-10">
                            Đánh giá biểu đồ:
                        </text>
                        <div className="pl-14 pt-2">
                            - Nguyên tắc biểu đạt: Biểu đồ trên không thực hiện
                            biểu diễn trên toàn bộ tập dữ liệu mà biễu diễn dữ
                            liệu tương ứng với năm 2019, vì khoảng thời gian
                            trong dữ liệu chỉ kéo dài trong 3 tháng đầu tiên, do
                            đó để thể hiện tính liên tục trong thời gian từ năm
                            2019 sang năm 2020 là không thể. Đối với các thông
                            tin được biểu diễn thì không có sẵn trong tập dữ
                            liệu mà phải cài đặt thêm (tính toán theo tuần, và
                            đếm số lượng đơn hàng).
                        </div>
                        <div className="pl-14 pt-2">
                            - Độ chính xác: Vì biểu sử dụng các kênh vị trí
                            (positions) nên ta có thể tính độ chính xác bằng:
                            Log2(1 + 0.125) = 0.17
                        </div>{" "}
                        <div className="pl-14 pt-2">
                            - Khả năng phân biệt: Thuộc tính Time phân biệt với
                            nhau do mang các giá trị khác nhau khi xét đến vị
                            trí trên trục. Thuộc tính CNT(Invoice-ID) cũng phân
                            biệt với nhau do mang giá trị khác nhau khi xét đến
                            vị trí trên trục.
                        </div>
                        <div className="pl-14 pt-2">
                            - Khả năng tách biệt: Các kênh vị trí và màu sắc là
                            tách biệt với nhau.
                        </div>
                        <div className="pl-14 pt-2">
                            - Khả năng làm nổi bật: Không có tính năng làm nổi
                            bật mà chỉ thể hiện sự thay đổi chung trong số lượng
                            đơn hàng mua bán theo thời gian.
                        </div>
                        <div className="pl-14 pt-2">
                            - Khả năng phân tách nhóm: Có một nhóm bao gồm tất
                            cả các điểm dữ liệu được liên kết với nhau.
                        </div>
                    </div>
                </p>

                <p className="font-bold font-sans pt-20">Câu hỏi 8:</p>
                <p className="font-sans pt-2 pb-5">
                    <div>
                        <text className="font-bold mr-1 ml-10">Yêu cầu:</text>
                        Xác định số lượng đơn hàng có giá trị trên 200$ trong
                        năm 2019.
                    </div>

                    <div className="pt-5">
                        <text className="font-bold mr-1 ml-10">
                            Thiết kế biểu đồ:
                        </text>
                        <div className="pl-14 pt-2">
                            Trong yêu cầu này ta sẽ sử dụng ba thuộc tính, bao
                            gồm, CNT(Invoice-ID) để đếm số lượng đơn hàng, cogs
                            để xác định điều kiện lớn hơn 200 của đơn hàng, và
                            Date để xác định thời điểm thanh toán (tháng).
                        </div>
                        <div className="pl-14 pt-5">
                            Ta sẽ sử dụng các kênh sau:
                        </div>
                        <div className="pl-14 pt-2">
                            - Vị trí theo chiều ngang: thuộc tính thời gian
                            (Tháng)
                        </div>
                        <div className="pl-14 pt-2">
                            - Vị trí theo chiều dọc: thuộc tính số đơn hàng
                        </div>{" "}
                        <div className="pl-14 pt-2">
                            - Màu sắc để tăng hiệu quả biểu đạt{" "}
                        </div>
                        <div className="pl-14 pt-2">
                            - Nhãn để xác định được chính xác số lượng đơn hàng
                        </div>
                        <div className="pl-14 pt-5">
                            Để biểu diễn số lượng các đơn hàng (Q, value) tại
                            các tháng cụ thể (C, key) thì ta sử dụng biểu đồ cột
                            dùng line kết hợp với size để đánh dấu.
                        </div>
                    </div>
                </p>

                {BarChart({
                    data: filterDataQ8 || [],
                    title: "The number of orders worth over 200$ over time",
                    xlabel: "Time (month)",
                    ylabel: "Number <br> of <br> orders",
                    height: 600,
                    width: 800,
                })}

                <p className="font-sans pt-2 pb-5">
                    <div>
                        <text className="font-bold mr-1 ml-10">
                            Đánh giá biểu đồ:
                        </text>
                        <div className="pl-14 pt-2">
                            - Nguyên tắc biểu đạt: Biểu đồ trên không thực hiện
                            biểu diễn trên toàn bộ tập dữ liệu mà biễu diễn dữ
                            liệu tương ứng với năm 2019, vì khoảng thời gian
                            trong dữ liệu chỉ kéo dài trong 3 tháng đầu tiên.
                            Đối với các thông tin được biểu diễn thì không có
                            sẵn trong tập dữ liệu mà phải cài đặt thêm (đếm số
                            lượng đơn hàng có giá trị trên 200).
                        </div>
                        <div className="pl-14 pt-2">
                            - Độ chính xác: Vì đây là biểu đồ cột sử dụng các
                            kênh vị trí (positions) nên ta có thể tính độ chính
                            xác bằng: Log2(1 + 0.125) = 0.17
                        </div>{" "}
                        <div className="pl-14 pt-2">
                            - Khả năng phân biệt: Thuộc tính Time phân biệt với
                            nhau do có 3 tháng tách biệt, được ngăn cách. Thuộc
                            tính CNT(Invoice-ID) cũng phân biệt với nhau do mang
                            giá trị khác nhau khi xét đến vị trí trên trục.
                        </div>
                        <div className="pl-14 pt-2">
                            - Khả năng tách biệt: Các kênh vị trí và màu sắc là
                            tách biệt với nhau. Và nhãn không ảnh hưởng đến các
                            kênh khác.
                        </div>
                        <div className="pl-14 pt-2">
                            - Khả năng làm nổi bật: Không có tính năng làm nổi
                            bật, chỉ thể hiện số lượng tương ứng với mỗi tháng.
                        </div>
                        <div className="pl-14 pt-2">
                            - Khả năng phân tách nhóm: Không có nhóm bao hàm hay
                            kết nối cụ thể.
                        </div>
                    </div>
                </p>
            </div>
        </div>
    );
};

export default DT;
