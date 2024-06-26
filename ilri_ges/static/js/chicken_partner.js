requirejs(
  ["jquery", "datatables", "lodash", "chartjs"],
  function ($, DataTable, _, Chart) {
    "use strict";

    var selector = $("#chicken_partner");

    var columns = [
      { data: "id", visible: false },
      { data: "sire.name", defaultContent: "" },
      { data: "dam.name", defaultContent: "" },
      { data: "date" },
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
      dom: "lrt",
      ajax: {
        url: "/api/chickens/" + selector.data("id") + "/breedings",
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
      window.location.href = "/breeding-pairs/" + data.id;
    });
  }
);
