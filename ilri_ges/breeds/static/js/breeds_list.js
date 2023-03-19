requirejs(["jquery", "datatables", "lodash"], function ($, DataTable, _) {
  "use strict";

  var selector = $("#breed_type_table");

  var columns = [
    { data: "id", visible: false },
    { data: "name" },
    { data: "is_active", visible: false },
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
    processing: true,
    serverSide: true,
    responsive: true,
    autoWidth: false,
    lengthChange: true,
    dom: "Bfrltip",
    buttons: [
      {
        extend: "searchPanes",
        config: {
          cascadePanes: true,
        },
      },
    ],
    ajax: {
      url: "/api/breed-types/",
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

        delete d.columns;
        delete d.order;
      },
    },
    columns: columns,
    searchPanes: {
      viewTotal: true,
    },
    columnDefs: [
      {
        searchPanes: {
          show: true,
        },
        targets: [2],
      },
    ],
  });

  // Edit record
  selector.on("click", "td.editor-edit, tr td ul .editor-edit", function (e) {
    e.preventDefault();
    var data = table.row(this).data();
    window.location.href = "/breeds/" + data.id;
  });
});
