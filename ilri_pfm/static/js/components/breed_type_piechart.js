var breedTypePiechart = {
  init: (selector) => {
    var pieData = {
      labels: [
        'Chrome',
        'IE',
        'FireFox',
        'Safari',
        'Opera',
        'Navigator'
      ],
      datasets: [
        {
          data: [700, 500, 400, 600, 300, 100],
          backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de']
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
    })
  },
  ajax: () => {
    var data = data || {};

    $.getJSON('/api/v1/', data).done(function(response) {
        chart.data.labels = response.labels;
        chart.data.datasets[0].data = response.data.quantity; // or you can iterate for multiple datasets
        chart.update(); // finally update our chart
    });
  }
}