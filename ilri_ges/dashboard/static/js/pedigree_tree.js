requirejs(["jquery", "d3_tree"], function ($, D3Tree) {
  "use strict";
  $.getJSON("/api/chickens/pedigree/", {}).done(function (response) {
    var results = response.results;

    var data = results;

    var chart = D3Tree(data, { select: "#chart_view_port" });

    // var chart = D3Tree(data, {
    //   label: (d) => d.name,
    //   title: (d, n) =>
    //     `${n
    //       .ancestors()
    //       .reverse()
    //       .map((d) => d.data.name)
    //       .join(".")}`, // hover text
    //   link: (d, n) =>
    //     `https://github.com/prefuse/Flare/${
    //       n.children ? "tree" : "blob"
    //     }/master/flare/src/${n
    //       .ancestors()
    //       .reverse()
    //       .map((d) => d.data.name)
    //       .join("/")}${n.children ? "" : ".as"}`,
    //   width: 1152,
    //   height: 650,
    //   margin: 100,
    // });

    console.log(chart);

    // $("#chart_view_port").append(chart);
    // $("#chart_view_port > svg").css("border", "1px solid gray");
    // $("#chart_view_port > svg").attr("width", "100%");
    // $("#chart_view_port > svg").attr("height", "50%");
  });
});
