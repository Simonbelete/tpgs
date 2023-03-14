requirejs(["jquery", "select2"], function ($, Select2) {
  breed_multiselect_input = breedMultipleSelect.init($("#breed-multiselect"));

  breed_multiselect_input.on("select2:select", function (e) {
    var data = e.params.data;
    console.log($("#breed-multiselect").val());
  });

  $("#weight_piechart_apply").click(function () {
    start_week = $("#start_week").val();
    end_week = $("#end_week").val();
    breed_types_select = $("#breed-multiselect").val();
    query =
      "?breed_type=" +
      breed_types_select.join(",") +
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
