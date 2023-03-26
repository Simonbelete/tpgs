requirejs(["jquery", "datatables", "chartjs"], function ($, DataTable, Chart) {
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

  // var chartId = $("#fcre_chart").get(0).getContext("2d");
  // var chart = new Chart(chartId, {
  //   type: "line",
  //   data: {
  //     labels: [],
  //     datasets: [],
  //   },
  //   options: {
  //     title: {
  //       display: true,
  //       text: "Egg Grading",
  //     },
  //   },
  // });

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
        // // For Chartjs
        // var datasets = {
        //   data: [],
        //   label: "",
        //   borderColor: "#c45850",
        //   fill: true,
        // };
        // var labels = [];
        // for (var i = 0; i < json["results"].length; i++) {
        //   labels.push(json["results"][i]["week"]);
        //   datasets.data.push(json["results"][i]["fcr"]);
        // }
        // chart.data.labels = labels;
        // chart.data.datasets[0] = datasets;
        // chart.update();
        console.log(json);

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
