
	var clusterChart;
	
	var clusters;

	var dense;
	
	
	
	d3.json("OutputTask4.json", function(data) {
												dense = data;
												gen_dense();
												});
													
	d3.json("OutputTask1.json", function(data) {
												 clusters= data;
												 alterCluster("(empty)");
												 gen_box_plot();
												});
		
	function calcCluster(publisherName){
		var cluster = [];
		var j=0;
		if(publisherName!=null){
			for(var i=0;i<clusters.length;i++){
				if(clusters[i].publisher==publisherName){
					cluster[j++]=d3.selectAll(clusters)[0][i];
				}
			}
		}
		return cluster;
	}

	var selectedClusterBar;
	function alterCluster(publisherName) {
		
		var cluster = calcCluster(publisherName);
		
		var w = 700;
		var h = 400;
		var padding=40;			
	
	
		clusterChart= d3.select("#the_chart_2")
					.append("svg")
					.attr("width",w)
					.attr("height",h+60)
					.attr("style","position:absolute; left: 750px;"); 
		
		
		
		var hscale= d3.scale.linear()
			.domain([100,0])
			.range([padding,h-padding]);
		var xscale= d3.scale.linear()
			.domain([0,cluster.length])
			.range([padding,w-padding]);
		
		 yaxis = d3.svg.axis()
			.scale(hscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("left");

		xaxis = d3.svg.axis()
			.scale(xscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("bottom");
		
		clusterChart.selectAll("rect")
					.data(cluster)
					.enter()
					.append("rect")
						.attr("width",Math.floor((w-padding*2)/cluster.length)-1)
						.attr("height",function(d) {return h-padding-hscale(d.avgMetascore);})
						.attr("fill","orange")
						.attr("y",function(d) {return hscale(d.avgMetascore);})
						.attr("x",function(d, i) { return xscale(i); })
						.on("mouseover",function(d,i){
							
														if(i!=selectedClusterBar) d3.select(this).style("stroke", "#343434");
														if(i!=selectedClusterBar) d3.select(this).attr("stroke-width","2px");
														
														})
						.on("mouseout",function(d,i){
														
														if(i!=selectedClusterBar) d3.select(this).attr("fill","orange");
														if(i!=selectedClusterBar) d3.select(this).style("stroke", "none");
													})
						.on("click",function(d,i){
													selectedClusterBar=i;
													var allBars = clusterChart.selectAll("rect");
													allBars.attr("fill","orange");
													allBars.style("stroke","none");
													d3.select(this).attr("fill","#343434");
													var texts = clusterChart.selectAll("text");
													
													d3.select(texts[0][0])
														.style("font-size", "15px")
															.style("fill", "#343434")
															.text( "selected developer: "+cluster[i].developer+"( Average Metascore ~ "+parseInt(cluster[i].avgMetascore)+" )");
												     
													
												  });
					
					
		clusterChart.append("text")
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("stroke", "none")
			.style("font-size", "20px")
			.style("fill", "black")
			.attr("x",350)
			.attr("y",430)
			.text("");
		
		clusterChart.append("text")
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("stroke", "none")
			.style("font-size", "20px")
			.style("fill", "black")
			.attr("x",350)
			.attr("y",15)
			.text("Showing publisher: "+ publisherName);
			
		
		
		clusterChart.append("g")
			.attr("class", "axis") //Assign "axis" class
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xaxis)
			.append("text")
			.attr("x", w - padding)
			.attr("y", 35)
			.style("text-anchor", "end")
			.text("Developer Number");

		clusterChart.append("g")
			.attr("class", "axis") //Assign "axis" class
			.attr("transform", "translate(" + padding + ",0)")
			.call(yaxis)
			.append("text")
			.attr("y", padding -10)
			.attr("x", padding - 10)
			.style("text-anchor", "middle")
			.text("Average Metascore");
			
			
			
	}
												
	var selectedBar;
	function gen_dense () {
		
		document.getElementById("graphChooser").style.background="#C9EEFF";
		
		var w = 700;
		var h = 400;
	
		var padding=40;	
		
		var hscale= d3.scale.linear()
			.domain([100,0])
			.range([padding,h-padding]);
		
		
		var cscale= d3.scale.linear()
			.domain([0,65])
			.range(['#334bff','#000a52' ]);
		
		var xscale= d3.scale.linear()
			.domain([0,dense.length])
			.range([padding,w-padding]);
		
		 yaxis = d3.svg.axis()
			.scale(hscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("left");

		xaxis = d3.svg.axis()
			.scale(xscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("bottom");
		
		var svg= d3.select("#the_chart")
					.append("svg")
					.attr("width",w)
					.attr("height",h+40); 

		svg.selectAll("rect")
					.data(dense)
					.enter()
					.append("rect")
						.attr("width",Math.floor((w-padding*2)/dense.length)-1)
						.attr("height",function(d) {return h-padding-hscale(d.developerConsistency);})
						.attr("y",function(d) {return hscale(d.developerConsistency);})
						.attr("x",function(d, i) { return xscale(i); })
						.attr("fill",function(d, i) { return cscale(d.developerForce); })
						.on("click",function(d,i){
													selectedBar=i;
													var allBars = svg.selectAll("rect");
													allBars.attr("fill",function(d, i) { return cscale(d.developerForce); });
													d3.select(this).attr("fill","orange");
													if(alterCluster!=null) clusterChart.remove();
													alterCluster(d.publisher);		
												     })
						.on("mouseover",function(d,i){
													d3.select(this).attr("style","cursor:pointer;");
													if(i!=selectedBar) d3.select(this).attr("stroke","orange");
													if(i!=selectedBar) d3.select(this).attr("stroke-width","2px");
													var texts=svg.selectAll("text");
													if(i!=selectedBar)
														d3.select(texts[0][i])
															.text(function(d) {  return "( click to select " + d.publisher+" : Number of developers: "+d.developerForce+" )";});
														})
						.on("mouseout",function(d,i){
								
													    var texts=svg.selectAll("text");
														d3.select(texts[0][i])
																.text("");
														var allBars = svg.selectAll("rect");
														allBars.attr("stroke","none");
														if(i!=selectedBar) 
															d3.select(this).attr("fill",function(d, i) { return cscale(d.developerForce); })
														if(selectedBar!=null)
														{
															if(alterCluster!=null) clusterChart.remove();
															alterCluster(dense[selectedBar].publisher);
														}else{
															
															if(alterCluster!=null) clusterChart.remove();
															 alterCluster("(empty)");
														}
														
													})
						
		var texts =svg.selectAll("text").data(dense);
			
		
		texts.enter()
			.append("text")
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("font-size", "18px")
			.style("fill", "blue")
			.attr("x",350)
			.attr("y",430)
			.text("");
			
						
						
		svg.append("g")
			.attr("class", "axis") //Assign "axis" class
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xaxis)
			.append("text")
			.attr("font-size","5px")
			.attr("x", w - padding)
			.attr("y", 40)
			.style("text-anchor", "end")
			.text("Publisher Number");

		svg.append("g")
			.attr("class", "axis") //Assign "axis" class
			.attr("transform", "translate(" + padding + ",0)")
			.call(yaxis)
			.append("text")
			.attr("font-size","5px")
			.attr("y", padding - 10)
			.attr("x", padding + 20)
			.style("text-anchor", "middle")
			.text("Developer Consistency");

		 
				
}

function calcMedian(data){
	
	var index = Math.ceil((data.length/2)-1);
	if(data.length%2==0)
		return (data[index].avgMetascore+data[index+1].avgMetascore)/2;
	else
		return data[index].avgMetascore;
}

function gen_box_plot () {

	document.getElementById("the_chart_boxplot").style.visibility="hidden";
	 
	var w = 750;
	var h = 500;

	var padding=45;	
	
	var yscale= d3.scale.linear()
		.domain([100,0])
		.range ([padding,h-140]);
	
	var xscale = d3.scale.linear()
		.domain([0,90])
		.range ([padding-5,w-90]);
	
	xaxis = d3.svg.axis()
			.scale(xscale)
			.tickFormat(d3.format("f"))
			.ticks(5)
			.orient("bottom");
	
	var svg_box_plot= d3.select("#the_chart_boxplot")
					.append("svg")
					.attr("width",w)
					.attr("height",h); 
					
	var BOX_WIDTH=5;

	//axis
	svg_box_plot.selectAll("g")
	.data(dense)
	.enter()
		.append("line")
		.attr("stroke","black")
		.attr("stroke-width", 1)
		.style("stroke-dasharray", ("5, 3"))
		.attr("y1",function(d,i){ 
									var partialCluster = calcCluster(d.publisher);	
									return yscale(partialCluster[0].avgMetascore);
								})
		.attr("x1",function(d,i){ return (xscale(i));})
		.attr("y2",function(d,i){ 
									var partialCluster = calcCluster(d.publisher);	
									return yscale(partialCluster[partialCluster.length-1].avgMetascore);
								})
		.attr("x2",function(d,i){ return (xscale(i));});
		
		

				
	svg_box_plot.selectAll("g")
		.data(dense)
		.enter()
		.append("line")
		.attr("stroke","black")
		.attr("stroke-width", 2)
		.attr("y1",function(d,i){ 
									var partialCluster = calcCluster(d.publisher);	
									return yscale(partialCluster[0].avgMetascore);
								})
		.attr("x1",function(d,i){ return (xscale(i))+BOX_WIDTH/2;})
		.attr("y2",function(d,i){ 
									var partialCluster = calcCluster(d.publisher);	
									return yscale(partialCluster[0].avgMetascore);
								})
		.attr("x2",function(d,i){ return (xscale(i))-BOX_WIDTH/2;});
	
	svg_box_plot.selectAll("g")
		.data(dense)
		.enter()
		.append("line")
		.attr("stroke","black")
		.attr("stroke-width", 2)
		.attr("y1",function(d,i){ 
									var partialCluster = calcCluster(d.publisher);	
									return yscale(partialCluster[partialCluster.length-1].avgMetascore);
								})
		
		.attr("x1",function(d,i){ return (xscale(i))+BOX_WIDTH/2;})
		.attr("y2",function(d,i){ 
									var partialCluster = calcCluster(d.publisher);	
									return yscale(partialCluster[partialCluster.length-1].avgMetascore);
								})
		.attr("x2", function(d,i){ return (xscale(i))-BOX_WIDTH/2;});
		
	
	
	
	
	
	//squares
	svg_box_plot.selectAll("g")
		.data(dense)
		.enter()
		.append("rect")
		.attr("width",BOX_WIDTH) //1st quadrant
		.attr("height",function(d,i){
										var firstQCluster=[];
										partialCluster = calcCluster(d.publisher);
										var j=0;
										for(var i=Math.ceil(partialCluster.length/2-1);i<(partialCluster.length-1);i++){
											firstQCluster[j++]=partialCluster[i];
										}
										
										return (h-140)-yscale(calcMedian(partialCluster)-calcMedian(firstQCluster));
									})
		.attr("fill","transparent")
		.attr("stroke","black")
		.attr("fill","orange")
		.attr("stroke-width", 2)
		.attr("y",function(d,i){ return yscale(calcMedian(calcCluster(d.publisher)));})
		.attr("x",function(d,i){ return (xscale(i)-BOX_WIDTH/2);});
		
		
		
	svg_box_plot.selectAll("g")
		.data(dense)
		.enter()
		.append("rect")
		.attr("width",BOX_WIDTH) //3rd quadrant
		.attr("height",function(d,i){
										var thirdQCluster=[];
										partialCluster = calcCluster(d.publisher);
										var j=0;
										for(var i=0;i<(partialCluster.length/2-1);i++){
											thirdQCluster[j++]=partialCluster[i];
										}
										return (h-140)-yscale(calcMedian(thirdQCluster)-calcMedian(partialCluster));
									})
		.attr("fill","transparent")
		.attr("stroke","black")
		.attr("fill","#FFEF89")
		.attr("stroke-width", 2)
		.attr("y",function(d,i){ 		var thirdQCluster=[];
										partialCluster = calcCluster(d.publisher);
										var j=0;
										for(var i=0;i<(partialCluster.length/2-1);i++){
											thirdQCluster[j++]=partialCluster[i];
										}
										q=(h-140)-yscale(calcMedian(thirdQCluster)-calcMedian(partialCluster));
									
		
										return yscale(calcMedian(calcCluster(d.publisher)))-q;})
		.attr("x",function(d,i){ return (xscale(i)-BOX_WIDTH/2);});
	
	
	svg_box_plot.selectAll("g")
	.data(dense)
	.enter()
		.append("rect")
		.attr("transform", "translate(0,40)")
		.attr("width",BOX_WIDTH)
		.attr("height",320)
		.attr("x",function(d,i){ return (xscale(i))-BOX_WIDTH/2;})
		.attr("fill","transparent")
		.on("mouseover",function(d,i){d3.select(this).attr("style","cursor:pointer;");
									})
		.on("click",function(d,i){
									rects=svg_box_plot.selectAll("rect");
									for(i=182;i<rects[0].length;i++) d3.select(rects[0][i]).attr("stroke","none");
									d3.select(this).attr("stroke","black");
									if(alterCluster!=null) clusterChart.remove();
									alterCluster(d.publisher);		
	
							 });
							 
	svg_box_plot.append("g")
			.attr("class", "axis") //Assign "axis" class
			.attr("transform", "translate("+(-BOX_WIDTH)+"," + (h-140) + ")")
			.call(xaxis)
			.append("text")
			.attr("font-size","5px")
			.attr("x", w - padding - 50)
			.attr("y", 40)
			.style("text-anchor", "end")
			.text("Publisher Number");
			
	svg_box_plot.append("g")
		.attr("class", "axis") //Assign "axis" class
		.attr("transform", "translate(" + (padding-BOX_WIDTH-5) + ",0)")
		.call(yaxis)
		.append("text")
		.attr("font-size","5px")
		.attr("y", padding-10)
		.attr("x", padding+20)
		.style("text-anchor", "middle")
		.text("Average Metascore");	
	 
}

var SELECTBOXPLOT=true;
function selectBoxPlot(){
	
	
	
	if(SELECTBOXPLOT){
		document.getElementById("graphChooser").innerHTML="Box Plot ON";
		document.getElementById("the_chart").style.visibility="hidden";
		document.getElementById("the_chart_2").style.visibility="visible";
		document.getElementById("label").style.visibility="hidden";
		document.getElementById("the_chart_boxplot").style.visibility="visible";
		
	}else{
		document.getElementById("graphChooser").innerHTML="Box Plot OFF";
		document.getElementById("the_chart").style.visibility="visible";
		document.getElementById("label").style.visibility="visible";
		document.getElementById("the_chart_boxplot").style.visibility="hidden";
	}
	
	SELECTBOXPLOT = ! SELECTBOXPLOT;
}