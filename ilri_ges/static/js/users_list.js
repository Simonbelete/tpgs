requirejs(["jquery", "datatables", "lodash"], function ($, DataTable, _) {
  "use strict";

  var selector = $("#users_data_list_table");

  var columns = [
    { data: "id", visible: false },
    { data: "name" },
    { data: "email" },
    {
      data: null,
      className: "dt-center editor-edit",
      defaultContent:
        '<button type="button" class="btn btn-success">View / Edit</button>',
      orderable: false,
    },
  ];

  var table = new DataTable("#users_data_list_table", {
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
      url: "/api/users/",
      dataSrc: function (json) {
        json["data"] = json["results"];
        json["recordsTotal"] = json["count"];
        json["recordsFiltered"] = json["count"];
        return json.data;
      },
      data: function (d) {
        // d.search = d.search.value;
        // d.limit = d.length;
        // var sign = d.order[0].dir == "asc" ? "+" : "-";
        // d.ordering = sign + columns[d.order[0].column].data;
        // var filters = _.omitBy(d.searchPanes, _.isEmpty);
        // console.log(d);
        // console.log(d);
        // const searchPanes = d.searchPanes;
        // console.log(searchPanes);
        // for (var k in d) {
        //   console.log(k);
        // }
        // for (k in filters) {
        //   d[k] = filters[k][0];
        //   console.log(filters[k][0]);
        // }
        // Filters
        // d.is_active = $("#is_active").val();
        // if ($("#farm_select").val() !== "") d.farms = $("#farm_select").val();
        // d.columns = [];
        // d.order = [];
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
        targets: [0, 1, 2],
      },
    ],
  });

  table.on("preXhr.dt", function (e, settings, data) {
    console.log(data);
    console.log(data.searchPanes);
  });

  $("#apply_filter").click(function () {
    table.ajax.reload(null, false);
  });

  // Edit record
  selector.on("click", "td.editor-edit, tr td ul .editor-edit", function (e) {
    e.preventDefault();
    var data = table.row(this).data();
    window.location.href = "/users/" + data.id;
  });
});
