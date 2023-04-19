requirejs(
  ["jquery", "datatables", "lodash", "chartjs4"],
  function ($, DataTable, _, Chart) {
    // init
    loadData();

    $("#farm_select").on("change", function (e) {
      console.log("changeeeee");
      loadData();
    });

    function loadData() {
      $.ajax({
        url:
          "/api/dashboard/statics?farms=" + $("#farm_select").val().join(","),
        success: function (result) {
          $("#stat_user").html(result.statics_count.users_count);
          $("#stat_flocks").html(result.statics_count.flocks_count);
          $("#stat_farms").html(result.statics_count.farms_count);
          $("#stat_chicken").html(result.statics_count.chicken_count);
        },
      });
    }
  }
);
