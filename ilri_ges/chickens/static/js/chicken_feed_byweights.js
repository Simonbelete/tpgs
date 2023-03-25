requirejs(
  ["jquery", "datatables", "lodash", "chartjs4"],
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
            text: "Feed consumption by Body Weight Report",
          },
        },
        scales: {
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Feed Intake in g",
              font: {
                size: 15,
              },
            },
            min: 0,
            // ticks: {
            //   stepSize: 100,
            // },
            grid: {
              drawOnChartArea: true,
            },
          },
          y2: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Body Weight in g",
              font: {
                size: 15,
              },
            },
            min: 0,
            // ticks: {
            //   stepSize: 10,
            // },

            // grid line settings
            grid: {
              drawOnChartArea: true,
            },
          },
        },
      },
    });

    function loadData() {
      $.getJSON("/api/chickens/feed-by-weight/", {
        start_week: $("#start_week").val(),
        end_week: $("#end_week").val(),
        farm: $("#farm_select").val().join(","),
        breed_type: $("#breed_type_select").val().join(","),
        house: $("#house_select").val().join(","),
        period: $("#plot_period").val(),
      }).done(function (response) {
        chart.data.labels = response.chartjs.labels;
        chart.data.datasets = [
          {
            label: "Body Weight",
            data: response.chartjs.y2,
            yAxisID: "y2",
          },
          {
            label: "Feed Intake",
            data: response.chartjs.y1,
            yAxisID: "y1",
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
