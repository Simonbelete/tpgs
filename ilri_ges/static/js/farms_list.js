requirejs(["jquery", "datatables"], function ($, DataTable, dbs4) {
  "use strict";

  var selector = $("#farms_data_list_table");

  var columns = [
    { data: "id", visible: false },
    { data: "name" },
    { data: "city", defaultContent: "" },
    { data: "chicken_count", defaultContent: "" },
    { data: "created_at" },
    {
      data: null,
      className: "dt-center editor-edit",
      defaultContent:
        '<button type="button" class="btn btn-success">View / Edit</button>',
      orderable: false,
    },
  ];

  var table = new DataTable(selector, {
    processing: true,
    serverSide: true,
    responsive: true,
    autoWidth: false,
    lengthChange: true,
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
    ajax: {
      url: "/api/farms/",
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
    window.location.href = "/farms/" + data.id;
  });
});
