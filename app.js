var states = ["AL",
"AK",
"AZ",
"AR",
"CA",
"CO",
"DE",
"DC",
"FL",
"GA",
"HI",
"ID",
"IL",
"IN",
"KS",
"KY",
"LA",
"ME",
"MD",
"MA",
"MI",
"MN",
"MS",
"MO",
"MT",
"NE",
"NV",
"NH",
"NJ",
"NM",
"NY",
"NC",
"ND",
"OH",
"OK",
"OR",
"PA",
"RI",
"SC",
"SD",
"TN",
"TX",
"UT",
"VT",
"VA",
"WA",
"WV",
"WI",
"WY"]

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
d3.csv("data1.csv", function(err, usCensusData) {
  if (err) throw err;

  // Step 1: Parse Data/Cast as numbers
   // ==============================
  usCensusData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.smokes = +data.smokes;
  });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(usCensusData, d => d.poverty)])
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


  var circlesGroup  = chartGroup.selectAll("circle")
           .data(usCensusData)
           .enter()
           .append("circle")
           .attr("cx", d => xLinearScale(d.poverty))
           .attr("cy", d => yLinearScale(d.smokes))
           .attr("r", 7)
           .attr("fill", "pink")
           .attr("opacity", ".5");

        var labels = chartGroup.selectAll("text")
           .data(usCensusData)
           .enter()
           .append("text")
           // Add your code below this line
           .attr("x", (d) => xLinearScale(d.poverty))
           .attr("y", (d) => yLinearScale(d.smokes))
           .text((d) => d.abbr);



// var node = chartGroup.selectAll("g")
// .data(usCensusData)
// .enter()
// .append("g");
//
// node.append("circle")
//     // .attr("class", "dot")
//     // .attr("dot", function(d) { return xLinearScale(d.poverty); })
//     // .attr("dot", function(d) { return yLinearScale(d.smokes); })
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.smokes))
//     .attr("r", "5")
;
//
// node.append("text")
// .attr("cx", function(d) { return (d.poverty); })
// .attr("cy", function(d) { return (d.smokes); })
// .text(function(d){
//           return d.abbr;
// });

  //  Step 5: Create Circles
  // ==============================
  // var circlesGroup = chartGroup.selectAll("circle")
  // .data(usCensusData)
  // .enter()
  // .append("circle")
  // .attr("cx", d => xLinearScale(d.poverty))
  // .attr("cy", d => yLinearScale(d.smokes))
  // .attr("r", "15")
  // .attr("fill", "pink")
  // .attr("opacity", ".5")
  // .text(function(d){
  //         return d.abbr;});
  //
  // circlesGroup.append("text")
  //               	    .attr("r", function(d){return -20})
  //               	    .text(function(d){return d.abbr});

  // var labels = chartGroup.selectAll("text")
  //      .data(usCensusData)
  //      .enter()
  //      .append("text")
  //      // Add your code below this line
  //      .attr("x", (d) => d[0]+5)
  //      .attr("y", (d) => h - d[1])
  //      .text((d) => d.abbr);
       // Add your code above this line

  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Smoking: ${d.smokes}`);
    });

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
    .text("Incidence of Smoking by State");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty Rate");
});
