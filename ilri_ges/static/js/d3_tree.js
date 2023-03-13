define([
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
], function ($, d3, d3_hierarchy, d3_tree, _) {
  "use strict";

  var tree = function (
    data,
    {
      select,
      width = 1102, // outer width, in pixels
      height = 1102,
      rect_width = 60,
      rect_height = 30,
      padding = 20,
    }
  ) {
    // To multiply x and y
    var spacer = Math.log10(data.length);

    var svg = d3
      .select(select)
      .attr("width", width)
      .attr("height", height)
      .append("g");

    ///
    /// Controllers
    ///
    // Zoom & pan
    var zoom = d3
      .zoom()
      .scaleExtent([0.25, 5])
      .on("zoom", function (e) {
        d3.selectAll(" g").attr("transform", e.transform);
      });

    d3.select(select).call(zoom);

    $("#d3_zoomIn").click(function () {
      d3.select(select).transition().call(zoom.scaleBy, 2);
    });

    $("#d3_zoomOut").click(function () {
      d3.select(select).transition().call(zoom.scaleBy, 0.5);
    });

    $("#d3_resetZoom").click(function () {
      d3.select(select).transition().call(zoom.scaleTo, 1);
    });

    $("#d3_panLeft").click(function () {
      d3.select(select).transition().call(zoom.translateBy, -50, 0);
    });

    $("#d3_panRight").click(function () {
      d3.select(select).transition().call(zoom.translateBy, 50, 0);
    });

    $("#d3_center").click(function () {
      d3.select(select)
        .transition()
        .call(zoom.translateTo, 0.5 * width, 0.5 * height);
    });

    var ds = d3
      .stratify()
      .id(function (d) {
        return d.id;
      })
      .parentId(function (d) {
        return d.parent;
      })(data);

    var tree = d3.tree().size([width, height]);
    // Size each node size
    tree.nodeSize([rect_width + padding, data.length * 10]);
    var info = tree(ds);

    // Tangled Tree
    var child = _.toArray(_.map(data, "child"));

    var duplicates = _.filter(child, function (val, i, iteratee) {
      return _.includes(iteratee, val, i + 1);
    });

    // Match by child key
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
          .link(d3.curveBumpY)
          .x((d) => d.x + rect_width / 2)
          .y((d) => d.y + rect_height + 5)
      );

    // Nodes
    var node = svg
      .append("g")
      .selectAll("a")
      .data(info.descendants())
      .join("a")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("rect")
      .attr("width", rect_width)
      .attr("height", rect_height)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .style("fill", function (d) {
        var mf = d.data.child.split(" ");
        if (mf[mf.length - 1] == "M") return "lightcoral";
        else if (mf[mf.length - 1] == "F") return "lightsteelblue";
        else return "#fff";
      });

    node
      .append("text")
      .attr("x", rect_width / 2)
      .attr("y", rect_height / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text((d, i) => d.data.child);

    // Node Text
    // node
    //   .append("text")
    //   .attr("dy", "0.32em")
    //   .attr("x", (d) => (d.children ? -6 : -15))
    //   .attr("text-anchor", (d) => (d.children ? "end" : "start"))
    //   .attr("paint-order", "stroke")
    //   .attr("stroke", "#fff")
    //   .attr("stroke-width", 6)
    //   .text((d, i) => d.data.child);

    return svg.node();
  };

  return tree;
});
