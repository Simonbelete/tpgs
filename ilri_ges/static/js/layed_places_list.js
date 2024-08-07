requirejs(["jquery", "datatables"], function ($, DataTable, dbs4) {
  "use strict";

  var selector = $("#layed_places_data_table_list");

  var columns = [
    { data: "id", visible: false },
    { data: "name" },
    { data: "created_at" },
    {
      data: null,
      className: "dt-center editor-edit",
      defaultContent:
        '<button type="button" class="btn btn-success">View / Edit</button>',
      orderable: false,
    },
  ];
  var table = selector.DataTable({
    responsive: true,
    lengthChange: true,
    autoWidth: false,
    dom: "lBfrtip",
    buttons: ["copyHtml5", "excelHtml5", "pdfHtml5", "csvHtml5"],
    processing: true,
    serverSide: true,
    ajax: {
      url: "/api/layed-places/",
      dataSrc: function (json) {
        json["data"] = json["results"];
        json["recordsTotal"] = json["count"];
        json["recordsFiltered"] = json["count"];
        return json.data;
      },
      data: function (d) {
        d.search = d.search.value;
        d.limit = d.length;
        var sign = d.order[0].dir == "asc" ? "+" : "-";
        d.ordering = sign + columns[d.order[0].column].data;
        d.columns = [];
        d.order = [];
      },
    },
    columns: columns,
  });

  // Edit record
  selector.on("click", "td.editor-edit, tr td ul .editor-edit", function (e) {
    e.preventDefault();
    var data = table.row(this).data();
    window.location.href = "/locations/layed-places/" + data.id;
  });
});
