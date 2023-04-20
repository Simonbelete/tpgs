requirejs(["jquery", "datatables"], function ($, DataTable) {
  var selector_1 = $("#data_table");

  var columns = [
    { data: "chicken_id", visible: false },
    { data: "chicken__tag" },
    { data: "chicken__sex" },
    { data: "week" },
    { data: "weight" },
    { data: "scores" },
    {
      data: null,
      className: "dt-center editor-edit",
      defaultContent:
        '<button type="button" class="btn btn-success">View / Edit</button>',
      orderable: false,
    },
  ];

  var table = selector_1.DataTable({
    responsive: true,
    lengthChange: false,
    autoWidth: false,
    processing: true,
    serverSide: true,
    ajax: {
      url: "/api/anomaly/weights/",
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

        d.start_week = $("#start_week").val();
        d.end_week = $("#end_week").val();
        d.farm = $("#farm_select").val().join(",");
        d.breed_type = $("#breed_type_select").val().join(",");
        d.sex = $("#sex").val();
      },
    },
    columns: columns,
  });

  // Edit record
  selector_1.on("click", "td.editor-edit, tr td ul .editor-edit", function (e) {
    e.preventDefault();
    var data = table.row(this).data();
    window.location.href = "/chickens/" + data.chicken_id + "/weights";
  });

  function loadImage() {
    var start_week = $("#start_week").val();
    var end_week = $("#end_week").val();
    var farm = $("#farm_select").val();
    var breed_types_select = $("#breed_type_select").val();
    var sex = $("#sex").val();
    // join(",")
    var query =
      "?breed_type=" +
      breed_types_select +
      "&farm=" +
      farm +
      "&sex=" +
      sex +
      "&start_week=" +
      start_week +
      "&end_week=" +
      end_week;
    $("#anomaly_body_weight_1").attr(
      "src",
      "/api/anomaly/weights/graph/" + query
    );
    $("#anomaly_body_weight_1_download").attr(
      "href",
      "/api/anomaly/weights/graph/" + query
    );
  }

  // Init
  loadImage();

  $("#weight_piechart_apply").click(function () {
    table.ajax.reload(null, false);
    loadImage();
  });
});
