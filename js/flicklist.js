
var model = {
  watchlistItems: [],
  browseItems: []
}

var api = {
  root: "https://api.themoviedb.org/3",
  token: "429499992a4160acd83cf6b99dc9c8f6" // TODO 0 put your api key here
}

function discoverMovies(callback){
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
      model.browseItems = response.results;
      console.log(model.browseItems);
			// invoke the callback function that was passed in.
			callback();
		}
	});
}
/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  //clears the visual list first
  $('#section-watchlist ul').empty();
  $('#section-browse ul').empty();

  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach((movie)=>{
    var titleWatchlist = $('<p></p>').text(movie);
    var titleWatchlistLi = $('<li></li>').append(titleWatchlist);
    $('#section-watchlist ul').append(titleWatchlistLi);
  });

  model.browseItems.forEach(function(movie) {
		// insert a list item into the <ul> in the browse section
    var titleBrowse = $('<p></p>').text(movie.original_title);
    var titleBrowseLi = $('<li></li>').append(titleBrowse);
    $('#section-browse ul').append(titleBrowseLi);

		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
    // titleli.append('<button> Add to Watchlist</button>');
    var myButton = $("<button></button>").text("Add to Watchlist");
    titleBrowseLi.append(myButton);

		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
      myButton.click(function() {
        model.watchlistItems.push(movie.original_title);
        console.log(model.watchlistItems);
        render();
      });
  });//forEach
}//render

// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

// function mergeArrays(a, b) {
//     a.sort();
//     b.sort();
//     // var newA = a.split(",");
//     var mergedArray = [];
//     var ai = 0; // a index
//     var bi = 0; // b index
//     console.log("a: "+a);
//     console.log(a.length + b.length)
//
//     while(mergedArray.length + 1 < (a.length + b.length)){
//         if (a[ai] < b[bi])
//         {
//             mergedArray.push(a[ai]);
//             ai += 1;
//             console.log("mergedArray: "+mergedArray);
//             console.log("a[ai]: "+a[ai]);
//             console.log("ai: "+ai);
//         }
//         else if (b[bi] < a[ai])
//         {
//             mergedArray.push(b[bi]);
//             bi += 1;
//         }
//         else if (a[ai] == b[bi])
//         {
//             mergedArray.push(a[ai]);
//             ai += 1;
//             mergedArray.push(b[bi]);
//             bi += 1;
//         }
//         else
//         {
//             ai += 0;
//             bi += 0;
//         }
//     }
//
//     return mergedArray;
//
// }

function mergeArrays(a, b) {
    return a.concat(b).sort();
  }
