import * as d3 from "d3";
    datapath = "./../data/q3.csv";
    data = d3.csv(datapath);
    productline = d3.rollup(data, v => v.length, d => d.ProductLine, d => d.Gender)

    
    aggregate = Array.from(productline, ([ProductLine, count]) => {
        obj = {};
        for (const [Gender, num] of count) {
        obj.ProductLine = ProductLine;
        obj[Gender] = num;
        }
        return obj;
    })
    height = 500
    //var width = 800
    margin = ({
        top: 10,
        right: 10,
        bottom: 40,
        left: 35
    })
    xDomain = aggregate.map(d => d["ProductLine"])

    xScale = d3
        .scaleBand()
        .domain(xDomain)
        .range([margin.left, width - margin.right - margin.left])
        .padding(0.1)

    xAxis = d3.axisBottom(xScale).tickSizeOuter(0)
    keys = Object.keys(aggregate[0]).slice(1)

    x1 = d3
        .scaleBand()
        .domain(keys)
        .rangeRound([0, xScale.bandwidth()]) // here we use rangeRound instead of range because we're using values computed by xScale, which may not be whole numbers, and we need whole numbers to avoid errors.
        .padding(0.05)

    yScale = d3
    .scaleLinear()
        .domain([0, d3.max(aggregate, d => d3.max(keys, key => d[key]))]) // in each key, look for the maximum number
        .rangeRound([height - margin.bottom, margin.top])
    //setFilterDataQ3(aggregate);

    yAxis = d3.axisLeft(yScale).tickSizeOuter(0)

    color = d3.scaleOrdinal(["rgb(94, 54, 106)", "#0CCA98"])
    svg = d3.select(DOM.svg(width, height));

    // draw the bars
    svg
        .append("g")
        .selectAll("g")
        .data(aggregate)
        .join("g")
        .attr("transform", d => `translate(${xScale(d["year"])},0)`) // place each bar along the x-axis at the place defined by the xScale variable
        .selectAll("rect")
        .data(d => keys.map(key => ({ key, value: d[key] }))) // use the Male/Female keys to access the data separately
        .join('rect')
        .attr("x", d => x1(d.key)) // use the x1 variable to place the grouped bars
        .attr("y", d => yScale(d.value)) // draw the height of the barse using the data from the Male/Female keys as the height value
        .attr("width", x1.bandwidth()) // bar is the width defined by the x1 variable
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("fill", d => color(d.key)); // color each bar according to its key value as defined by the color variable

    // draw the x axis
    // nothing new here
    svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    // draw the y axis
    // nothing new here
    svg
        .append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

    // render the whole chart
    // nothing new here
    return svg.node();
