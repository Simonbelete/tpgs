requirejs(
  ["jquery", "datatables", "lodash", "chartjs"],
  function ($, DataTable, _, Chart) {
    "use strict";

    var selector = $("#chicken_offsprings");

    var columns = [
      { data: "id", visible: false },
      { data: "breed_pair.sire.name", defaultContent: "" },
      { data: "breed_pair.dam.name", defaultContent: "" },
      { data: "tag", defaultContent: "" },
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
      lengthChange: true,
      dom: "rltip",
      ajax: {
        url: "/api/chickens/" + selector.data("id") + "/offsprings",
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
      window.location.href = "/chickens/" + data.id;
    });
  }
);
