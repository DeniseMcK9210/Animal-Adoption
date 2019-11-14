// Create bubble chart (function)
function bubble(data) {
    //Filter the data w/ title inputs
    var data1 = JSON.parse(data).filter(d => d.bechdel_rating == 1);
    console.log(data1)

    d3.json("/cmovies").then(function(data) {
    var bubble_trace1 = {
        x: data.budget
        y: data1.dom_gross.slice(0,100),
        name: "1",
        mode: 'markers',
        marker: {
          color: "#f3ff13",
          opacity: .75,
          size: data1.imdb_rating.slice(0,100)}
        };
    console.log(bubble_trace1)
    var bubble_data = [bubble_trace1];
    
    var bubble_layout = {
      showlegend: true,
      height: "100%",
      width: "100%",
      xaxis:{
          title: 'Budget($)'
        },
      yaxis:{
      title: 'Domestic Gross ($)'
      }
    };
    
    Plotly.newPlot('viz1', bubble_data, bubble_layout);
  };

  d3.json("/rmovies").then(function(data) {
      bubble(data)
  }).catch(error => console.log(error));