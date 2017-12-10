var WordCloud = function(container, titleText, lines, colorRange){

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
        arr.push(obj);
        arr.push(obj);
    }
    return arr;
  }, []);

    var chart = new Highcharts.chart({
      chart: {
        type: "wordcloud",
        renderTo: container,
        marginBottom: 100,
        backgroundColor: '#F4F4F8'

      },
      title: {
        text: titleText
      },
      credits: {
      enabled: false
      },
      series: [{
        data: seriesData,
        colorByPoint: true,
        colors: colorRange
      }]
    });
}
