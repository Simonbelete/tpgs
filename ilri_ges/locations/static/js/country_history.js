requirejs(["jquery", "datatables"], function ($, DataTable) {
  var selector = $("#history");
  // History
  var historyColumns = [
    { data: "history_user.name" },
    { data: "name" },
    { data: "history_date" },
  ];
  var historyTable = selector.DataTable({
    responsive: true,
    lengthChange: false,
    autoWidth: false,
    processing: true,
    serverSide: true,
    ajax: {
      url: "/api/countries/" + selector.data("id") + "/histories",
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
});
