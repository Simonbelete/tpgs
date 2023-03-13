requirejs(["jquery", "d3_tree"], function ($, D3Tree) {
  "use strict";
  $.getJSON("/api/chickens/pedigree/", {}).done(function (response) {
    var results = response.results;

    console.log(results);

    var chart = D3Tree(data, {
      select: "#chart_view_port",
      width: $(window).width() * 0.86,
      height: $(window).height() * 0.7,
    });
  });
});
