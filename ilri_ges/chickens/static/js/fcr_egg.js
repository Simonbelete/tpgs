"use strict";

requirejs(
  [
    "jquery",
    "datatables.net",
    "chartjs",
    "datatables.net-bs4",
    "datatables.net-responsive",
    "datatablesResponsiveBs4",
    "datatables.net-buttons",
    "datatablesButtonsBs4",
    "jszip",
    "pdfmake",
    "pdfmake_fonts",
    "datatables_buttons_html5",
    "datatables_buttons_print",
    "datatables_buttons_colVis",
  ],
  function ($, DataTable, Chart) {
    "use strict";

    var selector = $("#fcre_data_list_table");

    var columns = [
      { data: "week" },
      { data: "total_egg_weight" },
      { data: "feed_weight" },
      { data: "eggs" },
      { data: "fcr" },
    ];

    // init
    loadData($("#fcre_start_week").val(), $("#fcre_end_week").val());

    $("#fcre_apply").click(function () {
      loadData($("#fcre_start_week").val(), $("#fcre_end_week").val());
    });

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
    });

    function loadData(start_week, end_week) {
      var table = selector.DataTable({
        responsive: true,
        autoWidth: false,
        ordering: false,
        dom: "lrt",
        bPaginate: false,
        processing: true,
        serverSide: true,
        ajax: {
          url:
            "/api/chickens/" +
            selector.data("id") +
            "/fcr/eggs?start_week" +
            start_week +
            "&end_week=" +
            end_week,
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
        },
        columns: columns,
      });
    }
  }
);
