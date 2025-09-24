const BASE_URL = "http://localhost:3000/films";

const filmsList = document.getElementById("films");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const description = document.getElementById("description");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const tickets = document.getElementById("tickets");
const buyBtn = document.getElementById("buy-ticket");
const deleteBtn = document.getElementById("delete-film");

let currentFilm = null;
fetch(BASE_URL)
  .then(res => res.json())
  .then(films => {
    filmsList.innerHTML = "";
    films.forEach(film => renderFilmList(film));
    if (films.length > 0) showFilmDetails(films[0]);
  });

function renderFilmList(film) {
  const li = document.createElement("li");
  li.textContent = film.title;
  li.addEventListener("click", () => showFilmDetails(film));
  filmsList.appendChild(li);
}

function showFilmDetails(film) {
  currentFilm = film;
  poster.src = film.poster;
  title.textContent = film.title;
  description.textContent = film.description;
  runtime.textContent = film.runtime;
  showtime.textContent = film.showtime;
  tickets.textContent = film.capacity - film.tickets_sold;

  if (film.capacity - film.tickets_sold <= 0) {
    buyBtn.textContent = "Sold Out";
    buyBtn.disabled = true;
  } else {
    buyBtn.textContent = "Buy Ticket";
    buyBtn.disabled = false;
  }
}

buyBtn.addEventListener("click", () => {
  if (!currentFilm) return;

  const availableTickets = currentFilm.capacity - currentFilm.tickets_sold;
  if (availableTickets > 0) {
    currentFilm.tickets_sold++;

    fetch(`${BASE_URL}/${currentFilm.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickets_sold: currentFilm.tickets_sold })
    });

    tickets.textContent = currentFilm.capacity - currentFilm.tickets_sold;

    if (currentFilm.capacity - currentFilm.tickets_sold === 0) {
      buyBtn.textContent = "Sold Out";
      buyBtn.disabled = true;
    }
  }
});

// Handle Delete Film
deleteBtn.addEventListener("click", () => {
  if (!currentFilm) return;

  fetch(`${BASE_URL}/${currentFilm.id}`, { method: "DELETE" })
    .then(() => {
      currentFilm = null;
      poster.src = "";
      title.textContent = "";
      description.textContent = "";
      runtime.textContent = "";
      showtime.textContent = "";
      tickets.textContent = "";
      buyBtn.disabled = true;
      deleteBtn.disabled = true;

      fetch(BASE_URL)
        .then(res => res.json())
        .then(films => {
          filmsList.innerHTML = "";
          films.forEach(film => renderFilmList(film));
          if (films.length > 0) showFilmDetails(films[0]);
        });
    });
});
