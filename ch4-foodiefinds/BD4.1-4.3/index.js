let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
let PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
    db = await open({
        filename: "./BD4.1-4.3/database.sqlite",
        driver: sqlite3.Database,
    });
})();

//1. fetch all movie
async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies", async (req, res) => {
  try {
      let results = await fetchAllMovies();
      console.log(results);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: "No Movies Found." });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


//2. fetch movie by genere
async function fetchMoviesByGenre(genre) {
  let query = "SELECT * FROM movies WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { movies: response };
}

app.get("/movies/genre/:genre", async (req, res) => {
  try {
      let genre = req.params.genre;
      let results = await fetchMoviesByGenre(genre);
      console.log(results);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: "No Movies Found for this Genre." });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


//3. fetch movie by id
async function fetchMovieById(id) {
  let query = "SELECT * FROM movies WHERE id = ?";
  let response = await db.get(query, [id]);
  return { movie: response };
}

app.get("/movies/details/:id", async (req, res) => {
  try {
      let id = req.params.id;
      let result = await fetchMovieById(id);
      console.log(result);

      if (!result.movie) {
          return res.status(404).json({ message: "Movie Not Found." });
      }

      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


//4. fetch movie by release year
async function fetchMoviesByReleaseYear(releaseYear) {
  let query = "SELECT * FROM movies WHERE release_year = ?";
  let response = await db.all(query, [releaseYear]);
  return { movies: response };
}

app.get("/movies/release-year/:releaseYear", async (req, res) => {
  try {
      let releaseYear = req.params.releaseYear;
      let results = await fetchMoviesByReleaseYear(releaseYear);
      console.log(results);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: "No Movies Found for this Release Year." });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//5.fetch movie by actor
async function filterByActor(actor) {
  let query = "SELECT * FROM movies WHERE actor = ?";
  let response = await db.all(query, [actor]);
  return { movies: response };
}

app.get("/movies/actor/:actor", async (req, res) => {
  try {
      let actor = req.params.actor;
      let results = await filterByActor(actor);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: `No movies found for actor: ${actor}` });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//fetch movie by director
async function filterByDirector(director) {
  let query = "SELECT * FROM movies WHERE director = ?";
  let response = await db.all(query, [director]);
  return { movies: response };
}

app.get("/movies/director/:director", async (req, res) => {
  try {
      let director = req.params.director;
      let results = await filterByDirector(director);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: `No movies found for the director: ${director}` });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => console.log(`Server running on port 3000`));