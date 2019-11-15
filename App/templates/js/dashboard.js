// create a bar chart (function)
function bar_chart(data){

  var trace1 = {
      x: data.genre, 
      y: data.imdb_rating,
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

 

// Create bubble chart (function)
function bubble(data) {

var bubble_trace = {
    x: data.budget.slice(0,100),
    y: data.dgross.slice(0,100),
    mode: 'markers',
    marker: {
      color: data.bwscore.slice(0,100),
      opacity: .75,
      size: data.imdbscore.slice(0,100)}
    };
  
  var bubble_data = [bubble_trace];
  
  var bubble_layout = {
    showlegend: true,
    height: 500,
    width: 1000,
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

    //unique values(function) and sort in desc order
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }

    //Combine genreA, genreB and genreC. Filter out "None"
    var genreABC = data.genreA.concat(data.genreB, data.genreC).filter(g => g !== 'None');

    //Define lists of genres and decades
    var genres = genreABC.filter(distinct).sort()
    var decades = data.decade.filter(distinct).sort(function(a, b) {
      return b-a;
      });

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
  var filteredg = d3.select("#gfilter option:selected").text();
  var filteredd = d3.select("#dfilter option:selected").text();

  //Pull in data 
  d3.json("link from app.py").then(function(data) {
    
    //Filter the data w/ filteredd & filteredg
    var newdata = data.filter(d =>
      d.genreA === filteredg || 
      d.genreB === filteredg ||
      d.genreC === filteredg && 
      d.decade === filteredd)

    //Fill filter options
    options(newdata);

    //Fill BW Score gauge 1
    create_gauge(newdata, 1)

    //Fill BW Score gauge 2
    create_gauge(newdata, 2)

    //Fill BW Score gauge 3
    create_gauge(newdata, 3)

    //Create Bar Chart
    bar_chart(newdata);

    //Create Bubble Chart
    bubble(newdata);

  }).catch(error => console.log(error));

};

//Function to build dashboard
function dashboard() {
    //Pull in data 
    d3.json("/movies").then(function(data) {
      
      //Fill filter options
      options(data);

      //Fill BW Score gauge 1
      create_gauge(data, 1)

      //Fill BW Score gauge 2
      create_gauge(data, 2)

      //Fill BW Score gauge 3
      create_gauge(data, 3)

      //Create Bar Chart
      bar_chart(data);

      //Create Bubble Chart
      bubble(data);

    }).catch(error => console.log(error)); 
    
};

//Initialize the dashboard
dashboard()


//Filter the dashboard on click of filter button
d3.select("#filter").on("click", dashfilter())
