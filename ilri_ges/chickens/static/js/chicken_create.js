requirejs(
  ["jquery", "datatables", "moment", "daterangepicker"],
  function ($, DataTable, moment, daterangepicker) {
    $("#hatch_date").daterangepicker(
      {
        autoUpdateInput: false,
        autoApply: true,
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format("YYYY"), 10),
        locale: {
          format: "YYYY-MM-DD",
        },
      },
      function (start, end, label) {
        var years = moment().diff(start, "years");
      }
    );

    $("#hatch_date").on("apply.daterangepicker", function (ev, picker) {
      $(this).val(picker.startDate.format("YYYY-MM-DD"));
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
        locale: {
          format: "YYYY-MM-DD",
        },
      },
      function (start, end, label) {
        var years = moment().diff(start, "years");
      }
    );

    $("#dead_date").on("apply.daterangepicker", function (ev, picker) {
      $(this).val(picker.startDate.format("YYYY-MM-DD"));
    });

    $("#dead_date").removeAttr("required");

    $("#delete_button").click(function () {
      if (confirm("Are you sure you want to delete?")) {
        $.ajax({
          url: "/chickens/" + $("#chicken_id").data("id"),
          type: "DELETE",
          success: function (result) {
            console.log(result);
          },
        });
        // window.location = "/chickens/" + $("#chicken_id").data("id");
      }
    });
  }
);
