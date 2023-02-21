var fcr = {
  init: (selector) => {
    var cId = selector.get(0).getContext('2d')
    var chart = new Chart(cId, {
        type: 'line',
        data: {
          labels: [],
          datasets: []
        },
        options: {
          title: {
            display: true,
            text: 'Daily Feed conversation ratio'
          }
        }
    });
  }
}