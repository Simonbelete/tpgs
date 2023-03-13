requirejs(["jquery", "d3_tree"], function ($, D3Tree) {
  "use strict";

  var data = [
    { id: "1", child: "1", parent: "" },
    { id: "2", child: "2", parent: "1" },
    { id: "3", child: "3", parent: "1" },
    { id: "4", child: "4", parent: "2" },
    { id: "5", child: "20005", parent: "3" },
    { id: "6", child: "20005", parent: "2" },
    { id: "7", child: "6", parent: "3" },
    { id: "8", child: "6", parent: "2" },
    { id: "9", child: "7", parent: "6" },
    { id: "10", child: "1.10", parent: "1" },
    { id: "11", child: "1.11", parent: "1" },
    { id: "12", child: "1.12", parent: "1" },
    { id: "13", child: "1.13", parent: "1" },
  ];

  var chart = D3Tree(data, { select: "#svg_view", width: 800, height: 700 });
});
