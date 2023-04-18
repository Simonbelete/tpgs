requirejs(
  ["jquery", "datatables", "lodash", "chartjs4"],
  function ($, DataTable, _, Chart) {
    "use strict";

    var selector = $("#hatchery_incubation");

    var columns = [
      { data: "id", visible: false },
      { data: "date_time" },
      { data: "temperature_celsius" },
      { data: "humidity_fahrenheit" },
      { data: "humidity_percent" },
      { data: "remark" },
      {
        data: null,
        className: "dt-center editor-edit",
        defaultContent:
          '<button type="button" class="btn btn-success">View / Edit</button>',
        orderable: false,
      },
    ];

    var table = selector.DataTable({
      processing: true,
      serverSide: true,
      responsive: true,
      autoWidth: false,
      dom: "Brt",
      buttons: ["copy", "excel", "csv", "print"],
      ajax: {
        url: "/api/hatchery/" + selector.data("id") + "/incubation",
        dataSrc: function (json) {
          json["data"] = json["results"];
          json["recordsTotal"] = json["count"];
          json["recordsFiltered"] = json["count"];
          return json.data;
        },
        data: function (d) {
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

    // Edit record
    selector.on("click", "td.editor-edit, tr td ul .editor-edit", function (e) {
      e.preventDefault();
      var data = table.row(this).data();
      window.location.href = "/incubation/" + data.id;
    });
  }
);
