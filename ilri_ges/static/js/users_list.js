requirejs(
  [
    "jquery",
    "datatables.net",
    "datatables.net-bs4",
    "datatables.net-responsive",
    "datatablesResponsiveBs4",
    "datatables.net-buttons",
    "datatablesButtonsBs4",
    "jszip",
    "pdfmake",
    "pdfmake_fonts",
    "datatables_buttons_html5",
    "datatables_buttons_print",
    "datatables_buttons_colVis",
  ],
  function ($, DataTable, dbs4) {
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
      buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
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
          d.limit = d.length;
          var sign = d.order[0].dir == "asc" ? "+" : "-";
          d.ordering = sign + columns[d.order[0].column].data;

          // Filters
          d.is_active = $("#is_active").val();
          if ($("#farm_select").val() !== "") d.farms = $("#farm_select").val();

          d.columns = [];
          d.order = [];
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
      window.location.href = "/users/" + data.id;
    });
  }
);
