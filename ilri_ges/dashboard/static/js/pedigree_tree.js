requirejs(["jquery", "d3_tree"], function ($, D3Tree) {
  "use strict";
  $.getJSON("/api/pairs/tree/", {}).done(function (response) {
    var data = response.results;
    data = {
      name: "root",
      children: data,
    };
    var chart = D3Tree(data, {
      label: (d) => d.name,
      title: (d, n) =>
        `${n
          .ancestors()
          .reverse()
          .map((d) => d.data.name)
          .join(".")}`, // hover text
      link: (d, n) =>
        `https://github.com/prefuse/Flare/${
          n.children ? "tree" : "blob"
        }/master/flare/src/${n
          .ancestors()
          .reverse()
          .map((d) => d.data.name)
          .join("/")}${n.children ? "" : ".as"}`,
      width: 1152,
      height: 1152,
      margin: 100,
    });

    $("#chart_view_port").append(chart);
  });
});
