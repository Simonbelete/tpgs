requirejs(
  ["jquery", "daterangepicker", "moment"],
  function ($, daterangepicker, moment) {
    $("#date_time").daterangepicker({
      timePicker: true,
      singleDatePicker: true,
      showDropdowns: true,
      // minYear: 1901,
      // maxYear: parseInt(moment().format("YYYY"), 10),
      locale: {
        format: "M/DD/YYYY hh:mm:ss",
      },
    });
  }
);
