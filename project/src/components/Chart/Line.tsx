import * as React from "react";
import * as d3 from "d3";

interface LinePlotProps {
    data: number[];
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}

const LinePlot: React.FC<LinePlotProps> = ({
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
}) => {
    const x = d3.scaleLinear(
        [0, data.length - 1],
        [marginLeft, width - marginRight]
    );
    const y = d3.scaleLinear(d3.extent(data) as [number, number], [
        height - marginBottom,
        marginTop,
    ]);
    const line = d3
        .line<number>()
        .x((d, i) => x(i))
        .y(y);

    return (
        <svg width={width} height={height}>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                d={line(data) || undefined}
            />
            <g fill="white" stroke="currentColor" strokeWidth={1.5}>
                {data.map((d, i) => (
                    <circle key={i} cx={x(i) || 0} cy={y(d) || 0} r={2.5} />
                ))}
            </g>
        </svg>
    );
};

export default LinePlot;
