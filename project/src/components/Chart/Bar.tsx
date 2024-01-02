import { useRef, useEffect } from "react";
import {
    axisBottom,
    axisLeft,
    ScaleBand,
    scaleBand,
    ScaleLinear,
    scaleLinear,
    select,
} from "d3";

export interface Data {
    label: string;
    value: number;
}

interface BarChartProps {
    data: Data[];
    title: string;
    xlabel: string;
    ylabel: string;
}

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
    ylabel: string;
    height: number;
}

interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
    xlabel: string;
    width: number;
}

interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}

function AxisLeft({ scale, ylabel }: AxisLeftProps) {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
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
                y={300}
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
            select(ref.current).call(axisBottom(scale));
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
            >
                {xlabel}
            </text>
        </g>
    );
}

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
    return (
        <>
            {data.map(({ value, label }) => (
                <rect
                    key={`bar-${label}`}
                    x={scaleX(label)}
                    y={scaleY(value)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(value)}
                    fill="teal"
                />
            ))}
        </>
    );
}

export function BarChart({ data, title, xlabel, ylabel }: BarChartProps) {
    const margin = { top: 100, right: 100, bottom: 100, left: 100 };
    const width = 1000 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width])
        .padding(0.5);
    const scaleY = scaleLinear()
        .domain([0, Math.max(...data.map(({ value }) => value))])
        .range([height, 0]);
    console.log(width);
    return (
        <svg
            className="m-auto"
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <text x={350} y={-45} fontSize={30}>
                    {title}
                </text>
                <AxisBottom
                    scale={scaleX}
                    transform={`translate(0, ${height})`}
                    xlabel={xlabel}
                    width={width}
                />
                <AxisLeft scale={scaleY} ylabel={ylabel} height={height} />
                <Bars
                    data={data}
                    height={height}
                    scaleX={scaleX}
                    scaleY={scaleY}
                />
            </g>
        </svg>
    );
}
