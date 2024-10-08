requirejs(["jquery", "datatables", "chartjs"], function ($, DataTable, Chart) {
  "use strict";

  var selector = $("#hdep_data_list_table");

  var columns = [
    { data: "week" },
    { data: "day", defaultContent: "" },
    { data: "hdep" },
  ];

  var chartId = $("#hdep_chart").get(0).getContext("2d");
  var chart = new Chart(chartId, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      title: {
        display: true,
        text: "HDEP",
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
      url: "/api/eggs/hdep",
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
          if ($("#hdep_measurement").val() == "weekly") {
            labels.push(json["results"][i]["week"]);
          } else {
            labels.push(
              "Week " +
                json["results"][i]["week"] +
                " Day " +
                json["results"][i]["day"]
            );
          }

          datasets.data.push(json["results"][i]["hdep"]);
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
        d.search = d.search.value;
        d.offset = d.start;
        d.limit = d.length;

        // Filters
        d.start_week = $("#hdep_start_week").val();
        d.end_week = $("#hdep_end_week").val();
        d.group = $("#hdep_group").val();
        d.measurement = $("#hdep_measurement").val();
        d.chicken =
          $("#chicken_select").val() !== undefined
            ? $("#chicken_select").val().join(", ")
            : "";
        d.flock =
          $("#flock_select").val() !== undefined
            ? $("#flock_select").val().join(", ")
            : "";
        d.breeds = $("#breed_type_select").val()
          ? $("#breed_type_select").val().join(", ")
          : "";

        d.columns = [];
        d.order = [];
        delete d.length;
        delete d.draw;
      },
    },
    columns: columns,
  });

  $("#hdep_apply").click(function () {
    table.ajax.reload(null, false);
  });
});
