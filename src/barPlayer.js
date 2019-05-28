d3.csv("./data/World_cup_2018_players_complete.csv").then(function (data) {

    // // When the button is changed, run the updateChart function
    // d3.select("#select-team-button-left").on("change", function (a) {
    //     var selectedOptionLeft = d3.select(this).property("value")
    //     console.log("Option Left for Player:" + selectedOptionLeft)
    //     updatePlayerLeft(selectedOptionLeft)

    // })

    const canvPlayerHeight = 75;

    const svgPicturePlayerLeft = d3.select("#player-picture-left").append("svg")
        .attr("width", "50%")
        .attr("height", 200)
        .attr("x", "38%")
        .attr("y", "73%")
        .style("horizontal-align", "middle");
    
    const svgPicturePlayerRight = d3.select("#player-picture-right").append("svg")
        .attr("width", "50%")
        .attr("height", 200)
        .style("horizontal-align", "middle");

    const svgAppreances = d3.select("#player-stats-appearances").append("svg")
        .attr("width", "100%")
        .attr("height", canvPlayerHeight)
        .style("horizontal-align", "middle");

    const svgGoals = d3.select("#player-stats-goals").append("svg")
        .attr("width", "100%")
        .attr("height", canvPlayerHeight)
        .style("horizontal-align", "middle");

    const svgCaps = d3.select("#player-stats-caps").append("svg")
        .attr("width", "100%")
        .attr("height", canvPlayerHeight)
        .style("horizontal-align", "middle");

    const svgMinutes = d3.select("#player-stats-minutes").append("svg")
        .attr("width", "100%")
        .attr("height", canvPlayerHeight)
        .style("horizontal-align", "middle");

    const svgRating = d3.select("#player-stats-rating").append("svg")
        .attr("width", "100%")
        .attr("height", canvPlayerHeight)
        .style("horizontal-align", "middle");

    
    // Left Player Section        
    svgPicturePlayerLeft.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("alignment-baseline", "middle")
        .attr("fill", "rgb(244, 244, 244)");

    svgPicturePlayerLeft.append("image")
        .attr("x", "22%")
        .attr("y", "40%")
        .attr("transform", "translate(-50, -50)")
        .data(data)
        .attr("xlink:href", "https://cdn.sofifa.org/players/10/19/170828.png")
        .attr("width", 100);

    svgPicturePlayerLeft.append("image")
        .attr("x", "22%")
        .attr("y", "92%")
        .attr("transform", "translate(-50, -50)")
        .attr("xlink:href", "./images/player_line.svg")
        .attr("width", 110);

    svgPicturePlayerLeft.append("text")
        .attr("x", "38%")
        .attr("y", "25%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "180%")
        .style("text-anchor", "start")
        .attr("font-family", "dusha")
        .style("font-weight", "bold")
        .attr("fill", "#171714")
        .text(data[15].FullName);

    svgPicturePlayerLeft.append("text")
        .attr("x", "38%")
        .attr("y", "45%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "120%")
        .attr("font-weight", "bold")
        .attr("fill", "grey")
        .text("Position: " + data[15].Position);

    svgPicturePlayerLeft.append("text")
        .attr("x", "38%")
        .attr("y", "59%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "120%")
        .attr("font-weight", "bold")
        .attr("fill", "grey")
        .text("Age: " + data[15].Age);

    svgPicturePlayerLeft.append("text")
        .attr("x", "38%")
        .attr("y", "73%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "120%")
        .attr("font-weight", "bold")
        .attr("fill", "grey")
        .text("Value: " + data[15].Value);

    // Right Player Section        
    svgPicturePlayerRight.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("alignment-baseline", "middle")
        .attr("fill", "rgb(244, 244, 244)");

        svgPicturePlayerRight.append("image")
        .attr("x", "22%")
        .attr("y", "40%")
        .attr("transform", "translate(-50, -50)")
        .data(data)
        .attr("xlink:href", "https://cdn.sofifa.org/players/10/19/170828.png")
        .attr("width", 100);

        svgPicturePlayerRight.append("image")
        .attr("x", "22%")
        .attr("y", "92%")
        .attr("transform", "translate(-50, -50)")
        .attr("xlink:href", "./images/player_line.svg")
        .attr("width", 110);

        svgPicturePlayerRight.append("text")
        .attr("x", "38%")
        .attr("y", "25%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "180%")
        .style("text-anchor", "start")
        .attr("font-family", "dusha")
        .style("font-weight", "bold")
        .attr("fill", "#171714")
        .text(data[15].FullName);

        svgPicturePlayerRight.append("text")
        .attr("x", "38%")
        .attr("y", "45%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "120%")
        .attr("font-weight", "bold")
        .attr("fill", "grey")
        .text("Position: " + data[15].Position);

        svgPicturePlayerRight.append("text")
        .attr("x", "38%")
        .attr("y", "59%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "120%")
        .attr("font-weight", "bold")
        .attr("fill", "grey")
        .text("Age: " + data[15].Age);

        svgPicturePlayerRight.append("text")
        .attr("x", "38%")
        .attr("y", "73%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "120%")
        .attr("font-weight", "bold")
        .attr("fill", "grey")
        .text("Value: " + data[15].Value);

    console.log("Name", data[15].FullName)

    var currentWidth = parseInt(d3.select("#player-stats-appearances").style("width"));

    var startXLineRight = (currentWidth / 2) - 80;
    var startXLineLeft = (currentWidth / 2) + 80;

    console.log(window.innerWidth);
    console.log(svgAppreances.style("width"));

    const widthDomainAppearances = d3.extent(data, d => Number(d.Appearances));
    const widthDomainGoals = d3.extent(data, d => Number(d.Goals));
    const widthDomainCaps = d3.extent(data, d => Number(d.Caps));
    const widthDomainMinutes = d3.extent(data, d => Number(d.Minutes));
    const widthDomainRating = d3.extent(data, d => Number(d.Rating));

    function playerBar(svg, barTitle, barDetails, scorePlayerLeft, scorePlayerRight,
        playerLeft, playerRight, widthDomain, startXLineRight, startXLineLeft) {

        var containerWidth = currentWidth;
        var endXLineRight = ((containerWidth / 10));
        var endXLineLeft = ((containerWidth / 10) * 9)
        var endXScoreLineRight = (((startXLineRight - endXLineRight) / widthDomain[1]) * scorePlayerLeft);
        var endXScoreLineLeft = (((endXLineLeft - startXLineLeft) / widthDomain[1]) * scorePlayerRight) + (containerWidth / 2) + 80;

        console.log("EndXLine", endXLineRight);
        console.log("EndXScoreLineRight", endXScoreLineRight);
        console.log("EndScoreLineLeft", endXScoreLineLeft)
        console.log("ENDXLINE", endXLineLeft)
        console.log("StartXLineLeft", startXLineLeft);
        console.log("Property", containerWidth);

        // Background Color
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("alignment-baseline", "middle")
            .attr("fill", "white");

        // Texts Title
        svg.append("text")
            .attr("x", "50%")
            .attr("y", "55%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "120%")
            .style("text-anchor", "middle")
            .attr("font-weight", "bold")
            .attr("fill", "#171714")
            .text(barTitle);

        // svg.append("text")
        //     .attr("y", 55)
        //     .attr("x", 190)
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", "15px")
        //     .style("text-anchor", "start")
        //     .attr("fill", "grey")
        //     .text("How many times...")
        //     .on("mouseover", function (d, i) {
        //         d3.select(this).transition()
        //             .style("opacity", 0)
        //             .transition()
        //             .text(barDetails)
        //             .duration("300")
        //             .style("opacity", 1)
        //             .transition()
        //             .duration("300")
        //     })
        //     .on("mouseout", function (d, i) {
        //         d3.select(this).transition()
        //             .style("opacity", 0)
        //             .transition()
        //             .text("How many times ...")
        //             .duration("300")
        //             .style("opacity", 1)
        //             .transition()
        //             .duration("300")
        //     });

        // Texts Numbers
        svg.append("text")
            .attr("y", "55%")
            .attr("x", "8%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .style("text-anchor", "end")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .text(scorePlayerLeft);

        svg.append("text")
            .attr("y", "55%")
            .attr("x", "93%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .text(scorePlayerRight);

        // Texts Player Labels
        svg.append("text")
            .attr("y", 115)
            .attr("x", 389)
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .style("text-anchor", "end")
            .text(playerLeft);

        svg.append("text")
            .attr("y", 115)
            .attr("x", 409)
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .style("text-anchor", "start")
            .text(playerRight);

        // First Row Left
        svg.append("line")
            .attr("x1", endXLineRight)
            .attr("y1", "47%")
            .attr("x2", startXLineRight)
            .attr("y2", "47%")
            .attr("stroke", "rgb(244, 244, 244)")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);

        svg.append("line")
            .attr("x1", startXLineRight)
            .attr("y1", "47%")
            .attr("x2", startXLineRight)
            .attr("y2", "47%")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("x1", startXLineRight)
                    .transition()
                    .duration(1000)
                    .attr("x1", startXLineRight - endXScoreLineRight)
            })
            .transition()
            .duration(500)
            .attr("x1", startXLineRight - endXScoreLineRight)
            .attr("y1", "47%")
            .attr("x2", startXLineRight)
            .attr("y2", "47%")
            .attr("stroke", "#D30208")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);


        svg.append("rect")
            .attr("width", 12)
            .attr("height", 20)
            .attr("x", startXLineRight)
            .attr("y", "33.65%")
            .attr("fill", "#D30208");



        // First Row Right
        svg.append("line")
            .attr("x1", startXLineLeft)
            .attr("y1", "47%")
            .attr("x2", endXLineLeft)
            .attr("y2", "47%")
            .attr("stroke", "rgb(244, 244, 244)")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);

        svg.append("line")
            .attr("x1", startXLineLeft)
            .attr("y1", "47%")
            .attr("x2", startXLineLeft)
            .attr("y2", "47%")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("x1", startXLineLeft)
                    .transition()
                    .duration(1000)
                    .attr("x1", endXScoreLineLeft)
            })
            .transition()
            .duration(500)
            .attr("x1", endXScoreLineLeft)
            .attr("y1", "47%")
            .attr("x2", startXLineLeft)
            .attr("y2", "47%")
            .attr("stroke", "#D30208")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);

        svg.append("rect")
            .attr("width", 12)
            .attr("height", 20)
            .attr("x", startXLineLeft - 9.9)
            .attr("y", "33.65%")
            .attr("fill", "#D30208");

        // Balken-Texts
        svg.append("line")
            .attr("x1", endXLineRight + 3)
            .attr("y1", "30%")
            .attr("x2", endXLineRight + 3)
            .attr("y2", "90%")
            .attr("stroke", "grey")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 0.5);

        svg.append("text")
            .attr("y", "90%")
            .attr("x", endXLineRight + 7)
            .attr("fill", "grey")
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .style("text-anchor", "start")
            .text(widthDomain[1] + " " + barTitle);
    }

    function initializeStats(startXLineRight, startXLineLeft) {

        playerBar(svgAppreances, "Appearances", "How many times a player has appeared in all of the games.",
            data[15].Appearances, data[16].Appearances,
            data[15].Name, data[15].Name,
            widthDomainAppearances,
            startXLineRight, startXLineLeft);

        playerBar(svgGoals, "Goals", "How many ...",
            data[15].Goals, data[17].Goals,
            data[15].Name, data[15].Name,
            widthDomainGoals,
            startXLineRight, startXLineLeft);

        playerBar(svgCaps, "Caps", "How many ...",
            data[15].Caps, data[18].Caps,
            data[15].Name, data[15].Name,
            widthDomainCaps,
            startXLineRight, startXLineLeft);

        playerBar(svgMinutes, "Minutes", "How many ...",
            data[15].Minutes, data[1].Minutes,
            data[15].Name, data[15].Name,
            widthDomainMinutes,
            startXLineRight, startXLineLeft);

        playerBar(svgRating, "Rating", "How many ...",
            data[15].Rating, data[13].Rating,
            data[15].Name, data[15].Name,
            widthDomainRating,
            startXLineRight, startXLineLeft);


    }

    function updatePlayerLeft(selectedOptionLeft) {
        var selectedTeamPlayers = data.filter(function (d) { return d.Team == selectedOptionLeft })
        console.log(selectedTeamPlayers[0])

        d3.select("#select-player-button-left")
            .selectAll("myOptions")
            .data(selectedTeamPlayers)
            .enter()
            .append("option")
            .text(function (d) { return d.Player; }) // text showed in the menu
            .attr("value", function (d) { return d; });

        console.log("BABRBBLRWABJRALKIOJHR", selectedTeamPlayers[0])
    }

    updatePlayerLeft("Argentina");

    initializeStats(startXLineRight, startXLineLeft);

    window.addEventListener('resize', function () {
        currentWidth = parseInt(d3.select("#player-stats-appearances").style("width"));
        startXLineRight = (currentWidth / 2) - 80;
        startXLineLeft = (currentWidth / 2) + 80;
        initializeStats(startXLineRight, startXLineLeft);

    });


});