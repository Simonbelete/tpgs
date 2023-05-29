requirejs(["jquery", "select2"], function ($, Select2) {
  $("#weight_piechart_apply").click(function () {
    var start_week = $("#start_week").val();
    var end_week = $("#end_week").val();
    var breed_types_select = $("#breed_type_select").val();
    // join(",")
    var query =
      "?breed_type=" +
      breed_types_select +
      "&start_week=" +
      start_week +
      "&end_week=" +
      end_week;
    $("#weight_piechart_img").attr(
      "src",
      "/api/weights/growth-performance" + query
    );
    $("#weight_piechart_download").attr(
      "href",
      "/api/weights/growth-performance" + query
    );
  });
});
