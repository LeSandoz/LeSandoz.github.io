jQuery(function() {
    var width = 800,
        height = 600;

    var svg = d3.select("body").append("svg")
        // .attr("class", "svgback")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geo.mercator()
        .center([119.5, 24])
        .scale(6000);

    var path = d3.geo.path()
        .projection(projection);

    d3.json("taiwan.json", function(error, topology) {
        console.log(topology);
        var g = svg.append("g");


        d3.select("svg").append("path").datum(
            topojson.mesh(topology,
                topology.objects["County_MOI_1060525"],
                function(a,
                    b) {
                    return a !== b;
                })).attr("d", path).attr("class", "subunit-boundary");

        d3.select("g").selectAll("path")
            .data(topojson.feature(topology, topology.objects.County_MOI_1060525).features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr({
                d: path,
                name: function(d) {
                    return d.properties["COUNTYNAME"];

                },
                fill: '#fff',
                stroke: "#FFD306"

            }).attr('stroke-width', "2")
            .on("mouseover", function(d) {
                d3.select(this).attr("fill", "orange");


            }).on("mouseleave", function(d) {
                d3.select(this).attr("fill", "#fff");

            }).on("click", function(d){
                console.log(d.properties["COUNTYNAME"])
                alert("這裡是" + d.properties["COUNTYNAME"] + "\n身分證開頭為：" + d.properties["COUNTYID"])
            });
    });
})

var n = 1

    $("#scale").on("change", function(){
        var scale = $("#scale").val()
        console.log(scale)
        $("svg").css("transform","scale(" + scale + ") ")
    })



