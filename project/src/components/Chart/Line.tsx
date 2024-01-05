import { useRef, useEffect } from "react";
import * as d3 from "d3";

export interface DataPoint {
    x: number;
    y: number;
}

interface LineChartProps {
    data: DataPoint[];
    title: string;
    xlabel: string;
    ylabel: string;
    height: number;
    width: number;
}

interface AxisLeftProps {
    scale: d3.ScaleLinear<number, number>;
    ylabel: string;
    height: number;
}

interface AxisBottomProps {
    scale: d3.ScaleLinear<number, number>;
    transform: string;
    xlabel: string;
    width: number;
}

interface LineProps {
    data: DataPoint[];
    scaleX: d3.ScaleLinear<number, number>;
    scaleY: d3.ScaleLinear<number, number>;
}

function AxisLeft({ scale, ylabel, height }: AxisLeftProps) {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            d3.select(ref.current).call(d3.axisLeft(scale));
        }
    }, [scale]);

    const lines = ylabel.split("<br>").map((line, index) => (
        <tspan x={-70} dy={index === 0 ? 0 : 15} key={index}>
            {line}
        </tspan>
    ));

    return (
        <g ref={ref} fontSize={15}>
            <text
                className="axis-label"
                fill="black"
                rotate={0}
                textAnchor="middle"
                y={height / 2}
                fontSize={15}
            >
                {lines}
            </text>
        </g>
    );
}

function AxisBottom({ scale, transform, xlabel, width }: AxisBottomProps) {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            d3.select(ref.current).call(d3.axisBottom(scale));
        }
    }, [scale]);

    return (
        <g ref={ref} transform={transform} fontSize={15}>
            <text
                className="axis-label"
                fill="black"
                x={width / 2}
                y={50}
                rotate={0}
                fontSize={15}
                textAnchor="middle"
            >
                {xlabel}
            </text>
        </g>
    );
}

function Line({ data, scaleX, scaleY }: LineProps) {
    const line = d3
        .line<DataPoint>()
        .x((d) => scaleX(d.x) || 0)
        .y((d) => scaleY(d.y) || 0);

    return (
        <>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                d={line(data) || undefined}
            />
            {data.map((d, i) => (
                <circle
                    key={`point-${i}`}
                    cx={scaleX(d.x) || 0}
                    cy={scaleY(d.y) || 0}
                    r={4}
                    fill="currentColor"
                />
            ))}
        </>
    );
}

export function LineChart({
    data,
    title,
    xlabel,
    ylabel,
    height,
    width,
}: LineChartProps) {
    const margin = { top: 100, right: 100, bottom: 100, left: 100 };
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    const scaleX = d3.scaleLinear().domain([0, data.length]).range([0, width]);

    const scaleY = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y) || 0])
        .range([height, 0]);

    return (
        <svg
            className="m-auto"
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <text x={width / 2} y={-55} fontSize={20} textAnchor="middle">
                    {title}
                </text>
                <AxisBottom
                    scale={scaleX}
                    transform={`translate(0, ${height})`}
                    xlabel={xlabel}
                    width={width}
                />
                <AxisLeft scale={scaleY} ylabel={ylabel} height={height} />
                <Line data={data} scaleX={scaleX} scaleY={scaleY} />
            </g>
        </svg>
    );
}
