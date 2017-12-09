var WordCloud = function(container, titleText, lines){

  var seriesData = Highcharts.reduce(lines, function (arr, word) {
    var obj = Highcharts.find(arr, function (obj) {
        return obj.name === word;
    });
    if (obj) {
        obj.weight += 1;
    } else {
        obj = {
            name: word,
            weight: 1
        };
        arr.push(obj);
    }
    return arr;
  }, []);

    var chart = new Highcharts.chart({
      chart: {
        type: "wordcloud",
        renderTo: container
      },
      title: {
        text: titleText
      },
      series: [{
        data: seriesData,
        colorByPoint: true,
        colors:['#1D84B5', '#34F6F2', '#7D84B2']
      }]
    });
}
