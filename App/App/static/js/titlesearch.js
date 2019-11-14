//Fill title select boxes(function)
function titles(data) {
    // Grab a reference to the dropdown select elements
    var title1 = d3.select("#title1input");
    var title2 = d3.select("#title2input");
  
    //Define lists of titles
    var titles = data.title.slice(0,100).sort();

    //Options for title 1
    titles.forEach((t) => {
        title1
        .append("option")
        .text(t)
        .property("value", t);
    });

    //Options for title2
    titles.forEach((tt) => {
        title2
            .append("option")
            .text(tt)
            .property("value", tt);
        });
  }

//Fill select boxes w/data
d3.json("/cmovies").then(function(data) {
    titles(data);
}).catch(error => console.log(error)); 


//Display stats for titles (function)
function titlesearch(title, titletron) {
    
    console.log(title);
  
    //Pull in data 
    d3.json("/rmovies").then(function(data) {
      //Filter the data w/ title inputs
      var titledata = JSON.parse(data).filter(d => d.title == title);
        
        //Create array of data to display
        var displaydata = {
            "Title": titledata[0].title,
            "Genre": titledata[0].genres,
            "Release Year": titledata[0].year,
            "Bechdel Rating": titledata[0].bechdel_rating,
            "IMDb Rating": titledata[0].averageRating,
            "Budget ($)": titledata[0].budget_2013,
            "Domestic Gross ($)": titledata[0].domgross_2013,
            "International Gross($)": titledata[0].intgross_2013,
        };
        console.log(displaydata);
        //Add html to show stats in table for each title
        //Select div for stats
        //var titletron = d3.select('#ts1');
        console.log(titletron);
        // Use `.html("") to clear any existing metadata
        titletron.html("");

        console.log( Object.entries(displaydata));
        // Use `Object.entries` to add each key and value pair to the table
        Object.entries(displaydata).forEach(([key, value]) =>
            titletron.append("h5").text("x"));
        
    }).catch(error => console.log(error)); 

    };

    function optionChanged1(title) {
        var titletron = d3.select('#ts1');
        // Fetch new data each time a new sample is selected
        titlesearch(title, titletron);
      }
    
    function optionChanged2(title) {
        var titletron = d3.select('#ts2');
        // Fetch new data each time a new sample is selected
        titlesearch(title, titletron);
      }

//Display title 1 stats
//d3.select("#button1").on("click", titlesearch(1))

//Display title 2 stats
//d3.select("#button2").on("click", titlesearch(2))