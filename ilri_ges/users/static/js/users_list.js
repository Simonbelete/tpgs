requirejs(["jquery", "datatables.net"], function ($, DataTable, dbs4) {
  "use strict";

  var selector = $("#users_data_list_table");

  var columns = [
    { data: "id", visible: false },
    { data: "name" },
    { data: "email" },
    {
      data: null,
      className: "dt-center editor-edit",
      defaultContent: '<i class="fas fa-pencil-alt"></i>',
      orderable: false,
    },
  ];

  var table = new DataTable("#users_data_list_table", {
    responsive: true,
    lengthChange: false,
    autoWidth: false,
    dom: "Bfrtip",
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
    processing: true,
    serverSide: true,
    ajax: {
      url: "/api/users/",
      dataSrc: function (json) {
        json["data"] = json["results"];
        json["recordsTotal"] = json["count"];
        json["recordsFiltered"] = json["count"];
        return json.data;
      },
      data: function (d) {
        d.search = d.search.value;
        for (let i = 0; i < d.order.length; i++) {
          var sign = d.order[i].dir == "asc" ? "+" : "-";
          d.ordering = sign + columns[i].data;
        }
      },
    },
    columns: columns,
  });

  // Edit record
  selector.on("click", "td.editor-edit", function (e) {
    e.preventDefault();
    var data = table.row(this).data();
    window.location.href = "users/" + data.id;
  });
});
