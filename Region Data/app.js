// Initialize the SVG width and height

var width=600;
var height=600;
var padding=50;


// Scaling the xScale using the ScaleLinear function..
var xScale=d3.scaleLinear()
             .domain(d3.extent(regionData,d=> d.adultLiteracyRate))
             .range([padding,width-padding]);

// Scaling the yScale using the ScaleLinear function..
var yScale=d3.scaleLinear()
             .domain(d3.extent(regionData,d=> d.subscribersPer100))
             .range([height-padding,padding]);

// Scaling the radiusScale using the ScaleLinear function..
var radiusScale=d3.scaleLinear()
                  .domain(d3.extent(regionData,d=> d.medianAge))
                  .range([5,30]);

// Scaling the colorScale using the ScaleLinear function..
var colorScale=d3.scaleLinear()
                 .domain(d3.extent(regionData,d=>d.urbanPopulationRate))
                 .range(["#94fc13","#010059"]);                  

// Used to Put X-Axis
var xAxis=d3.axisBottom(xScale)
            .tickSize(-height+2*padding)
            .tickSizeOuter(0);

// Used to put Y-Axis 
var yAxis=d3.axisLeft(yScale)
            .tickSize(-width+2*padding)
            .tickSizeOuter(0);


// Tooltip used to create the data details when hover over the scatter plots... 
var tooltip=d3.select("body")
              .append("div")
                .classed("tooltip",true);            


// Initialize the property of X-Axis
d3.select("svg")
  .append("g")
    .attr("transform","translate(0,"+(height-padding)+")")
    .call(xAxis);

// Initialise the property of Y-Axis
d3.select("svg") 
  .append("g")
    .attr("transform","translate("+(padding)+",0)")
    .call(yAxis);   



// Initialize the Property of SVG.
d3.select("svg")
    .attr("width",width)
    .attr("height",height)
  .selectAll("circle")
  .data(regionData)
  .enter()
  .append("circle")
    .attr("cx",d=> xScale(d.adultLiteracyRate))
    .attr("cy",d=> yScale(d.subscribersPer100))
    .attr("r",d=> radiusScale(d.medianAge))
    .attr("stroke","#fff")
    .attr("fill",d=> colorScale(d.urbanPopulationRate))
    .on("mousemove",showToolTip)
    .on("mouseout",hideToolTip)
    .on("touchStart",showToolTip)
    .on("touchend",hideToolTip);



// Initialise the text along the x-axis
d3.select("svg")
  .append("text")
    .attr("x",width/2)
    .attr("y",height-padding)
    .attr("dy","1.5em")
    .style("text-anchor","middle")
    .text("Literacy Rate,Aged 15 and up");



// Initialise the text along the y-Axis
d3.select("svg")
  .append("text")
    .attr("transform","rotate(-90)")
    .attr("x",-height/2)
    .attr("y",padding)
    .attr("dy","-2em")
    .style("text-anchor","middle")
    .style("font-weight","200")
    .text("Cellular Subscriptions Per 100 People");    



// Initialise the Heading of the graph...
d3.select("svg")
  .append("text")
    .attr("x",width/2)
    .attr("y",padding)
    .attr("dy","- 2em")
    .style("text-anchor","middle")
    .style("font-size","1.5em")
    .text("Cellular Subscriptions VS Literacy Rate");
    


function showToolTip(d){
  tooltip
         .style("opacity",1)
         .style("left",d3.event.x-(tooltip.node().offsetWidth/2)+"px")
         .style("top",d3.event.y+25+"px")

         .html(`

          <p>Region: ${d.region} </p>
          <p>SubscribersPer100: ${d.subscribersPer100} </p>
          <p>Adult-Literacy-Rate: ${d.adultLiteracyRate}</p>
          <p>Urban-Population-Rate: ${d.urbanPopulationRate} </p>
          <p>Median Age: ${d.medianAge} </p>
          
          `);

}


function hideToolTip(d){
  tooltip
        .style("opacity",0);
}









