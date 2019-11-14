

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
  var data1 = JSON.parse(data).filter(d => d.bechdel_rating == 1);
  console.log(data1);
  var bubble_trace1 = {
      x: data1.budget.slice(0,100),
      y: data1.dom_gross.slice(0,100),
      name: "1",
      mode: 'markers',
      marker: {
        color: "#f3ff13",
        opacity: .75,
        size: data1.imdb_rating.slice(0,100)}
      };
  console.log(bubble_trace1),
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
  //var filteredg = d3.select("#gfilter option:selected").text();
  //var filteredd = d3.select("#dfilter option:selected").text();

  //Pull in data 
  d3.json("/rmovies").then(function(data) {
    
    //Filter the data w/ filteredd & filteredg
    var newdata = data
    //data.filter(d =>
     // d.genreA === filteredg || 
      //d.genreB === filteredg ||
      //d.genreC === filteredg && 
      //d.decade === filteredd)

    //Fill filter options
    options(newdata);

    //Fill BW Score gauge 1
    //create_gauge(newdata, 1)

    //Fill BW Score gauge 2
    //create_gauge(newdata, 2)

    //Fill BW Score gauge 3
    //create_gauge(newdata, 3)

    //Create Bar Chart
    //bar_chart(newdata);

    //Create Bubble Chart
    bubble(newdata);

  }).catch(error => console.log(error));

};

//Function to build dashboard
function dashboard() {
  d3.json("/cmovies").then(function(data) {
    //Fill filter options
    options(data);
  });

    //Pull in data 
    d3.json("/rmovies").then(function(data) {

      //Fill BW Score gauge 1
      //create_gauge(data, 1)

      //Fill BW Score gauge 2
      //create_gauge(data, 2)

      //Fill BW Score gauge 3
      //create_gauge(data, 3)

      //Create Bar Chart
      //bar_chart(data);

      //Create Bubble Chart
      bubble(data);

    }).catch(error => console.log(error)); 
    
};

//Initialize the dashboard
dashboard()


//Filter the dashboard on click of filter button
d3.select("#filter").on("click", dashfilter())

