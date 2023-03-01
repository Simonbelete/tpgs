"use strict";

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
  function ($, DataTable) {
    "use strict";

    var selector = $("#chickens_data_list_table");

    var columns = [
      { data: "id", visible: false },
      { data: "tag" },
      { data: "sex" },
      { data: "farm.name", defaultContent: "" },
      { data: "house.name", defaultContent: "" },
      { data: "breed_type.name", defaultContent: "" },
      { data: "hatch_date" },
      { data: "is_double_yolk" },
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
      lengthChange: false,
      autoWidth: false,
      select: true,
      //dom: 'Bfrtip',
      dom: "Plfrtip",
      buttons: ["copyHtml5", "excelHtml5", "pdfHtml5", "csvHtml5"],
      processing: true,
      serverSide: true,
      ajax: {
        url: "/api/chickens/",
        dataSrc: function (json) {
          json["data"] = json["results"];
          json["recordsTotal"] = json["count"];
          json["recordsFiltered"] = json["count"];
          return json.data;
        },
        data: function (d) {
          d.search = d.search.value;
          var sign = d.order[0].dir == "asc" ? "+" : "-";
          d.ordering = sign + columns[d.order[0].column].data;

          // Filters
          d.sex = $("#filter_sex").val();
          d.farm = $("#filter_farm").val();
          d.breed_type = $("#filter_breed_type").val();

          d.columns = [];
          d.order = [];
        },
      },
      columns: columns,
    });
  }
);
