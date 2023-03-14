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
      processing: true,
      serverSide: true,
      responsive: true,
      autoWidth: false,
      lengthChange: true,
      buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
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
          d.offset = d.start;
          d.limit = d.length;
          var sign = d.order[0].dir == "asc" ? "+" : "-";
          d.ordering = sign + columns[d.order[0].column].data;

          // Filters
          d.is_active = $("#is_active").val();
          d.sex = $("#filter_sex").val();
          if ($("#farm_select").val() !== "") d.farm = $("#farm_select").val();
          if ($("#breed_type_select").val() !== "")
            d.breed_type = $("#breed_type_select").val();

          d.columns = [];
          d.order = [];
          delete d.length;
          delete d.draw;
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
      window.location.href = "/chickens/" + data.id;
    });

    // if (window.matchMedia("(max-width: 767px)").matches) {
    //   $("#chickens_data_list_table tbody").on(
    //     "click",
    //     "tr td ul .editor-edit",
    //     function () {
    //       var data = table.row(this).data();
    //       window.location.href = "/home/users/" + data.id;
    //     }
    //   );
    // }
  }
);
