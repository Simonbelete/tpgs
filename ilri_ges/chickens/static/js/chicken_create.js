requirejs(
  [
    "jquery",
    "datatables.net",
    "moment",
    "daterangepicker",
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
  function ($, DataTable, moment, daterangepicker) {
    $("#hatch_date").daterangepicker(
      {
        autoUpdateInput: false,
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

    $("#hatch_date").on("apply.daterangepicker", function (ev, picker) {
      $(this).val(picker.startDate.format("MM/DD/YYYY"));
    });

    // Dead date
    $("#dead_date").daterangepicker(
      {
        autoUpdateInput: false,
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

    $("#dead_date").on("apply.daterangepicker", function (ev, picker) {
      $(this).val(picker.startDate.format("MM/DD/YYYY"));
    });
    
    $('#dead_date').removeAttr('required');​​​​​

  }
);
