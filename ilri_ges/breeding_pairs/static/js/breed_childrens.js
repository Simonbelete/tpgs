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
    var selector = $("#breed_childrens");
    // History
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
      processing: true,
      serverSide: true,
      ajax: {
        url: "/api/breeding-pairs/" + selector.data("id") + "/children",
        dataSrc: function (json) {
          json["data"] = json["results"];
          json["recordsTotal"] = json["count"];
          json["recordsFiltered"] = json["count"];
          return json.data;
        },
        data: function (d) {
          d.search = "";
          var sign = d.order[0].dir == "asc" ? "+" : "-";
          d.ordering = "";

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
      window.location.href = "/chickens/" + data.id;
    });
  }
);
