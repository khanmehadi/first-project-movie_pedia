// const tmdb_apiKey = 'api_key=key=2a11c97d64c0938ef78e443e2a4d6ea2';
const tmdb_apiKey = "api_key=2a11c97d64c0938ef78e443e2a4d6ea2";
const baseURl_TMDB = "https://api.themoviedb.org/3";
const API_mostPopular = baseURl_TMDB + "/discover/movie?sort_by=popularity.desc&" + tmdb_apiKey; 
const API_search = baseURl_TMDB + "/discover/movie?sort_by=popularity.desc&" + tmdb_apiKey
const apiIMG = "https://image.tmdb.org/t/p/w500";
const mainBody = document.getElementById("page-body"); 
const form = document.getElementById("form");
const search = document.getElementById("search-btn");

getMovies(API_mostPopular);



function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            returnPrview(data.results);
        })
}

function returnPrview(data) {

    mainBody.innerHTML = '';

    data.forEach(element => {
        const {title, poster_path, vote_average, overview} = element;
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
                    ${overview}
                </section>
            </section>
        `
        mainBody.appendChild(movieElement);
    })

    mainBody.appendChild(element)
}

function rateingIndicator(rating) {
    if (rating >= 8) {
        return 'green';
    }else if (rating >= 5) {
        return 'orange';
    }else {
        return 'red';
    }
}

form.addEventListener("submit", (e) => {
    e.prefentDefault();

    const mySearch = mySearch.value;
    if (mySearch) {
        getMovies();
    }else {
        getMovies(API_mostPopular);
    }
}) 