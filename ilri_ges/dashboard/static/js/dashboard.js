requirejs(
  ["jquery", "datatables", "lodash", "chartjs4"],
  function ($, DataTable, _, Chart) {
    //
    // Mortality
    //
    var mortality_chartId = $("#mortaility-chart-canvas")
      .get(0)
      .getContext("2d");
    var mortality_chart = new Chart(mortality_chartId, {
      type: "line",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        title: {
          display: true,
          text: "Weights",
        },
        // backgroundColor: "#F5DEB3",
      },
      plugins: [
        {
          beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
          },
        },
      ],
    });

    function loadMortality() {
      $.getJSON("/api/chickens-mortality/", {
        farms: $("#farm_select").val().join(","),
      }).done(function (response) {
        mortality_chart.data.labels = response.chartjs.labels;
        mortality_chart.data.datasets[0] = {
          data: response.chartjs.data,
          label: "Mortality",
          fill: true,
          backgroundColor: "rgba(60,141,188,0.9)",
          borderColor: "rgba(60,141,188,0.8)",
          pointRadius: false,
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(60,141,188,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(60,141,188,1)",
        };
        mortality_chart.update();
      });
    }

    ///
    /// Breed type
    ///

    function percentCalculation(a, b) {
      var c = (a / b) * 100;
      return parseFloat(c.toFixed(2));
    }

    var pieChart = new Chart(
      $("#breed_type_piechart").get(0).getContext("2d"),
      {
        type: "doughnut",
        data: {
          labels: [],
          datasets: [],
        },
        // options: pieOptions,
      }
    );

    function loadBreedType() {
      $.getJSON(
        "/api/breed-types/count/?farms=" + $("#farm_select").val().join(","),
        {}
      ).done(function (response) {
        labels = [];
        datasets = { data: [], backgroundColor: [] };
        // Remove all before
        $("#breed_type_piechart_list").empty();
        $("#breed_type_piechart_detail_list").empty();
        for (var i = 0; i < response.results.length; i++) {
          labels.push(response.results[i].name);
          var percentage = percentCalculation(
            response.results[i].chicken_count,
            response.chicken_count
          );
          datasets.data.push(percentage);
          color =
            response.results[i].color == null
              ? "#d2d6de"
              : response.results[i].color;
          datasets.backgroundColor.push(color);
          $("#breed_type_piechart_list").append(
            '<li><i class="far fa-circle" style="color:' +
              color +
              '"></i>' +
              response.results[i].name +
              "</li>"
          );
          $("#breed_type_piechart_detail_list").append(
            '<li class="nav-item">' +
              '<a href="/breeds/' +
              response.results[i].id +
              '" class="nav-link">' +
              response.results[i].name +
              '<span class="float-right "' +
              'style="color:' +
              color +
              '">' +
              percentage +
              "%</span>" +
              "</a>" +
              "</li>"
          );
        }

        pieChart.data.labels = labels;
        pieChart.data.datasets[0] = datasets;
        pieChart.update();
      });
    }

    ///
    /// Sex
    ///

    var sex_pieChart = new Chart($("#sex_piechart").get(0).getContext("2d"), {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [],
      },
      // options: pieOptions,
    });

    function loadSex() {
      $.getJSON(
        "/api/chickens-sex-chart/?farms=" + $("#farm_select").val().join(","),
        {}
      ).done(function (response) {
        sex_pieChart.data.labels = response.chartjs.labels;
        sex_pieChart.data.datasets[0] = {
          data: response.chartjs.data,
          label: "Sex",
        };
        sex_pieChart.update();
      });
    }

    ///
    /// Age Group
    var agegroup_pieChart = new Chart(
      $("#age-group-chart-canvas").get(0).getContext("2d"),
      {
        type: "bar",
        data: {
          labels: [],
          datasets: [],
        },
        options: {
          indexAxis: "y",
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          responsive: true,
        },
      }
    );

    function loadAgeGroup() {
      $.getJSON(
        "/api/chickens-age-group-chart/?farms=" +
          $("#farm_select").val().join(","),
        {}
      ).done(function (response) {
        agegroup_pieChart.data.labels = response.chartjs.labels;
        agegroup_pieChart.data.datasets[0] = {
          data: response.chartjs.data,
          label: "",
          backgroundColor: [
            "#4C90BA",
            "#2BC2C2",
            "#F4B811",
            "#DE663E",
            "#FF912B",
            "#ebdc78",
          ],
        };
        agegroup_pieChart.update();
      });
    }

    //
    // init
    //
    loadData();
    loadMortality();
    loadBreedType();
    loadSex();
    loadAgeGroup();

    $("#farm_select").on("change", function (e) {
      loadData();
      loadMortality();
      loadBreedType();
      loadSex();
      loadAgeGroup();
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
