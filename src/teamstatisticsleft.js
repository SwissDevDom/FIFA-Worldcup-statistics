
var marginInfosLeft = { top: 10, right: 100, bottom: 30, left: 30 },
    widthInfosLeft = 400 - marginInfosLeft.left - marginInfosLeft.right,
    heightInfosLeft = 200 - marginInfosLeft.top - marginInfosLeft.bottom;

// set the dimensions and margins of the graph
var marginTeamBarLeft = { top: 10, right: 200, bottom: 30, left: 30 },
    widthTeamBarLeft = 650 - marginTeamBarLeft.left - marginTeamBarLeft.right,
    heightTeamBarLeft = 600 - marginTeamBarLeft.top - marginTeamBarLeft.bottom;

// append the svg object to the body of the page
var genralInfoCanvasLeft = d3
  .select("#team-statistics-left")
  .append("svg")
  .attr("width", widthInfosLeft + marginInfosLeft.left + marginInfosLeft.right)
  .attr("height", heightInfosLeft + marginInfosLeft.top + marginInfosLeft.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarLeft.left + "," + marginTeamBarLeft.top + ")");

var teamBarChartCanvasLeft = d3
  .select("#team-barchart-left")
  .append("svg")
  .attr("width", widthTeamBarLeft + marginTeamBarLeft.left + marginTeamBarLeft.right)
  .attr("height", heightTeamBarLeft + marginTeamBarLeft.top + marginTeamBarLeft.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarLeft.left + "," + marginTeamBarLeft.top + ")");

var teamCategories = [
  "matches_played",
  "goals_scored",
  "goals_against",
  "shots",
  "shots_on_target",
  "penalties",
  "offsides",
  "corners",
  "fouls_committed",
  "fouls_suffered",
  "yellow_cards",
  "red_cards"
];

//Read the data
Promise.all([
  d3.csv("/data/wc_teams_infos.csv"),
  d3.csv("/data/wc_team_stats.csv")
]).then(function(data) {
  console.log(data[0][0])
  console.log(data[1][0])

  //map with all team names
  var allteamsLeft = d3.map(data[1], function(d){return(d.country)}).keys()

  // Dropdown-Button left
  d3.select("#select-team-button-left")
    .selectAll("myOptions")
    .data(allteamsLeft)
    .enter()
    .append("option")
    .text(function(d) {return d;}) // text showed in the menu
    .attr("value", function(d) {return d;});

    // .text(function(d) {return d.country;}) // text showed in the menu
    // .attr("value", function(d, i) {return i;});

  // generate a random index value and set the selector to the team
  // at that index value in the data array
  var indexLeft = 0;
  //d3.select("#select-team-button-left").property("selectedIndex", index);
  // console.log(index);

  //Flag
  genralInfoCanvasLeft
    .append("image")
    .data(data)
    .attr("id", "flag-left")
    .attr("y", 40)
    .attr("x", 0)
    .attr("xlink:href", function(d) {
      return data[0][indexLeft]["flag"];
    })
    .attr("height", 110);
  d3.select("#flag-left").style('transform', 'translate(14%, 0)')


  d3.select("#final-placement-left")
    .append("text")
    .data(data)
    // .attr("y", 200)
    // .attr("x", 0)
    .text(function(d) {
      return data[0][indexLeft]["final_placement"];
    });

  d3.select("#market-value-left")
    .append("text")
    .data(data)
    // .attr("y", 200)
    // .attr("x", 0)
    .text(function(d) {
      return "Market value: " + (data[0][indexLeft]["market_value"] + " Million €");
    });

  /* Bar Chart */
  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([0, 120])
    .range([widthTeamBarLeft,0]);
  teamBarChartCanvasLeft
    .append("g")
    .attr("transform", "translate(0," + heightTeamBarLeft + ")")
    .call(d3.axisBottom(x))
    .style("opacity", 0)    

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, heightTeamBarLeft])
    .domain(teamCategories)
    .padding(0.1);
  teamBarChartCanvasLeft
    .append("g")
    .attr("transform", "translate( " + widthTeamBarLeft + ", 0 )")
    .attr("dx", ".75em")
    .call(d3.axisRight(y).tickSize([0]))
    .selectAll("text")
    .attr("transform", "translate(30,0)")
    .style("font-size", 20)
    .style("font-weight", "bold");

  //Bars
  teamBarChartCanvasLeft.selectAll("bar")
    .data(data[1].filter(function(d){return d.country==allteamsLeft[0]}))
    .enter()
    .append("rect")
    .attr("x", function(d) {return x(d.value);})
    .attr("y", function(d) {return y(d.category);})
    .attr("width", function(d) {return widthTeamBarLeft - x(d.value);})
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2");

  //Bar Label
  teamBarChartCanvasLeft.selectAll(".text")  		
    .data(data[1].filter(function(d){return d.country==allteamsLeft[0]}))
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return x(d.value) - 25;  }  ))
    .attr("y", function(d) { return y(d.category) + 14; })
    .style("font-weight", "bold")
    .attr("dy", ".75em")
    .text(function(d) { return d.value; });   	

  // Updates the chart
  function updateLeftTeam(selectedGroupLeft) {

    // Create new generalInfo data with selection
    var generalInfoDataFilterLeft = data[0].filter(function(d){return d.country==selectedGroupLeft})

    //Flag
    d3.selectAll("#flag-left")
      .data(generalInfoDataFilterLeft)
      .attr("id", "flag-left")
      .attr("xlink:href", function(d) {
        return generalInfoDataFilterLeft[0]["flag"];
      })
      .attr("height", 110);

    d3.select("#final-placement-left")
      .data(data)
      .attr("y", 200)
      .attr("x", 0)
      .text(function(d) {
        return generalInfoDataFilterLeft[0]["final_placement"];
      });

    d3.select("#market-value-left")
      .data(data)
      .text(function(d) {
        return "Market value: " + (generalInfoDataFilterLeft[0]["market_value"] + " Million €");
      });

    // Create new barChart data with selection
    var barChartDataFilterLeft = data[1].filter(function(d){return d.country==selectedGroupLeft})

    // variable to map data to existing bars
    var updateBarsLeft = teamBarChartCanvasLeft.selectAll("rect")
      .data(barChartDataFilterLeft)
    
    // Pass data to update bar
    updateBarsLeft.enter()
    .append("rect")
    .merge(updateBarsLeft)
      .transition()
      .duration(1000)
        .attr("x", function(d) {return x(d.value);})
        .attr("y", function(d) {return y(d.category);})
        .attr("width", function(d) {return widthTeamBarLeft - x(d.value);})
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2");

    // variable to map data to existing barText
    var updatetextLeft = teamBarChartCanvasLeft.selectAll(".label")
      .data(barChartDataFilterLeft)
    
    updatetextLeft.exit().remove();
    
    updatetextLeft.enter()
    .append("text")
    .merge(updatetextLeft)
    .transition()
      .duration(1000)
        .attr("class","label")
        .attr("x", (function(d) { return x(d.value) - 25;  }  ))
        .attr("y", function(d) { return y(d.category) + 14; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });   
  }

  // When the button is changed, run the updateChart function
  d3.select("#select-team-button-left").on("change", function(d) {
      var selectedOptionLeft = d3.select(this).property("value")
      console.log("Option Left:"+selectedOptionLeft)
      updateLeftTeam(selectedOptionLeft)
  })
});