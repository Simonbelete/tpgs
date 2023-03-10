requirejs(
  ["jquery", "bootstrap", "bootstrap-colorpicker"],
  function ($, bootstrap, colorpicker) {
    $("#color_picker").colorpicker();
    $("#color_picker").on("colorpickerChange", function (event) {
      $("#color_picker .fa-square").css("color", event.color.toString());
    });
  }
);
