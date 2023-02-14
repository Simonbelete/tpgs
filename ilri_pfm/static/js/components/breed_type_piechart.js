var breedTypePiechart = {
  init: (selector) => {
    function percentCalculation(a, b){
      var c = a / b * 100;
      return parseFloat(c);
    }

    var pieData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    }

    var pieOptions = {
      legend: {
        display: false
      }
    }

    var pieChart = new Chart(selector, {
      type: 'doughnut',
      data: pieData,
      options: pieOptions
    });

    var data = data || {};

    $.getJSON('/api/v1/statics/breed-types/', data).done(function(response) {
        labels = []
        datasets = {'data': [], 'backgroundColor': []}
        for(var i = 0; i < response.results.length; i++) {
          labels.push(response.results[i].name);
          var percentage = percentCalculation(response.results[i].chicken_count, response.chicken_count)
          datasets.data.push(percentage)
          color = response.results[i].color == null ? '#d2d6de' : response.results[i].color
          datasets.backgroundColor.push(color)
          $('#breed_type_piechart_list').append("<li><i class=\"far fa-circle\" style=\"color:" + color + "\"></i>" + response.results[i].name +"</li>")
          $('#breed_type_piechart_detail_list').append(
            "<li class=\"nav-item\">" +
              "<a href=\"/home/breed-types/" + response.results[i].id + "\" class=\"nav-link\">" + 
                  response.results[i].name + 
                "<span class=\"float-right \"" + "style=\"color:" + color +"\">" +
                percentage  + "%</span>"+
              "</a>" +
            "</li>"
          )
        }
        pieChart.data.labels = labels;
        pieChart.data.datasets[0] = datasets
        pieChart.update();
    });
  }
}