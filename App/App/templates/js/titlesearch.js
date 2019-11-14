//Fill title select boxes(function)
function titles(data) {
    // Grab a reference to the dropdown select elements
    var title1 = d3.select("#title1-input");
    var title2 = d3.select("#title2-input");
  
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
d3.json("/movies").then(function(data) {
    titles(data);
}).catch(error => console.log(error)); 


//Display stats for titles (function)
function titlesearch(select) {
    
    //Get selected title
    var title = d3.select(`#title${select}-input option:selected`).text();
  
    //Pull in data 
    d3.json("/movies").then(function(data) {
      
      //Filter the data w/ title inputs
      var titledata = data.filter(d =>
        d.title == title);

        //Create array of data to display
        var displaydata = {
            "Title": titledata.title,
            "Genre": titledata.genre,
            "Release Year": titledata.year,
            "Bechdel Rating": titledata.bechdel_rating,
            "IMDb Rating": titledata.imdb_rating,
            "Budget ($)": titledata.budget,
            "Domestic Gross ($)": titledata.dom_gross,
            "International Gross($)": titledata.int_gross,
        };
      
        //Add html to show stats in table for each title
        //Select div for stats
        var titletron = d3.select(`#ts${select}`)

        // Use `.html("") to clear any existing metadata
        titletron.html("");

        // Use `Object.entries` to add each key and value pair to the table
        Object.entries(displaydata).forEach(([key, value]) => {
            var row = titletron.append("tr");
            var cell1 = row.append("td");
            var cell2 = row.append("td");
            cell1.text(key).classed("ft-sans", true);
            cell2.text(value)
          });

      }).catch(error => console.log(error)); 

    };

//Display title 1 stats
d3.select("#button1").on("click", titlesearch(1))

//Display title 2 stats
d3.select("#button2").on("click", titlesearch(2))