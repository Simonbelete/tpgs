requirejs(["jquery"], function () {
  $.get(
    "/api/chickens/" + $("#chicken_id").data("id") + "/statics",
    function (data, status) {
      $("#statics_weight").html(
        data.weight.weight + " (Week " + data.weight.week + ")"
      );
      $("#statics_egg").html(data.total_egg);
      $("#statics_fcr").html(data.fcr + "%");
      $("#statics_total_feed").html(data.total_feed + "g");
    }
  );
});
