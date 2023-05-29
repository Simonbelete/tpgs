define(["jquery", "datatables", "lodash", "chartjs4"], function (
  $,
  DataTable,
  _,
  Chart
) {
  function loadData() {
    var chartId = $("#mortaility-chart-canvas").get(0).getContext("2d");
    var chart = new Chart(chartId, {
      type: "line",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        title: {
          display: true,
          text: "Weights",
        },
        // backgroundColor: "#F5DEB3",
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

    $.getJSON("/api/chickens-mortality/", {}).done(function (response) {
      chart.data.labels = response.chartjs.labels;
      chart.data.datasets[0] = {
        data: response.chartjs.data,
        label: "Mortality",
        fill: true,
        backgroundColor: "rgba(60,141,188,0.9)",
        borderColor: "rgba(60,141,188,0.8)",
        pointRadius: false,
        pointColor: "#3b8bba",
        pointStrokeColor: "rgba(60,141,188,1)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(60,141,188,1)",
      };
      chart.update();
    });
  }

  return loadData();
});
