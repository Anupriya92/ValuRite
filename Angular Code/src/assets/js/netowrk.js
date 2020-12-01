var d3 = require("d3");
var width = 960,
height = 500,
shiftKey;
var toggleDiv = undefined;
var svg = d3.select("#movieNetwork")
.attr("tabindex", 1)
.each(function() { this.focus(); })
.append("svg")
.attr("width", width)
.attr("height", height);
movieInfoDiv = d3.select("#movieInfo");
d3.json("graph.json", function(error, graph) {

graph.links.forEach(function(d) {
d.source = graph.nodes[d.source];
d.target = graph.nodes[d.target];
});


var link = svg.append("g")
  .attr("class", "link")
.selectAll("line")
  .data(graph.links)
.enter().append("line")
  .attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; });

var brush = svg.append("g")
  .datum(function() { return {selected: false, previouslySelected: false}; })
  .attr("class", "brush")
 

var node = svg.append("g").attr("class", "node").selectAll("circle").data(graph.nodes).enter();
 node.append("circle")
  .attr("r", function(d) { return d.r; })
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .on("mousedown", function(d) {

    d3.select("svg").select('use').remove();
    svg.append('svg:use').attr('xlink:href','#anims').attr('x',d.x).attr('y',d.y);
    if (shiftKey) {
      //  d3.select(this).classed("selected", d.selected = !d.selected);
       d3.select(this).append("text", d.selected = !d.selected);}
    else 
    {
      // node.classed("selected", function(p) { return p.selected = d === p; });
    }
    showMoviePanel(d);
  });
  node.append("text").data(graph.nodes)
  .attr("dx",  function(d) { return d.x-30; })
  .attr("dy", function(d) { return d.y-30; })
  .text(function(d) { return d.label })
  
  var node2 = svg.append('svg:defs').append('g').attr('id','anims');
   node2.append('circle').attr('id','rp1').attr('r','0.5em');
   node2.append('circle').attr('id','rp2').attr('r','0.5em');
   node2.append('circle').attr('id','rp3').attr('r','0.5em');
   node2.append('circle').attr('id','rp4').attr('r','0.5em');
   svg.append('svg:use').attr('xlink:href','#anims').attr('x',60).attr('y',75);
});
function showMoviePanel( node ) {
  // Fill it and display the panel

  (movieInfoDiv).html( getMovieInfo(node) )
.attr("class","panel_on");
}
showMoviePanel({
  "x": 60,
        "y": 75,
        "r": 7,
        "label": "Competitive Intelligence",
        "desc": "Ongoing and completed clinical trials in addition to companies involved in drug discovery and development." 
});
function getMovieInfo( n ) {

info = '<div id="cover">';
if( n.label )
if( n.desc )
info += '<div class="description">' + n.desc + '</div></div>';
info +=
'<img src="../../assets/images/chart-close.png" class="action" style="" title="close panel" onClick="toggleDiv(\'movieInfo\');"/>';


return info;
}
toggleDiv = function( id, status ) {
d = d3.select('div#'+id);
if( status === undefined )
  status = d.attr('class') == 'panel_on' ? 'off' : 'on';
d.attr( 'class', 'panel_' + status );
d3.select("svg").select('use').remove();
return false;
}
function keyflip() {
shiftKey = d3.event.shiftKey || d3.event.metaKey;
}