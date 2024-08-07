requirejs(
  ["jquery", "daterangepicker", "moment"],
  function ($, daterangepicker, moment) {
    $("#date").daterangepicker(
      {
        autoApply: true,
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format("YYYY"), 10),
      },
      function (start, end, label) {
        var years = moment().diff(start, "years");
      }
    );
  }
);
