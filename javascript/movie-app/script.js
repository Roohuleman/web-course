const API_KEY = "6b09ffdb";
const API_BASE = "https://www.omdbapi.com/";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieGrid = document.getElementById("movieGrid");
const loadingSpinner = document.getElementById("loadingSpinner");
const noResults = document.getElementById("noResults");


searchInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        handleSearch()
    };
});

function handleSearch() {
    const query = searchInput.value.trim() || "movie";
    searchMovies(query);
}



async function searchMovies(query) {
    loadingSpinner.classList.remove("hidden");
    noResults.classList.add("hidden");
    movieGrid.innerHTML = "";

    try {
        const res = await fetch(
            `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=1`,
        );
        const data = await res.json();

        if (data.Response === "True" && data.Search.length > 0) {
            data.Search.forEach((movie) => {
                movieGrid.appendChild(createMovieCard(movie));
            });
        } else {
            noResults.classList.remove("hidden");
        }
    } catch (err) {
        noResults.classList.remove("hidden");
    } finally {
        loadingSpinner.classList.add("hidden");
    }
}


function createMovieCard(movie) {
    const card = document.createElement("div");

    card.className =
        "movie-card bg-gray-800 rounded-lg overflow-hidden relative group animate-fade-in";

    const poster =
        movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image";

    card.innerHTML = `
        <div class="h-64 overflow-hidden">
            <img src="${poster}" alt="${movie.Title}" class="poster-img w-full h-full object-cover"/>
        </div>

        <div class="p-4">
            <h3 class="font-bold text-base mb-1 line-clamp-2">${movie.Title}</h3>
            <p class="text-gray-400 text-sm">${movie.Year}</p>
        </div>

        <!-- Hover Button -->
        <div class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <button class="view-btn bg-blue-500 px-4 py-2 rounded text-white">
                View Details
            </button>
        </div>
    `;
    const btn = card.querySelector(".view-btn");
    btn.addEventListener("click", () => {
    getMovieDetails(movie.imdbID);
});
return card;
}

    async function getMovieDetails(id){

    const res = await fetch(`${API_BASE}?apikey=${API_KEY}&i=${id}`);
    const data = await res.json();

    showMovieDetails(data);
}
function showMovieDetails(movie) {

    const detailCard = document.createElement("div");

    detailCard.className =
        "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50";

    detailCard.innerHTML = `
    <div class="bg-gray-900 p-6 rounded-lg max-w-lg text-white relative">

        <button class="absolute top-2 right-2 text-xl close-btn">✖</button>

        <img src="${movie.Poster}" class="w-[40px] h-[40px] object-cover"/>

        <h2 class="text-xl font-bold mb-2">${movie.Title}</h2>

        <p><b>Year:</b> ${movie.Year}</p>
        <p><b>Genre:</b> ${movie.Genre}</p>
        <p><b>IMDB Rating:</b> ${movie.imdbRating}</p>
        <p class="mt-2 text-gray-300">${movie.Plot}</p>

    </div>
    `;

    document.body.appendChild(detailCard);

    const closeBtn = detailCard.querySelector(".close-btn");

    closeBtn.addEventListener("click", () => {
        detailCard.remove();
    });
}
searchMovies("movie")     