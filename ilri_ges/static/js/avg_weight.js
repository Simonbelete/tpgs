requirejs(["jquery", "datatables", "chartjs4"], function ($, DataTable, Chart) {
  "use strict";

  var selector = $("#data_table");

  var columns = [{ data: "week" }, { data: "avg_body_weight" }];

  var trending_chart_id = $("#trending_chart").get(0).getContext("2d");
  var trending_chart = new Chart(trending_chart_id, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Average Body Weight",
        },
      },
      responsive: true,
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
    dom: "lrt",
    bPaginate: false,
    processing: true,
    serverSide: true,
    ajax: {
      url: "/api/weights/avg",
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
          labels.push("Week " + json["results"][i]["week"]);
          datasets.data.push(json["results"][i]["avg_body_weight"]);
        }

        trending_chart.data.labels = labels;
        trending_chart.data.datasets[0] = datasets;
        trending_chart.update();

        json["data"] = json["results"];
        json["recordsTotal"] = json["count"];
        json["recordsFiltered"] = json["count"];
        return json.data;
      },
      data: function (d) {
        d.start_week = $("#start_week").val();
        d.end_week = $("#end_week").val();
        d.farm = $("#farm_select").val().join(",");
        d.breed_type = $("#breed_type_select").val().join(",");
        d.house = $("#house_select").val().join(",");

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

  $("#apply").click(function () {
    table.ajax.reload(null, false);
  });

  $("#download_chart").click(function () {
    var a = document.createElement("a");
    a.href = trending_chart.toBase64Image();
    a.download = "egg_grading_wight.png";
    a.click();
  });
});
