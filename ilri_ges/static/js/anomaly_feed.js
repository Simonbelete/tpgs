requirejs(["jquery", "datatables"], function ($, DataTable) {
  var selector_1 = $("#data_table");

  var columns = [
    { data: "id", visible: false },
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
    dom: "lrt",
    ajax: {
      url: "/api/anomaly/feed/",
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

        d.farms = $("#farm_select").val().join(",");
        d.breed_type = $("#breed_type_select").val().join(",");
        d.sex = $("#sex").val();

        delete d.columns;
      },
    },
    columns: columns,
  });

  // Edit record
  selector_1.on("click", "td.editor-edit, tr td ul .editor-edit", function (e) {
    e.preventDefault();
    var data = table.row(this).data();
    window.location.href = "/feeds/" + data.id;
  });

  function loadImage() {
    var farm = $("#farm_select").val().join(",");
    var breed_types_select = $("#breed_type_select").val().join(",");
    var sex = $("#sex").val();
    console.log($("#sex").val());
    console.log(sex);
    // join(",")
    var query =
      "?breed_type=" + breed_types_select + "&farms=" + farm + "&sex=" + sex;
    $("#anomaly_image").attr("src", "/api/anomaly/feed/graph/" + query);
    $("#anomaly_body_weight_1_download").attr(
      "href",
      "/api/anomaly/feed/graph/" + query
    );
  }

  // Init
  loadImage();

  $("#apply").click(function () {
    table.ajax.reload(null, false);
    loadImage();
  });
});
