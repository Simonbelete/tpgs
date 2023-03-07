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
    var selector = $("#history");
    // History
    var historyColumns = [
      { data: "history_user.name" },
      { data: "chicken.tag" },
      { data: "week" },
      { data: "eggs" },
      { data: "history_date" },
    ];
    var historyTable = selector.DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      processing: true,
      serverSide: true,
      ajax: {
        url: "/api/chickens/" + selector.data("id") + "/histories",
        dataSrc: function (json) {
          json["data"] = json["results"];
          json["recordsTotal"] = json["count"];
          json["recordsFiltered"] = json["count"];
          return json.data;
        },
        data: function (d) {
          d.search = d.search.value;
          var sign = d.order[0].dir == "asc" ? "+" : "-";
          d.ordering = sign + historyColumns[d.order[0].column].data;
        },
      },
      columns: historyColumns,
    });
  }
);
