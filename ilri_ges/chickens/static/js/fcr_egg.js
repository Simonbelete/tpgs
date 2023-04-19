requirejs(["jquery", "datatables", "chartjs"], function ($, DataTable, Chart) {
  "use strict";

  var selector = $("#fcre_data_list_table");

  var columns = [
    { data: "week" },
    { data: "total_egg_weight" },
    { data: "feed_weight" },
    { data: "eggs" },
    { data: "fcr" },
  ];

  var chartId = $("#fcre_chart").get(0).getContext("2d");
  var chart = new Chart(chartId, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      title: {
        display: true,
        text: "FCR - Eggs",
      },
    },
    plugins: [
      {
        beforeDraw: (chart, args, options) => {
          const { ctx } = chart;
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    ],
  });

  var table = selector.DataTable({
    responsive: true,
    autoWidth: false,
    ordering: false,
    dom: "Blrt",
    buttons: ["copy", "excel", "csv", "print"],
    bPaginate: false,
    processing: true,
    serverSide: true,
    ajax: {
      url: "/api/chickens/" + selector.data("id") + "/fcr/eggs",
      dataSrc: function (json) {
        // For Chartjs
        var datasets = {
          data: [],
          label: "",
          borderColor: "#c45850",
          fill: true,
        };
        var labels = [];
        for (var i = 0; i < json["results"].length; i++) {
          labels.push(json["results"][i]["week"]);
          datasets.data.push(json["results"][i]["fcr"]);
        }
        chart.data.labels = labels;
        chart.data.datasets[0] = datasets;
        chart.update();

        json["data"] = json["results"];
        json["recordsTotal"] = json["count"];
        json["recordsFiltered"] = json["count"];
        return json.data;
      },
      data: function (d) {
        d.start_week = $("#fcre_start_week").val();
        d.end_week = $("#fcre_end_week").val();

        d.columns = [];
        d.order = [];
        delete d.start;
        delete d.search;
        delete d.length;
        delete d.draw;
      },
    },
    columns: columns,
  });

  $("#fcre_apply").click(function () {
    table.ajax.reload(null, false);
  });

  $("#download_chart").click(function () {
    var a = document.createElement("a");
    a.href = chart.toBase64Image();
    a.download = "fcr_egg.png";
    a.click();
  });
});
