

var full_dataset;

var svgLinechart;
var svgScatterPlot;
var svgHeatmap;

var labelIndex;

var SCATTERPLOT_W = 550;
var SCATTERPLOT_H = 450;

var SCATTERPLOT_PADDING = 40;


var LINECHART_W = 600;
var LINECHART_H = 400;

var LINECHART_PADDING = 30;



var HEATMAP_W = 900;
var HEATMAP_H = 350;

var HEATMAP_PADDING = 50;

function generateScatterplot(){
	d3.json("OutputTask3.json", function (data) {
		full_dataset = data;
		gen_vis_scatterplot(full_dataset)
	});

}

function generateHeatMap(){
	d3.json("OutputTask5.json", function (data) {
		full_dataset = data;
		gen_vis_heatmap(full_dataset)
	});
}

function generateLinechart(){
	d3.json("OutputTask2.json", function (data) {
		full_dataset = data;
		gen_vis_linechart(full_dataset)
	});
}


generateHeatMap();
generateScatterplot();
generateLinechart();




//-----------------------linechart------------------------


function alterRatingInHeatmap(ratingIndex){
	
	var w = HEATMAP_W;
    var h = HEATMAP_H;
    var padding = HEATMAP_PADDING;
	
	var rectHeight = (h-padding*2)/4;
	
	
	var rects = svgHeatmap.selectAll("rect");
	var texts = svgHeatmap.selectAll("text");
	for(var i = 0; i < rects[0].length; i++){
		if(parseInt(rects[0][i].y.baseVal.value)==parseInt(ratingIndex*((h-(padding*2))/4))){
			if(rects[0][i].style.opacity==0.2){
				d3.select(rects[0][i]).style("opacity",0.2);
			}
			else
			{
				d3.select(rects[0][i]).style("opacity",0.5);
			
			
			}
		}	
	}
}

var axisSelect=0;

function alterValuesToNumberOfReviews(){
	
		
		var w = LINECHART_W;
		var h = LINECHART_H;
		
		var hscale = d3.scale.linear()
			.domain([2000, 5])
			.nice()
			.range([padding, h - padding]);
		
		var xscale = d3.scale.linear()
			.domain([1994, 2014])
			.nice()
			.range([padding, w - padding]);
		
		var xaxis = d3.svg.axis()
			.scale(xscale)
			.tickFormat(d3.format("f"))
			.ticks(10)
			.orient("bottom");
		
		var yaxis = d3.svg.axis()
			.scale(hscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("left");
		
		svgLinechart.selectAll("circle")
			.data(full_dataset)
					.transition().duration(500)
					.attr("cy", function (d) {
								return hscale(d.TotalNumberOfReviews);
							});
		 
		
		svgLinechart.selectAll("line")
			.data(full_dataset)
				.transition().duration(1000)
				 .attr("y1", function (d, i) {
					 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
							return hscale(full_dataset[i - 1].TotalNumberOfReviews);
					 }
				 })
				 
				 .attr("y2", function (d, i) {
					 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
							return hscale(full_dataset[i].TotalNumberOfReviews);
					 }
				 });

			svgLinechart.selectAll("text").data(full_dataset)
					.attr("x", function (d,i) {
						return xscale(full_dataset[i].releaseYear);
					})
					.attr("y", function (d,i) {
						return hscale(full_dataset[i].TotalNumberOfReviews) + 27;
					});
			
			svgLinechart.selectAll("g").remove()
			
			svgLinechart.append("g")
				.attr("class", "axis") //Assign "axis" class
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xaxis)
				.append("text")
				.attr("x", w - padding)
				.attr("y", -6)
				.style("text-anchor", "end")
				.text("ReleaseYear");

			svgLinechart.append("g")
				.attr("class", "axis") //Assign "axis" class
				.attr("transform", "translate(" + padding + ",0)")
				.call(yaxis)
				.append("text")
				.attr("y", padding - 10)
				.attr("x", padding)
				.style("text-anchor", "middle")
				.text(  "Total Number Of Reviews");
			
			
			document.getElementById("avgUserScoreButton").style.background="#C9EEFF";
			document.getElementById("avgMetaScoreButton").style.background="#C9EEFF";
			document.getElementById("numberOfReviewsButton").style.background="#82c3f5";
			axisSelect=2;
	
		
}

function alterValuesToAvgUserScore(){


		var w = LINECHART_W;
		var h = LINECHART_H;

		var hscale = d3.scale.linear()
			.domain([100,40])
			.nice()
			.range([padding, h - padding]);
		
		var xscale = d3.scale.linear()
			.domain([1994, 2014])
			.nice()
			.range([padding, w - padding]);
		
		var xaxis = d3.svg.axis()
			.scale(xscale)
			.tickFormat(d3.format("f"))
			.ticks(10)
			.orient("bottom");
		
		var yaxis = d3.svg.axis()
			.scale(hscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("left");
		
		svgLinechart.selectAll("circle")
			.data(full_dataset)
					.transition().duration(500)
					.attr("cy", function (d) {
								return hscale(d.avgUserScore);
							});
							
		svgLinechart.selectAll("rect").data(full_dataset)
					.attr("x", function (d,i) {
						return xscale(full_dataset[i].releaseYear);
					})
					.attr("y", function (d,i) {
						return hscale(full_dataset[i].avgUserScore) + 5;
					});
		
		svgLinechart.selectAll("line")
			.data(full_dataset)
				.transition().duration(1000)
				 
				 .attr("y1", function (d, i) {
					 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
							return hscale(full_dataset[i - 1].avgUserScore);
					 }
				 })
				 
				 .attr("y2", function (d, i) {
					 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
							return hscale(full_dataset[i].avgUserScore);
					 }
				 });
				 
		svgLinechart.selectAll("text").data(full_dataset)
					.attr("x", function (d,i) {
						return xscale(full_dataset[i].releaseYear)-15;
					})
					.attr("y", function (d,i) {
						return hscale(full_dataset[i].avgUserScore) + 27;
					});
			
			svgLinechart.selectAll("g").remove()
			
			svgLinechart.append("g")
				.attr("class", "axis") //Assign "axis" class
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xaxis)
				.append("text")
				.attr("x", w - padding)
				.attr("y", -6)
				.style("text-anchor", "end")
				.text("ReleaseYear");

			svgLinechart.append("g")
				.attr("class", "axis") //Assign "axis" class
				.attr("transform", "translate(" + padding + ",0)")
				.call(yaxis)
				.append("text")
				.attr("y", padding - 10)
				.attr("x", padding)
				.style("text-anchor", "middle")
				.text(  "Average User Score");
		
			document.getElementById("avgUserScoreButton").style.background="#82c3f5";
			document.getElementById("avgMetaScoreButton").style.background="#C9EEFF";
			document.getElementById("numberOfReviewsButton").style.background="#C9EEFF";
			axisSelect=0;
	
}


function alterValuesToAvgMetaScore(){

		var w = LINECHART_W;
		var h = LINECHART_H;
		

		var hscale = d3.scale.linear()
			.domain([100,40])
			.nice()
			.range([padding, h - padding]);
		
		var xscale = d3.scale.linear()
			.domain([1994, 2014])
			.nice()
			.range([padding, w - padding]);
		
		var xaxis = d3.svg.axis()
			.scale(xscale)
			.tickFormat(d3.format("f"))
			.ticks(10)
			.orient("bottom");
		
		var yaxis = d3.svg.axis()
			.scale(hscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("left");
		
		svgLinechart.selectAll("circle")
			.data(full_dataset)
					.transition().duration(500)
					.attr("cy", function (d) {
								return hscale(d.avgMetaScore);
							});

		

			
		svgLinechart.selectAll("line")
			.data(full_dataset)
				.transition().duration(1000)
				 
				 .attr("y1", function (d, i) {
					 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
							return hscale(full_dataset[i - 1].avgMetaScore);
					 }
				 })
				 
				 .attr("y2", function (d, i) {
					 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
							return hscale(full_dataset[i].avgMetaScore);
					 }
				 });
				 
		svgLinechart.selectAll("text").data(full_dataset)
					.attr("x", function (d,i) {
						return xscale(full_dataset[i].releaseYear);
					})
					.attr("y", function (d,i) {
						return hscale(full_dataset[i].avgMetaScore) - 20;
					});
			
		svgLinechart.selectAll("g").remove()
			
		svgLinechart.append("g")
				.attr("class", "axis") //Assign "axis" class
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xaxis)
				.append("text")
				.attr("x", w - padding)
				.attr("y", -6)
				.style("text-anchor", "end")
				.text("ReleaseYear");

		svgLinechart.append("g")
				.attr("class", "axis") //Assign "axis" class
				.attr("transform", "translate(" + padding + ",0)")
				.call(yaxis)
				.append("text")
				.attr("y", padding - 10)
				.attr("x", padding)
				.style("text-anchor", "middle")
				.text("Average Metascore");

			
				
			document.getElementById("avgUserScoreButton").style.background="#C9EEFF";
			document.getElementById("avgMetaScoreButton").style.background="#82c3f5";
			document.getElementById("numberOfReviewsButton").style.background="#C9EEFF";
			axisSelect=1;
	
}


function colorOf(matRat) {
    switch (matRat) {
		case 'E': return "#7ad5ff";
		case 'E10+': return "#00aeff";
        case 'T': return "blue";
        case 'M': return "#1b2f38";
    }
}

function indexOf(matRat) {
    switch (matRat) {
		case 'E': return 0;
		case 'E10+': return 1;
        case 'T': return 2;
        case 'M': return 3;
    }
}

function yAxisText (full_dataset,select,j) {
	switch(select){
		case 0: return parseInt(full_dataset[j].avgUserScore);
		case 1: return parseInt(full_dataset[j].avgMetaScore);
		case 2: return parseInt(full_dataset[j].TotalNumberOfReviews);
		
	}
}

function linesSelection(i){
			
			var lines = svgLinechart.selectAll("line");
			var circles = svgLinechart.selectAll("circle");
			var texts = svgLinechart.selectAll("text");
			var axises = svgLinechart.selectAll("g");
			var j;
			
			
			lines.attr("opacity", 0.1);
			circles.attr("opacity", 0.1);
			axises.attr("opacity", 0.5);
			
			for(j = i;j < full_dataset.length && full_dataset[j - 1].maturity_rating == full_dataset[j].maturity_rating;j++){
				d3.select(lines[0][j]).attr("stroke-width", 3)
									  .attr("opacity", 0.7);
									  
				d3.select(circles[0][j]).attr("r", 5).attr("opacity", 0.7);
				d3.select(texts[0][j]).text(function(){
														return yAxisText(full_dataset,axisSelect,j);
													   });
			
			}	
			for(j = i;j>0 && full_dataset[j - 1].maturity_rating == full_dataset[j].maturity_rating;j--){
				d3.select(lines[0][j]).attr("stroke-width", 3)
									  .attr("opacity", 0.7);
									  
				d3.select(circles[0][j]).attr("r", 5).attr("opacity", 0.7);
				d3.select(texts[0][j]).text(function(){
														return yAxisText(full_dataset,axisSelect,j);
													   });
				
			}
			
								  
			d3.select(circles[0][j]).attr("r", 5).attr("opacity", 0.7);
			d3.select(texts[0][j]).text(function(){
													return yAxisText(full_dataset,axisSelect,j);
												   });
												   
			
}

function gen_vis_linechart(full_dataset) {

	//initialize button colors
	document.getElementById("avgUserScoreButton").style.background="#82c3f5";
	document.getElementById("avgMetaScoreButton").style.background="#C9EEFF";
	document.getElementById("numberOfReviewsButton").style.background="#C9EEFF";
	
	var w = LINECHART_W;
	var h = LINECHART_H;
	
	
    var hscale = d3.scale.linear()
        .domain([100,40])
        .nice()
        .range([padding, h - padding]);


    var xscale = d3.scale.linear()
        .domain([1994, 2014])
        .nice()
        .range([padding, w - padding]);


    var cscale = d3.scale.linear()
        .domain([70, 100])
        .range(['red', 'blue']);

    var yaxis = d3.svg.axis()
        .scale(hscale)
        .tickFormat(d3.format("f"))
		.ticks(5)
        .orient("left");

    var xaxis = d3.svg.axis()
        .scale(xscale)
        .tickFormat(d3.format("f"))
		.ticks(10)
        .orient("bottom");


    svgLinechart = d3.select("#the_chart_linechart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

	
	
	
    var r = 3;

    var circles = svgLinechart.selectAll("circle").data(full_dataset);
		
    circles.enter()
            .append("circle")
			
                .attr("r", r)
                .attr("fill", function (d) {
                    return colorOf(d.maturity_rating);
                })

                .attr("cx", function (d) {
                    return xscale(d.releaseYear);
                })
                .attr("cy", function (d) {
							return hscale(d.avgUserScore);
						});

	
						
    var lines =svgLinechart.selectAll("line").data(full_dataset);
	
	
	lines.enter()
		.append("line")
		
			.attr("style","cursor: pointer;")
			.attr("opacity", 0.7)
			 .attr("x1", function (d, i) {
				 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating)
					 return xscale(full_dataset[i - 1].releaseYear);
			 })
			 .attr("y1", function (d, i) {
				 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
						return hscale(full_dataset[i - 1].avgUserScore);
				 }
			 })
			 .attr("x2", function (d, i) {
				 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating)
					 return xscale(full_dataset[i].releaseYear);
			 })
			 .attr("y2", function (d, i) {
				 if (i > 0 && full_dataset[i - 1].maturity_rating == full_dataset[i].maturity_rating){
						return hscale(full_dataset[i].avgUserScore);
				 }
			 })
			 .attr("stroke-width", 2)
			 .attr("stroke", function (d, i) {
				 return colorOf(d.maturity_rating);

			 })
			
			.on("mouseout", function (d,i){
								var lines = svgLinechart.selectAll("line");
								var circles = svgLinechart.selectAll("circle");
								var texts = svgLinechart.selectAll("text");
								var axises = svgLinechart.selectAll("g");
								var j;
								
								lines.attr("opacity", 0.7);
								circles.attr("opacity", 0.7);
								axises.attr("opacity", 1.0);
								
								for(j = i;j < full_dataset.length && full_dataset[j - 1].maturity_rating == full_dataset[j].maturity_rating;j++){
									d3.select(lines[0][j]).attr("stroke-width", 2)
														  .attr("opacity", 0.7);
									d3.select(circles[0][j]).attr("r", r);
									d3.select(texts[0][j]).text("");
								}			
								for(j = i;j>0 && full_dataset[j - 1].maturity_rating == full_dataset[j].maturity_rating;j--){
									d3.select(lines[0][j]).attr("stroke-width", 2)
														  .attr("opacity", 0.7);
														
									d3.select(circles[0][j]).attr("r", r);
									d3.select(texts[0][j]).text("");
								}
									d3.select(circles[0][j]).attr("r", r);
									d3.select(texts[0][j]).text("");
									
									
							
						})
			.on("mouseover",function(d,i){linesSelection(i);})
			.on("click",function(d,i){ alterRatingInHeatmap(indexOf(full_dataset[i].maturity_rating));});

	
	var texts=svgLinechart.selectAll("text").data(full_dataset);
	
	
	texts.enter()
		.append("text")
		
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "20px")
		.attr("fill", function (d, i) {
			 return colorOf(d.maturity_rating);
		 })
		.attr("x", function (d) {
						return xscale(d.releaseYear);
					})
		.text("");	
		

    svgLinechart.append("g")
    .attr("class", "axis") //Assign "axis" class
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xaxis)
    .append("text")
    .attr("x", w - padding)
    .style("text-anchor", "end")
    .text("ReleaseYear");

    svgLinechart.append("g")
    .attr("class", "axis") //Assign "axis" class
    .attr("transform", "translate(" + padding + ",0)")
    .call(yaxis)
    .append("text")
    .attr("y", padding - 10)
    .attr("x", padding)
    .style("text-anchor", "middle")
    .text("Average User Score");

	
	
		
	alterValuesToAvgUserScore();
}











//-------------------------------------scatterplot------------------------------------

function alterGenreInHeatmap(genreIndex){
	
	var w = HEATMAP_W;
    var h = HEATMAP_H;
    var padding = HEATMAP_PADDING;
	
	var rectWidth = (w-padding*2)/15;
	
	var rects = svgHeatmap.selectAll("rect");
	var texts = svgHeatmap.selectAll("text");
	for(var i = 0; i < rects[0].length; i++){
		if(parseInt(rects[0][i].x.baseVal.value)==parseInt(genreIndex*rectWidth)){
			if(rects[0][i].style.opacity==0.2){
				d3.select(rects[0][i]).style("opacity",0.2);
			}
			else
				d3.select(rects[0][i]).style("opacity",0.5);
		}
		
	}
}



function gen_vis_scatterplot(full_dataset) {

    var images = ["Action.png",
                  "Adventure.png",
                  "FirstPerson.png",
                  "ThirdPerson.png",
                  "Flight.png",
                  "Platformer.png",
                  "Puzzle.png",
                  "Racing.png",
                  "RealTime.png",
                  "RolePlaying.png",
                  "Simulation.png",
                  "Sports.png",
                  "Strategy.png",
                  "TurnBased.png",
                  "WarGame.png"]

    var imageIndex = 0;
    var w = SCATTERPLOT_W;
    var h = SCATTERPLOT_H;

    var padding = SCATTERPLOT_PADDING;
	
    var hscale = d3.scale.linear()
        .domain([78, 66])
        .range([padding, h - padding]);


    var xscale = d3.scale.linear()
        .domain([64, 83])
        .range([padding, w - padding]);


    var cscale = d3.scale.linear()
        .domain([70, 100])
        .range(['#00fff2','#000f73' ]);

    var yaxis = d3.svg.axis()
        .scale(hscale)
        .orient("left");

    var xaxis = d3.svg.axis()
        .scale(xscale)
        .orient("bottom");




    svgScatterplot = d3.select("#the_chart_scatterplot")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

	var circles = svgScatterplot.selectAll("circle").data(full_dataset);
	
        circles.enter()
            .append("circle")
			
                .attr("r", 18)
                .attr("fill", function (d,i) {
                    return cscale((100 * full_dataset[i].sumUserReviews) / (full_dataset[i].sumCriticReviews + full_dataset[i].sumUserReviews));
                })
                .attr("opacity",0.2)				
                .attr("cx", function (d,i) {
                    return xscale(full_dataset[i].avgUserScore);
                })
                .attr("cy", function (d,i) {
                    return hscale(full_dataset[i].avgMetaScore);
                });	
		

				
    var allImages=svgScatterplot.selectAll("images").data(full_dataset);
	
	allImages.enter()
		.append("svg:image")
		
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", function (d) {	imageIndex++; return "Images\\" + images[imageIndex - 1]; })

		.attr("x", function (d) {
			return xscale(d.avgUserScore) - 20.5;
		})
		.attr("y", function (d) {
			return hscale(d.avgMetaScore) - 20.5;
		})
		
		.on("click", function alterPointSize(d,i){
								var texts = svgScatterplot.selectAll("text");
								
								d3.select(texts[0][i]).style("visibility","visible");		
								
								alterGenreInHeatmap(d.GenreIndex);			
							 })
		
		.on("mouseout", function alterPointSize(d,i){
							var texts = svgScatterplot.selectAll("text");
							var circles = svgScatterplot.selectAll("circle");
							var axises = svgScatterplot.selectAll("g");
							
							circles.attr("opacity",0.2);
							axises.style("opacity",1.0);
							for(var j=0;j<15;j++){
								d3.select(texts[0][j]).style("visibility","hidden");
							}
							
							d3.select(circles[0][i])
								.attr("r", 18)
								.attr("opacity",0.2);
							
							svgScatterplot.selectAll("g").style("visibility","visible");
						
						})
							 
							 
		.on("mouseover", function alterPointSize(d,i){
								d3.select(this).attr("style","cursor:pointer;");
			
								var texts = svgScatterplot.selectAll("text");
								var circles = svgScatterplot.selectAll("circle");
								d3.select(circles[0][i])
									.attr("r", 20)
									.attr("opacity",1.0);
									
								d3.select(texts[0][i]).style("visibility","visible");
								svgScatterplot.selectAll("g").style("opacity",0.2);
											
							});
								
   
    
   
	var texts =svgScatterplot.selectAll("text").data(full_dataset);
	
		
	
	texts.enter()
			.append("text")
			
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("font-size","20px")
			.style("fill", function (d,i) {
												
											return cscale((100 * full_dataset[i].sumUserReviews) / (full_dataset[i].sumCriticReviews + full_dataset[i].sumUserReviews));
										})
			.attr("x", function (d) {
				return xscale(d.avgUserScore);
			})
			.attr("y", function (d) {
				return hscale(d.avgMetaScore) - 25;
			})
			.text(function (d) {return ""+d.Genre+" ("+parseInt(d.avgUserScore) +
									   ","+parseInt(d.avgMetaScore)+") ";});		 
	
	for(var j=0;j<15;j++){
		d3.select(texts[0][j]).style("visibility","hidden");
	}		

	svgScatterplot.append("g")
	.attr("class", "axis") //Assign "axis" class
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(xaxis)
	.append("text")
	.attr("x", w - padding)
	.attr("y", -6)
	.style("text-anchor", "end")
	.text("Average User Score");

    svgScatterplot.append("g")
    .attr("class", "axis") //Assign "axis" class
    .attr("transform", "translate(" + padding + ",0)")
    .call(yaxis)
    .append("text")
    .attr("y", padding - 10)
    .attr("x", 45)
    .style("text-anchor", "middle")
    .text("Average Meta Score");





}

//-------------------------------------heatmap------------------------------------

function gen_vis_heatmap(full_dataset) {  


	document.getElementById("resetHeatmapButton").style.background="#C9EEFF";
	

									

    w = 900;
    h = 350;
    padding = 50;
 
    var cscale = d3.scale.log()
        .domain([2, 237])
        .range(['grey', 'orange']);

    var axisscale = d3.scale.linear()
        .domain([0, 100])
        .range([0, w ]);
		
	var yaxis = d3.svg.axis()
        .scale(axisscale)
		.ticks(0)
        .orient("left");

    var xaxis = d3.svg.axis()
        .scale(axisscale)		
		.ticks(0)
        .orient("bottom");

    svgHeatmap = d3.select("#the_chart_heatmap")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var r = 18;
	var rectWidth = (w-padding*2)/15;
	var rectHeight = (h-padding*2)/4;
	
	var heatmap = svgHeatmap.selectAll(".heatmap").data(full_dataset);
	
    var rects= heatmap.enter()
	.append("svg:rect")
		.attr("transform", "translate( "+ ( padding*2) + ", "+( padding*2)+" )")
		.attr("x", function(d) { return (d.GenreIndex)*((w-(padding*2))/15); })
		.attr("y", function(d) { return (d.MaturityRatingIndex)*((h-(padding*2))/4); })
		.attr("width", function(d) { return rectWidth; })
		.attr("height", function(d) { return rectHeight; })
		.style("fill", function(d) {  return cscale(d.NumberOfGames); })
		.on("mouseover", function (d, i) {
                                    
										var rects = svgHeatmap.selectAll("rect");
										var texts = svgHeatmap.selectAll("text");

										//if(this.style.opacity!="0.5" && this.style.opacity!="0.1")
										if(this.style.opacity!="0.5" && this.style.opacity!="0.1")
											d3.select(rects[0][i]).style("opacity",0.6);		
										
								  })
		.on("mouseout",function(d,i){
										var rects = svgHeatmap.selectAll("rect");
										var texts = svgHeatmap.selectAll("text");
										//if(this.style.opacity!="0.5" && this.style.opacity!="0.1")
										if(this.style.opacity!="0.5" && this.style.opacity!="0.1")
											d3.select(this).style("opacity",1);
										
									})
		.on("click",function(d,i){d3.select(this).style("opacity",0.1);});
	

	
    var texts= svgHeatmap.selectAll("text").data(full_dataset);
	
	texts.enter()
		 .append("text")
			.attr("transform", "translate( "+ (( padding*2+rectWidth/2)-8) + ", "+(( padding*2 + rectHeight/2)+7)+" )")
			.attr("x", function(d) { return (d.GenreIndex)*rectWidth; })
			.attr("y", function(d) { return (d.MaturityRatingIndex)*rectHeight;})
			.attr("fill", function(d) {  return cscale(d.NumberOfGames); })		
			.text(function(d){return d.NumberOfGames;});
	
    svgHeatmap.selectAll("xaxis")
		.data(full_dataset)
		.enter()
		.append("g")
			.attr("class", "axis") //Assign "axis" class
			.attr("transform",function(d) { return "translate(0,"+((d.MaturityRatingIndex)*((h-padding*2)/4)+ ( padding*2))+")"})  
			.call(xaxis)
			.append("text")
			.attr("x", padding)
			.attr("y", padding)
			.style("text-anchor", "middle")
			.text(function(d) { return d.maturity_rating});
	
    svgHeatmap.selectAll("yaxis")
		.data(full_dataset)
		.enter()
		.append("g")
			.attr("class", "axis") //Assign "axis" class
			.attr("transform",function(d) { return "translate("+((d.GenreIndex)*((w-padding*2)/15)+ ( padding*2))+",0)"})  
			.call(yaxis)
			.append("text")
			.attr("x", padding +40 )
			.attr("y", - padding +30)
			.attr("transform", "rotate(90)")  
			.style("text-anchor", "end")
			.text(function(d) { return d.Genre});  





}
var RESETHEATMAP;
function resetHeatMap(){
	
	var cscale = d3.scale.log()
	.domain([2, 237])
	.range(['grey', 'orange']);
	
	var rects = svgHeatmap.selectAll("rect");
	var texts = svgHeatmap.selectAll("text");
	for(j=0;j<full_dataset.length;j++){
		d3.select(rects[0][j]).style("opacity", 1.0);
		d3.select(rects[0][j]).style("stroke", "none");
	}
	RESETHEATMAP = ! RESETHEATMAP;
}