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

    $('#fcr_daterange').daterangepicker({}, function(start, end, label) {
      console.log("{{ data.id }}")
      loadData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
    })

    function loadData(start_date, end_date){
      $.get("/api/v1/fcr/?chicken" + "{{ data.id }}" + "&start_date=" + start_date + "&end_date=" + end_date, function(data, status){
        labels = []
        datasets = {
          data: [],
          label: "{{ data.tag }}",
          borderColor: "#c45850",
          fill: true
        }
        var startTime = start_date.getTime()
        var endTime = end_date.getTime()
        for(loopTime = startTime; loopTime < endTime; loopTime += 86400000){
          var loopDay=new Date(loopTime)
          console.log(loopDay)
        }
      })
    }
  }
}