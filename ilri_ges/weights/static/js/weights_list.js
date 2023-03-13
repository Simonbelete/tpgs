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

    var selector = $("#weights_data_table_list");

    var columns = [
      { data: "id", visible: false },
      { data: "week" },
      { data: "weight" },
      { data: "chicken.tag" },
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
        url: "/api/weights",
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
    selector.on("click", "td.editor-edit", function (e) {
      e.preventDefault();
      var data = table.row(this).data();
      window.location.href = "/weights/" + data.id;
    });
  }
);