// const tmdb_apiKey = 'api_key=key=2a11c97d64c0938ef78e443e2a4d6ea2';
const tmdb_apiKey = "api_key=2a11c97d64c0938ef78e443e2a4d6ea2";
const baseURl_TMDB = "https://api.themoviedb.org/3";
const API_mostPopular = baseURl_TMDB + "/discover/movie?sort_by=popularity.desc&" + tmdb_apiKey; 
const API_search = baseURl_TMDB + "/search/movie?" + tmdb_apiKey;
const API_popular_shows = "https://api.themoviedb.org/3/tv/popular?"+tmdb_apiKey;
const API_movie_generas = baseURl_TMDB + "/movie/upcoming?api_key=2a11c97d64c0938ef78e443e2a4d6ea2&language=en-US";
const API_trending = "https://api.themoviedb.org/3/trending/all/day?" + tmdb_apiKey;
const apiIMG = "https://image.tmdb.org/t/p/w500";
const mainBody = document.getElementById("page-body"); 
const form = document.getElementById("form");
const search = document.getElementById("search-title");
const searchBtn = document.getElementById("search-btn");
const movieBtn = document.getElementById("movie-btn");
const showBtn = document.getElementById("show-btn");
const homeBtn = document.getElementById("home-btn");
const trendingBtn = document.getElementById("trending-btn");
const myModal = document.getElementById("modal");
const ModalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("close");


// getMovies(API_mostPopular);
getMovies(API_mostPopular);

// fetch and store api data from a url
function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            returnPreview(data.results);
        })
}

getShows(API_popular_shows);
function getShows(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            returnPreview(data.results);
        })
}

getTrending(API_trending);
function getTrending(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            returnPreview(data.results);
        })
}

getGeneras(API_movie_generas);
function getGeneras(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            returnPreview(data.results);
        })
}

// Append the retruned data objects and append it to the the reated elements.
function returnPreview(data) {

    mainBody.innerHTML = '';

    data.forEach(element => {
        const {title, poster_path, vote_average, overview, id} = element;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <section class="movies first">
                <img src="${apiIMG + poster_path}" alt="${title}">
                <section class="film-info">
                    <h3>${title}</h3>
                    <span class="${rateingIndicator(vote_average)}">${vote_average}</span>
                </section>
                <section class="overview">
                    ${overview}<br><br>
                    <button class="btn-overview" id="${id}">Preview</button>
                </section>
            </section>
        `
        mainBody.appendChild(movieElement);

        document.getElementById(id).addEventListener("click", function() {
            console.log(id);
            openModel(element);
            // closeModel();
        });
        
        
        
    })
}

function openModel(element) {
    let movieID = element.id;
    fetch(baseURl_TMDB + "/movie/" + movieID + "/videos?" + tmdb_apiKey)
    .then(response => response.json())
    .then(myMovie => {
        console.log(myMovie);
        if(myMovie) {
            document.getElementById("modal").style.display = "block";
            if(myMovie.results.length > 0) {
                var allVideos = [];
                myMovie.results.forEach(eachVid => {
                    let {name, key, site} = eachVid;
                    if (site == "YouTube") {
                        allVideos.push(`
                        <iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/"${key}" 
                        title="${name}" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `)
                    };
                    
                })
             ModalContent.innerHTML = allVideos.join('');    
            } 
        }
    })
    
}

modalClose.addEventListener("click", () => {
    myModal.style.display = "none";   
});


function rateingIndicator(rating) {
    if (rating >= 8) {
        return 'green';
    }else if (rating >= 5) {
        return 'orange';
    }else {
        return 'red';
    }
}

// Click the submit button to retreave form information
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mySearch = search.value;
    if (mySearch) {
        getMovies(API_search + '&query=' + mySearch);
    }else {
        getMovies(API_mostPopular);
    }
    search.value = '';
}) 

// form.addEventListener("click", searchBtn);

// Click the search button to retreave form information
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const mySearch = search.value;
    if (mySearch) {
        getMovies(API_search + '&query=' + mySearch);
    }else {
        getMovies(API_mostPopular);
    }
    search.value = '';
})

//Click the submit button to retreave form information
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mySearch = search.value;
    if (mySearch) {
        getMovies(API_search + '&query=' + mySearch);
    }else {
        getMovies(API_mostPopular);
    }
    search.value = '';
}) 

movieBtn.addEventListener("click", function() {
    getMovies(API_mostPopular);
});

homeBtn.addEventListener("click", function() {
    getGeneras(API_movie_generas);
});

trendingBtn.addEventListener("click", function() {
    getTrending(API_trending);

});

////////////////////////////////////////////////////////////////////////////

//SHOWS
showBtn.addEventListener("click", function() {
  getMovies(API_popular_shows);
});
