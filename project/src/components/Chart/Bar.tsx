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
}

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}

function AxisLeft({ scale }: AxisLeftProps) {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale]);

    return (
        <g ref={ref}>
            <text
                className="axis-label"
                fill="black"
                rotate={0}
                x={-50}
                y={300}
                fontSize={15}
            >
                Count
            </text>
        </g>
    );
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return (
        <g ref={ref} transform={transform}>
            <text
                className="axis-label"
                fill="black"
                x={380}
                y={50}
                rotate={0}
                fontSize={15}
            >
                Fruit
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

export function BarChart({ data }: BarChartProps) {
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

    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <text x={350} y={-45} fontSize={30}>
                    Title
                </text>
                <AxisBottom
                    scale={scaleX}
                    transform={`translate(0, ${height})`}
                />
                <AxisLeft scale={scaleY} />
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
