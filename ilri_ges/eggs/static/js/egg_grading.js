requirejs(["jquery", "datatables", "chartjs4"], function ($, DataTable, Chart) {
  "use strict";

  var selector = $("#data_table");

  var columns = [
    { data: "week" },
    { data: "avg_weight" },
    { data: "sm_grading" },
    { data: "m_grading" },
    { data: "lg_grading" },
    { data: "xl_grading" },
  ];

  var percentage_chart_id = $("#percentage_chart").get(0).getContext("2d");
  var percentage_chart = new Chart(percentage_chart_id, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        // {
        //   label: "Small (<53g)",
        //   data: [10, 20],
        //   backgroundColor: "#5C96A5",
        // },
        // {
        //   label: "Large (<53g)",
        //   data: [30, 40],
        //   backgroundColor: "red",
        // },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Egg Grading",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          ticks: {
            min: 0,
            max: 100,
          },
        },
      },
    },
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
      url: "/api/eggs/grading",
      dataSrc: function (json) {
        // For Chartjs
        var datasets = [
          {
            label: "Small (<53g)",
            data: [],
            backgroundColor: "#5C96A5",
          },
          {
            label: "Medium (53-63g)",
            data: [],
            backgroundColor: "#CCCCCC",
          },
          {
            label: "Large (63-73g)",
            data: [],
            backgroundColor: "#D6854C",
          },
          {
            label: "Extra Large(>73g)",
            data: [],
            backgroundColor: "#4198D7",
          },
        ];
        var labels = [];
        var sm = [];
        var md = [];
        var lg = [];
        var xl = [];
        for (var i = 0; i < json["results"].length; i++) {
          labels.push("Week " + json["results"][i]["week"]);
          sm.push(json["results"][i]["sm_grading"]);
          md.push(json["results"][i]["m_grading"]);
          lg.push(json["results"][i]["lg_grading"]);
          xl.push(json["results"][i]["xl_grading"]);
        }
        datasets[0].data = sm;
        datasets[1].data = lg;
        datasets[2].data = md;
        datasets[3].data = xl;

        percentage_chart.data.labels = labels;
        percentage_chart.data.datasets = datasets;
        percentage_chart.update();

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
});
