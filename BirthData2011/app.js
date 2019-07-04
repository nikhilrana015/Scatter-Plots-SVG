// Initialize The Value of SVG
var width=500;
var height=500;
var padding=30;

// Used to set scaling for y Axis
var yScale=d3.scaleLinear()
             .domain(d3.extent(birthData2011, d=> d.lifeExpectancy))   /* d3.extend returns both min and max value in
               array form [min,max] just on the basis of lifeExpectancy as callback here */

             .range([height-padding,padding]);        

//Used to set scaling for x axis
var xScale=d3.scaleLinear()
             .domain(d3.extent(birthData2011, d=> d.births/d.population))
             .range([padding,width-padding]);

// Used to set scaling for color as per (population density=popuation/density) 
var colorScale=d3.scaleLinear()
                 .domain(d3.extent(birthData2011, d=> d.population/d.area))
                 .range(["#a8ff3e","#fd5f00"]) ;      // It converts the code in hex forms.

// Used to set scaling for cirlce radius as per births.
var radiusScale=d3.scaleLinear()
                  .domain(d3.extent(birthData2011, d=>d.births ))
                  .range([2,40]);

// Used to set axis by using axis key function for x axis
var xAxis=d3.axisBottom(xScale)
            .tickSize(-height+2*padding)
            .tickSizeOuter(0);

// Axis for Y axis
var yAxis=d3.axisLeft(yScale)
            .tickSize(-width+2*padding)
            .tickSizeOuter(0);	 // Tick Size allows to create grids in our graph. 
                                         // grids move in axis label direction such as axis bottom so use negative
                                         // 2*padding is used to add grids in padding section as well.


// Tooltip used to create the data details when hover over the scatter plots... 
var tooltip=d3.select("body")
              .append("div")
                .classed("tooltip",true);





// Used To select The Axis And Their Modifications.

// Xaxis
d3.select("svg")
  .append("g")
    .attr("transform","translate(0,"+(height-padding)+")")
    .call(xAxis);
    
// Y axis
d3.select("svg")
  .append("g")
    .attr("transform","translate("+(padding)+",0)")

    .call(yAxis);



// Used For Putting The Circles.
d3.select("svg")                                          
    .attr("width",width)
    .attr("height",height)
  .selectAll("circle")
  .data(birthData2011)
  .enter()
  .append("circle")
    .attr("cx", d=> xScale(d.births/d.population))                    
    .attr("cy", d=> yScale(d.lifeExpectancy))
    .attr("r", d=> radiusScale(d.births))  
    .attr("fill", d=> colorScale(d.population/d.area))
    .on("mousemove",showToolTip)
    .on("touchStart",showToolTip)
    .on("mouseout",hideToolTip)             // USED FOR MOBILE USERS BECAUSE mousemove works in PC'S.
    .on("touchend",hideToolTip);
      
    


// Used for addding the text in x  axis.

d3.select("svg")
  .append("text")
    .attr("x",width/2)
    .attr("y",height-padding)
    .attr("dy","1.5em")
    .style("text-anchor","middle")
    .text("Births per Capita");

// Used for adding the title in Graph
d3.select("svg")
  .append("text")
    .attr("x",width/2)
    .attr("y",padding)
    .attr("dy","-0.5em")
    .style("text-anchor","middle")
    .style("font-size","1.5em")
    .text("Data on Births By Country in 2011");

// Used for adding the text in y axis
d3.select("svg")
  .append("text")
    .attr("transform","rotate(-90)")
    .attr("x",-height/2)
    .attr("y",padding)
    .attr("dy","-1.1em")
    .style("text-anchor","middle")
    .text("Life Expectancy");



function showToolTip(d){
  tooltip
        .style("opacity",1)
        .style("left",d3.event.x-(tooltip.node().offsetWidth/2)+"px")    // d3.event.x gives the position of mouse pointer and set the positioon of div to left
        .style("top",d3.event.y+25+"px")     // d3.event.x gives the position of mouse pointer and set the positioon of div to right
        
        // tooltip.node().offsetWidth/2) used to move the div to the center when we hover the scatter plot.

        .html(`
          <p>Region: ${d.region}</p>
          <p>Births: ${d.births.toLocaleString()}</p>
          <p>Population: ${d.population.toLocaleString()} </p>    
          <p>Area: ${d.area.toLocaleString()} </p>
          <p>Life-Expectancy: ${d.lifeExpectancy} </p>
          `);
                                        //toLocaleString used to convert the big no. to more readable form

}


function hideToolTip(d){
  tooltip
        .style("opacity",0)
}












