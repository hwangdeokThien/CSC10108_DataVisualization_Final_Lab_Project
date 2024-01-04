import * as d3 from "d3";

import { useRef, useEffect } from "react";
import {
    axisBottom,
    axisLeft,
    ScaleBand,
    scaleBand,
    ScaleLinear,
    scaleLinear,
    select,
    axisRight,
} from "d3";
import { arEG } from "date-fns/locale/ar-EG";
import { join } from "path";

export interface Data {
    label: string;
    value1: number;
    value2: number;
}

interface BarChartProps {
    data: Data[];
    title: string;
    xlabel: string;
    ylabel: string;
    height: number;
    width: number;
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
    //data: BarChartProps["data"];
    data: {}[]
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}

function AxisLeft({ scale, ylabel, height }: AxisLeftProps) {
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
                textAnchor="middle"
            >
                {xlabel}
            </text>
        </g>
    );
}

function Bars1({ data, height, scaleX, scaleY }: BarsProps) {
    return (
        <>
            {aggregate.map(({ ProductLine, Male }) => (
                <rect
                    key={`bar-${Male}`}
                    x={xScale(ProductLine)}
                    y={scaleY(Male)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(Male)}
                    fill="blue"
                />
            ))}
        </>
    );
}

function Bars2({ data, height, scaleX, scaleY }: BarsProps) {
    return (
        <>
        
            {aggregate.map(({ ProductLine,Female }) => (
                
                <rect
                    key={`bar-${Female}`}
                    x={xScale(ProductLine)}
                    
                    y={scaleY(Female)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(Female)}
                    fill="red"


                />
            ))}
            
        </>
    );
}


const keys = [
    "Female",
    "Male"
 ]
const aggregate = [
   {
       ProductLine: "Health and beauty",
       Female: 83,
       Male: 70
     },
     {
       ProductLine: "Electronic accessories",
       Male: 78,
       Female: 90
     },
     {
       ProductLine: "Home and lifestyle",
       Female: 83,
       Male: 87
     },
     {
       ProductLine: "Sports and travel",
       Female: 85,
       Male: 89
     },
     {
       ProductLine: "Food and beverages",
       Male: 89,
       Female: 83
     },
     {
       ProductLine: "Fashion accessories",
       Male: 96,
       Female: 83
     }
]

const margin = {
    top: 10,
    right: 10,
    bottom: 40,
    left: 35
}
const width = 800;
const height = 500


const xDomain = aggregate.map(d => d["ProductLine"])

const xScale = scaleBand()
    .domain(xDomain)
    .range([margin.left, width - margin.right - margin.left])
    .padding(0.5)


const xAxis = axisBottom(xScale).tickSizeOuter(0)

const x1 = scaleBand()
    .domain(keys)
    .rangeRound([0, xScale.bandwidth()]) // here we use rangeRound instead of range because we're using values computed by xScale, which may not be whole numbers, and we need whole numbers to avoid errors.
    .padding(0.01)

const yScale = scaleLinear()
    .domain([0, d3.max(aggregate, d => d3.max(keys, key => d[key]))]) // in each key, look for the maximum number
    .rangeRound([height - margin.bottom, margin.top])

const yAxis = d3.axisLeft(yScale).tickSizeOuter(0)

const color = d3.scaleOrdinal(["red", "blue"])
export function DualBarChart({ data, title, xlabel, ylabel, height, width }: BarChartProps) {
    ylabel = "Number of customers"
    return (
        <svg
            className="m-auto"
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${xScale(["ProductLine"])},0)`}>
                
                <text x={width / 2} y={-45} fontSize={25} textAnchor="middle">
                    {title}
                </text>
                <AxisBottom
                    scale={xScale}
                    transform={`translate(0, ${height})`}
                    xlabel={xlabel}
                    width={width}
                />
                <AxisLeft scale={yScale} ylabel={ylabel} height={height} />
        
                <Bars1
                    data={keys}
                    height={height}
                    scaleX={xScale}
                    scaleY={yScale}
                />
                <Bars2
                    data={keys}
                    height={height}
                    scaleX={xScale}
                    scaleY={yScale}
                />
            </g>
        </svg>
    );
}
