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
        filename: "./BD4.4/database.sqlite",
        driver: sqlite3.Database,
    });
})();

//select specific column
async function fetchAllMovies() {
  let query = "SELECT id, title, release_year FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies", async (req, res) => {
  try {
      const results = await fetchAllMovies();
      if (results.movies.length === 0) {
          return res.status(404).json({ message: "No Movies Found." });
      }
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//2
async function fetchMoviesByActor(actor) {
  let query = "SELECT id, title, actor, release_year FROM movies WHERE actor = ?";
  let response = await db.all(query, [actor]);
  return { movies: response };
}

app.get("/movies/actor/:actor", async (req, res) => {
  try {
      let actor = req.params.actor;
      let results = await fetchMoviesByActor(actor);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: `No movies found for actor: ${actor}` });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//3.
async function fetchMoviesByDirector(director) {
  let query = "SELECT id, title, director, release_year FROM movies WHERE director = ?";
  let response = await db.all(query, [director]);
  return { movies: response };
}

app.get("/movies/director/:director", async (req, res) => {
  try {
      let director = req.params.director;
      let results = await fetchMoviesByDirector(director);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: `No movies found for director: ${director}` });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port 3000`));