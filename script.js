const movieData = [

  {
    category:"Trending Now",

    movies:[
      {
        title:"Dark Future",
        image:"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",

        description:"A cyberpunk thriller."
      },

      {
        title:"Red Moon",
        image:"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop",

        description:"A survival action movie."
      },

      {
        title:"Lost Kingdom",
        image:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",

        description:"Epic fantasy adventure."
      }
    ]
  },

  {
    category:"Top Rated",

    movies:[
      {
        title:"The Last City",
        image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",

        description:"Mystery sci-fi world."
      },

      {
        title:"Cyber War",
        image:"https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",

        description:"Future AI warfare."
      },

      {
        title:"Shadow Zone",
        image:"https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=1200&auto=format&fit=crop",

        description:"Dark suspense thriller."
      }
    ]
  }
];

const movieContainer = document.getElementById("movieContainer");

const banner = document.querySelector(".banner");
const bannerTitle = document.getElementById("bannerTitle");
const bannerDescription = document.getElementById("bannerDescription");

const searchInput = document.getElementById("searchInput");

/* LOAD BANNER */

function loadBanner(movie){

  banner.style.backgroundImage =
  `
  url(${movie.image})
  `;

  bannerTitle.textContent = movie.title;

  bannerDescription.textContent = movie.description;
}

/* CREATE MOVIE SECTIONS */

function displayMovies(data){

  movieContainer.innerHTML = "";

  data.forEach(section => {

    const sectionDiv = document.createElement("section");

    sectionDiv.classList.add("movie-section");

    sectionDiv.innerHTML =
    `
      <h2>${section.category}</h2>

      <div class="movie-row">

        ${section.movies.map(movie =>

          `
            <div class="movie-card">

              <img src="${movie.image}">

              <div class="movie-info">

                <h4>${movie.title}</h4>

                <p>${movie.description}</p>

              </div>

            </div>
          `

        ).join("")}

      </div>
    `;

    movieContainer.appendChild(sectionDiv);
  });

  addMovieCardEvents();
}

/* CARD EVENTS */

function addMovieCardEvents(){

  const cards = document.querySelectorAll(".movie-card");

  cards.forEach(card => {

    card.addEventListener("click", () => {

      const title =
      card.querySelector("h4").textContent;

      movieData.forEach(section => {

        const movie =
        section.movies.find(m => m.title === title);

        if(movie){

          loadBanner(movie);

          window.scrollTo({
            top:0,
            behavior:"smooth"
          });
        }
      });
    });
  });
}

/* SEARCH */

searchInput.addEventListener("input", e => {

  const value =
  e.target.value.toLowerCase();

  const filtered = movieData.map(section => {

    return {

      ...section,

      movies: section.movies.filter(movie =>

        movie.title.toLowerCase().includes(value)
      )
    };
  });

  displayMovies(filtered);
});

/* NAVBAR SCROLL */

window.addEventListener("scroll", () => {

  const navbar =
  document.querySelector(".navbar");

  if(window.scrollY > 50){

    navbar.style.background = "#111";
  }

  else{

    navbar.style.background =
    "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)";
  }
});

/* INITIAL LOAD */

loadBanner(movieData[0].movies[0]);

displayMovies(movieData);
