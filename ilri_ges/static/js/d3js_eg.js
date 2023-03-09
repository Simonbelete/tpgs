requirejs(
  [
    "jquery",
    "d3js",
    "d3_hierarchy",
    "d3_tree",
    "lodash",
    "d3-color",
    "d3-dispatch",
    "d3-drag",
    "d3-ease",
    "d3-interpolate",
    "d3-selection",
    "d3-timer",
    "d3-transition",
    "d3-zoom",
  ],
  function ($, d3, d3_hierarchy, d3_tree, _) {
    "use strict";
    var svg = d3
      .select("svg")
      .attr("width", 600)
      .attr("height", 600)
      .append("g")
      .attr("transform", "translate(50, 50)");

    var data = [
      { id: "1", child: "1", parent: "" },
      { id: "2", child: "2", parent: "1" },
      { id: "3", child: "3", parent: "1" },
      { id: "4", child: "4", parent: "2" },
      { id: "5", child: "5", parent: "3" },
      { id: "6", child: "5", parent: "2" },
      { id: "7", child: "6", parent: "3" },
      { id: "8", child: "6", parent: "2" },
      { id: "9", child: "7", parent: "6" },
      { id: "8", child: "8", parent: "9" },
    ];

    var ds = d3
      .stratify()
      .id(function (d) {
        return d.id;
      })
      .parentId(function (d) {
        return d.parent;
      })(data);

    var tree = d3.tree().size([500, 300]);
    var info = tree(ds);

    // Tangled Tree
    var child = _.toArray(_.map(data, "child"));

    var duplicates = _.filter(child, function (val, i, iteratee) {
      return _.includes(iteratee, val, i + 1);
    });

    console.log(ds.links());

    var first_node;
    for (var i = 0; i < duplicates.length; i++) {
      first_node = null;
      for (var j = 0; j < ds.links().length; j++) {
        if (duplicates[i] === ds.links()[j].target.data.child) {
          if (first_node == null) {
            first_node = ds.links()[j].target;
          }
          ds.links()[j].target.x = first_node.x;
          ds.links()[j].target.y = first_node.y;
        }
      }
    }

    // Connections
    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-linecap", 1)
      .attr("stroke-linejoin", 1)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(ds.links())
      .join("path")
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.y)
          .y((d) => d.x)
      );

    // Nodes
    var node = svg
      .append("g")
      .selectAll("a")
      .data(info.descendants())
      .join("a")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("fill", (d) => (d.children ? "#555" : "#555"))
      .attr("r", 4);

    // Node Text
    node
      .append("text")
      .attr("dy", "0.32em")
      .attr("x", (d) => (d.children ? -6 : -15))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .attr("paint-order", "stroke")
      .attr("stroke", "#fff")
      .attr("stroke-width", 6)
      .text((d, i) => d.data.child);

    // .attr("cx", (d) => d.x)
    // .attr("cy", (d) => d.y);
    // node
    //   .append("circle")
    //   .attr("fill", (d) => (d.children ? "#555" : "#999"))
    //   .attr("r", 3);

    // var svg = d3_tree(data, {
    //   id: (d) => d.child,
    //   parentId: (d) => d.parent,
    // });

    // $("#body").append(svg);
  }
);
