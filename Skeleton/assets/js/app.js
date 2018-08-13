// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv", function(error, usCensusData) {
  if (error) throw error;

  usCensusData.forEach(function(data) {   
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.obesityLow = +data.obesityLow;
    data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;

    // console.log(data)
  });


  // Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(usCensusData, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(usCensusData, d => d.smokes)])
    .range([height, 0]);


// Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

    // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(usCensusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.smokes))
  .attr("r", "15")
  .attr("fill", "red")
  .attr("opacity", ".5");


// Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("click", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smoking Rate");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty %");
});  

