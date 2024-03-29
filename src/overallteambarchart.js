//Dimensions and margins Bar Chart
var marginOverallTeamBar = { top: 50, right: 30, bottom: 100, left: 50 },
  widthOverallTeamBar = 1000 - marginOverallTeamBar.left - marginOverallTeamBar.right,
  heightOverallTeamBar = 400 - marginOverallTeamBar.top - marginOverallTeamBar.bottom;

var overallTeamBarChartCanvas = d3
  .select("#overall-team-barchart")
  .append("svg")
  .attr("width", widthOverallTeamBar + marginOverallTeamBar.left + marginOverallTeamBar.right)
  .attr("height", heightOverallTeamBar + marginOverallTeamBar.top + marginOverallTeamBar.bottom)
  .append("g")
  .attr("transform","translate(" + marginOverallTeamBar.left + "," + marginOverallTeamBar.top + ")"
  );

  var customDropDownOptions = ["Market Values in Million €", "Average Age", "Number of World Cup Participations", "Percent of players who play abroad", "Goals scored", "Goals against", "Shots Total", "Shots on Target", "Penalties", "Offsides", "Corners", "Fouls commited", "Fouls suffered", "Yellow Cards", "Red Cards"]
  var dropdownOptions = ["market_value","ø-age","wc_particip","abroad_percent","goals_scored","goals_against","shots","shots_on_target","penalties","offsides","corners","fouls_committed","fouls_suffered","yellow_cards","red_cards"]

  function formatSelectedOption(selectedOption){
    var formattedOption;
    for (i=0; i < customDropDownOptions.length; i++){
        if(selectedOption == customDropDownOptions[i]){
          formattedOption = dropdownOptions[i]
        }
    }
    return formattedOption;    
  }
  
//Read the data
d3.csv("./data/wc_teams_infos.csv").then(function(data) {

  //map with all team names
  var allteams = d3.map(data, function(d){return(d.country)}).keys()
  var teamColors = [];
  data.forEach(element => {
     teamColors.push(element.color);
  });
 // = d3.map(data, function(d){return(d.color)}).keys()

  //provide color names:
  var colorScale = d3.scaleOrdinal().domain(allteams)
  .range(teamColors);

  // Dropdown-Button
  d3.select("#select-overall-team-button")
    .selectAll("myOptions")
    .data(customDropDownOptions)
    .enter()
    .append("option")
    .text(function(d) {return d;}) // text showed in the menu
    .attr("value", function(d) {return d;});

  // Add X axis
var x = d3.scaleBand()
  .range([ 0, widthOverallTeamBar ])
  .padding(0.2);
var xAxis = overallTeamBarChartCanvas.append("g")
  .attr("transform", "translate(0," + heightOverallTeamBar + ")")

  // Y axis
var y = d3.scaleLinear()
  .range([ heightOverallTeamBar, 0]);
var yAxis = overallTeamBarChartCanvas.append("g")
  .attr("class", "overall-yaxis")

//tooltip
    var Tooltip = d3.select("#overall-team-barchart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("text-align", "center")
    .style("position", "relative")
    .style("width", "100px")
    .style("color", "white")
    .style("background-color", "#0f4583")
    .style("border", "solid")
    .style("border-color",  "#BDB289")
    .style("border-width", "2px")
    .style("border-radius", "10px")
    .style("padding", "5px")

  // Updates all values
  function updateOverallTeamBarChart(selectedOption) {
      // X axis
      x.domain(data.map(function(d) { return d.country; }))
      xAxis.transition().duration(1000).call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", 30)
  
      // Add Y axis
      y.domain([0, d3.max(data, function(d) { return +d[selectedOption] }) ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

     //functions that change the tooltip at hover / move / leave 
     var mouseover = function(d) {
       Tooltip.style("opacity", 1)
       d3.select(this)
         .style("stroke", "#BDB289")
         .style("stroke-width", 2)
         .style("opacity", 0.8)
     }
     var mousemove = function(d) {
       Tooltip
         .html("Value: " + d[selectedOption])
         .style("left", (d3.mouse(this)[0]+45) + "px")
         .style("top", (d3.mouse(this)[1])-400 + "px")
     }
     var mouseleave = function(d) {
       Tooltip
         .style("opacity", 0)
       d3.select(this)
         .style("stroke", "none")
         .style("opacity", 1)
       }
  
       //map data to existing bars
      var updateBar = overallTeamBarChartCanvas.selectAll("rect")
        .data(data)

      // update bars
      updateBar
        .enter()
        .append("rect")
        .merge(updateBar)
        .transition()
          .duration(1000)
            .attr("x", function(d) { return x(d.country); })
            .attr("y", function(d) { return y(d[selectedOption]); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return heightOverallTeamBar - y(d[selectedOption]); })
            .attr("fill", function(d){return colorScale(d.country) })
            
      
      overallTeamBarChartCanvas.selectAll("rect")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

      //update image labels
      var updateBarImage = overallTeamBarChartCanvas.selectAll("image")
          .data(data)
        
      updateBarImage.exit().remove();

      updateBarImage.enter()
          .append("image")
          .merge(updateBarImage)
          .transition()
            .duration(1000)
              .attr("x", function(d) { return x(d.country); })
              .attr("y", function(d) { return y(d[selectedOption]) - 17; })
              .attr("xlink:href",function(d) {return d.flag})
              .attr("height", 18.5)
              .attr("width", 24);
    }

    //initialize plot
    updateOverallTeamBarChart('market_value')
    
    // When the button is changed, run the updateChart function
    d3.select("#select-overall-team-button").on("change", function(d) {
      var selectedOption = formatSelectedOption(d3.select(this).property("value"));
      updateOverallTeamBarChart(selectedOption);
    });

});
