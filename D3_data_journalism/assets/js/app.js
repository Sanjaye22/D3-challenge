// @TODO: YOUR CODE HERE!
//Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  
// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Load data from Census data.csv and format numerical values
d3.csv("assets/data/data.csv").then(function(CensusData) {
  CensusData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    // console.log(data);
  });

  //Create X & Y Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(CensusData, d => d.healthcare))
    .range([0, width])
    .nice(); 

  const yScale = d3.scaleLinear()
    .domain([6,d3.max(CensusData, d => d.poverty)])
    .range([height, 0])
    .nice();
  
  //Create Axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);


//Append axes to the chartGroup
// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
  chartGroup.append("g").call(yAxis);

//Build scatter plot
//Create code to build the scatter chart using the Census data
chartGroup.selectAll("circle")
.data(CensusData)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.healthcare))
.attr("cy", d=>yScale(d.poverty))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.75);

//============add texts to each datapoint=========
chartGroup.append("g")
  .selectAll('text')
  .data(CensusData)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x",d=>xScale(d.healthcare))
  .attr("y",d=>yScale(d.poverty))
  .classed(".stateText", true)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "10px")
  .style("font-weight", "bold")
  .attr("alignment-baseline", "central");
  
  //============add axes titles=========
  chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .text("Healthcare %");

        chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .text("Poverty %");

}).catch(function(error) {
  console.log(error);
});


//     const render = data => {
//     const title = 'Poverty vs Healthcare'
//     const xValue = d => d.poverty;
//     const xAxisLabel = "TBD";

//     const yValue = d => d.healthcare;
//     const circleRadius = 10;
//     const yAxisLabel = "weight";

//     const margin = { top: 50, right: 40, bottom: 88, left: 150 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const xScale = ScaleLinear()
//         .domain(extent(data, xValue));
//             .range([0, innerWidth])
//             .nice();

//     const yScale = ScaleLinear()
//         .domain(extent(data, yValue))
//         .range([0, innerHeight])
//         .nice();
       
//     const g = svg.append("g")
//         .attr("transform", 'translate(${margin.left}, ${margin.top}');

//     // const xAxisTickFormat = number => 
//     //     format('.3s')(number)
//     //         .replace('G', 'B');
    
//     const xAxis = axisBottom(xScale)
//         // .tickFormat(xAxisTickFormat)
//         .tickSize(-innerHeight)
//         .tickPadding(15);

//     const yAxis = axisleft(yScale)
//          .tickSize(-innerWidth)
//          .tickPadding(10);
    
//     const yAxisG = g.append('g').call(yAxis);
//     yAsixG.SelectAll('.domain').remove();

//     yAxisG.append('text')
//         .attr('class', 'axis-label')
//         .attr('y', 75)
//         .attr('x', innerWidth / 2)
//         .attr('fill', 'black')
//         .attr(xAxisLabel);

//     g.selectAll('circle').data(data)
//         .enter().append('circle')
//         .attr('cy', d => yScale(yValue(d)))
//         .attr('cx', d => xScale(yValue(d)))
//         .attr('r', 'circleRadius');

//     g.append('text')
//         .attr('class', 'title')
//         .attr('y', -10)
//         .text(title);

    
//     };
//     csv("assets/data/data.csv").then(data => {
//         data.forEach(d => {
//             d.poverty = +d.poverty;            
//     })});

//     render(data);

// });
   

