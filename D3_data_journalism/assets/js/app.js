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
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  
// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Load data from Census data.csv and convert to numerical values
d3.csv("assets/data/data.csv").then(function(CensusData) {
  CensusData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    // console.log(data);
  });

  //Create X & Y Scales
  var xScale = d3.scaleLinear()
    .domain(d3.extent(CensusData, d => d.healthcare))
    .range([0, chartWidth])
    .nice(); 

  var yScale = d3.scaleLinear()
    .domain([6,d3.max(CensusData, d => d.poverty)])
    .range([chartHeight, 0])
    .nice();
  
  //Create Axes
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

//Append axes to the chartGroup
// set x to the bottom of the chart
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

// set y to the y axis
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
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 13})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .text("Healthcare %");

        chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (chartHeight / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .text("Poverty %");

}).catch(function(error) {
  console.log(error);
});


