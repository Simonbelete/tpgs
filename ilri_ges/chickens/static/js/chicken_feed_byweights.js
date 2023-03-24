requirejs(
  ["jquery", "datatables", "lodash", "chartjs"],
  function ($, DataTable, _, Chart) {
    "use strict";

    var chartId = $("#fbw_chart").get(0).getContext("2d");
    var chart = new Chart(chartId, {
      type: "line",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: "Chart.js Line Chart - Multi Axis",
          },
        },
        scales: {
          y1: {
            type: "linear",
            display: true,
            position: "left",
          },
          y2: {
            type: "linear",
            display: true,
            position: "right",

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    });

    function loadData() {
      $.getJSON("/api/chickens/feed-by-weight/", {
        start_week: $("#start_week").val(),
        end_week: $("#end_week").val(),
      }).done(function (response) {
        chart.data.labels = response.chartjs.labels;
        chart.data.datasets = [
          {
            label: "Feed Intake",
            data: response.chartjs.y1,
            yAxisID: "y1",
          },
          {
            label: "Body Weight",
            data: response.chartjs.y2,
            yAxisID: "y2",
          },
        ];
        chart.update();
      });
    }

    // Init
    loadData();

    $("#apply").click(function () {
      loadData();
    });

    $("#download_chart").click(function () {
      var a = document.createElement("a");
      a.href = chart.toBase64Image();
      a.download = "my_file_name.png";
      a.click();

      console.log(a);
    });
  }
);
