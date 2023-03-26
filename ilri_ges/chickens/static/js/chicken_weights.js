requirejs(
  ["jquery", "datatables", "lodash", "chartjs4"],
  function ($, DataTable, _, Chart) {
    "use strict";

    var selector = $("#chicken_feeds");

    var columns = [
      { data: "id", visible: false },
      { data: "week" },
      { data: "weight" },
      {
        data: null,
        className: "dt-center editor-edit",
        defaultContent:
          '<button type="button" class="btn btn-success">View / Edit</button>',
        orderable: false,
      },
    ];

    var chartId = $("#chicken_feeds_chart").get(0).getContext("2d");
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

    var table = selector.DataTable({
      processing: true,
      serverSide: true,
      responsive: true,
      autoWidth: false,
      dom: "Brt",
      buttons: ["copy", "excel", "csv", "print"],
      ajax: {
        url: "/api/chickens/" + selector.data("id") + "/weights",
        dataSrc: function (json) {
          // For Chartjs
          var datasets = {
            data: [],
            label: "Body Weight",
            borderColor: "#c45850",
            fill: true,
          };
          var labels = [];
          for (var i = 0; i < json["results"].length; i++) {
            labels.push(json["results"][i]["week"]);
            datasets.data.push(json["results"][i]["weight"]);
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
          d.start_week = $("#start_week").val();
          d.end_week = $("#end_week").val();

          d.search = d.search.value;
          d.offset = d.start;
          d.limit = d.length;
          var sign = d.order[0].dir == "asc" ? "+" : "-";
          d.ordering = sign + columns[d.order[0].column].data;

          d.columns = [];
          d.order = [];
          delete d.length;
          delete d.draw;
        },
      },
      columns: columns,
    });

    $("#apply_filter").click(function () {
      table.ajax.reload(null, false);
    });

    // Edit record
    selector.on("click", "td.editor-edit, tr td ul .editor-edit", function (e) {
      e.preventDefault();
      var data = table.row(this).data();
      window.location.href = "/weights/" + data.id;
    });

    $("#apply").click(function () {
      table.ajax.reload(null, false);
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
