
// Create bubble chart (function)
function bubble(data) {

  var bubble_trace = {
      x: data.budget,
      y: data.dgross,
      mode: 'markers',
      marker: {
        color: data.bwscore,
        opacity: .75,
        size: data.imdbscore
      };
    
    var bubble_data = [bubble_trace];
    
    var bubble_layout = {
      showlegend: true,
      height: 600,
      width: 1200,
      xaxis:{
          title: 'Budget($)'
        },
      yaxis:{
      title: 'Domestic Gross ($)'
      }
    };
  
   Plotly.newPlot('graph3', bubble_data, bubble_layout);
};

//Fill in filter options (function)
function options(data) {
    // Grab a reference to the dropdown select elements
    var gfilter = d3.select("#gfilter");
    var dfilter = d3.select("#dfilter");
  
    //Define lists of genres and decades
    var genres = data.genre
    var decades = data.decade

    //Options for genres
    genres.forEach((g) => {
        gfilter
        .append("option")
        .text(g)
        .property("value", g);
    });

    //Options for decades
    decades.forEach((d) => {
        dfilter
            .append("option")
            .text(d)
            .property("value", d);
        });
  }

//Filter dashboard (function)
function dashfilter() {
  var filteredg = d3.select("#gfilter option:selected").text()
  var filteredd = d3.select("#dfilter option:selected").text()

  //Pull in data 
  d3.json("link from app.py").then(function(data) {
    
    //Filter the data w/ filteredd & filteredg
    var newdata = data.filter(d =>
      d.genre == filteredg  && d.decade == filteredd
    };

    //Fill filter options
    options(newdata);

    //Fill BW Score gauges
    

    //Create Word cloud
    

    //Create Bar Chart


    //Create Bubble Chart
    bubble(newdata);

  }).catch(error => console.log(error));

};

//Function to build dashboard
function dashboard() {
    //Pull in data 
    d3.json("link from app.py").then(function(data) {
      
      //Fill filter options
      options(data);

      //Fill BW Score gauges
      

      //Create Word cloud
      

      //Create Bar Chart


      //Create Bubble Chart
      bubble(data);

    }).catch(error => console.log(error)); 
    
}

//Initialize the dashboard
dashboard()


//Filter the dashboard on click of filter button
d3.select("#filter").on("click", dashfilter())

// crreat a bar chart fuction
function bar_chart(data){

  var trace1 = {
      x: data.genres, 
      y: data.averageRating,
      type: 'bar',
      text: yValue,
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
          color: 'rbg(8,48,107)',
          width: 1.5
        }
      }
  };

  var bar_data = [trace1];

  var bar_layout = {
    title: 'Genere Average Rating'
  };

  Plotly.newPlot('graph2', bar_data, bar_layout);
};

 

