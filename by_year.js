const year_data = [

    {
      'race': '2009 (581,168 stops)','val': '0.228', 'tt': 22,
      'offset': '0','label': 0.03, 'yr': 2009
    }
    ,
    {
      'race':'2010 (601,285 stops)','val': '0.23',  'tt': 23,
      'offset': '.22','label': 0.26, 'yr': 2010
    }
    ,
    {
      'race': '2011 (685,724 stops)','val': '0.26',  'tt': 26,
      'offset':'0.45',  'label': 0.5, 'yr': 2011
    },
    {
      'race': "2012 - 2014 (770,549 stops)",'val': '0.20','tt': 20,
      'offset':'0.71','label': 0.78, 'yr': 2012
    },
    {
      'race': "",'val': '0.07',  'tt': 7,
      'offset':'0.91','label': 0.8, 'yr': 2013
    },
    {
      'race': "",'val': "0.02",'tt': 2,
      'offset': "0.98",'label': 0.92, 'yr': 2014
    }
  ]

    const margin = {top: 20, right: 20, bottom: 30, left: 40}
    const width = 1200
    const height = 200
    const label_y = 100

      const x = d3.scaleLinear()
        .domain([0, 1])
        .range([1, width]).nice()

      const y = d3.scaleBand()
        .domain([0, height])
        .range([height, 0])
        .padding(0.1)


    var year_z = d3.scaleOrdinal()
      .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B", "#EDA03C", "#F4F4F4", "#C732D5"]);

      var z = d3.scaleOrdinal()
        .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B",
      ]);



function yearBreakout (data) {

  const svg_year = d3.select(".by_year").append("svg")
    .attr("width", width)
    .attr("height", height)

svg_year.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("class", "yearBlocks")
       .attr("fill", function(d) { return year_z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_yr.style("display", null); })
   .on("mouseout", function() { tooltip_yr.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip_yr.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_yr.select("text").text(d.tt + "%")
     tooltip_yr.attr("fill", "white")
     tooltip_yr.attr("font-family", "Courier")
     tooltip_yr.attr("font-size", "18px");
      });

    svg_year.selectAll("text")
		   .data(data)
		   .enter()
		   .append("text")
       .attr("class", "yearTexts")
       .attr("class", "label")
		   .text(function(d) {
		   		return d.race;
		   })
       .attr('x', d => x(Number(d.label)))
		   .attr("y", label_y)
		   .attr("font-family", "Courier")
		   .attr("font-size", "16px")
		   .attr("fill", "white");

       // Prep the tooltip bits, initial display is hidden
    var tooltip_yr = svg_year.append("g")
    .attr("class", "tooltip")
    .style("display", "none")

    tooltip_yr.append("text")
      .attr("dy", label_y)

    }
    yearEnd = 3
      // code for buttons
      d3.select("#byYear")
      .on("click", function(d,i) {
        const subset = year_data.slice(0, yearEnd)
        console.log(subset)

      d3.select(".yearBlocks")
        .data(subset).transition().duration(1000)
        .attr("width", d => x(Number(d.val)))
        .attr('x', d => x(Number(d.offset)))
      d3.selectAll(".yearTexts")
        .data(subset).transition().duration(1000)
        .text(function(d) {
           return d.race;
        })
        .attr('x', d => x(Number(d.label)))

        yearEnd= yearEnd + 3
      });

    // yearBreakout(year_data.filter((row) => row.yr === 2009))
    yearBreakout(year_data.slice(0,2))
