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
        filename: "./BD4.5/database.sqlite",
        driver: sqlite3.Database,
    });
})();

//select operators
async function filterByYearAndActor(releaseYear, actor) {
  let query = "SELECT id, title, release_year, actor FROM movies WHERE release_year = ? AND actor = ?";
  let response = await db.all(query, [releaseYear, actor]);
  return { movies: response };
}

app.get("/movies/year-actor", async (req, res) => {
  try {
      let releaseYear = req.query.releaseYear;
      let actor = req.query.actor;

      if (!releaseYear || !actor) {
          return res.status(400).json({ message: "Both releaseYear and actor are required." });
      }

      let results = await filterByYearAndActor(releaseYear, actor);

      if (results.movies.length === 0) {
          return res.status(404).json({ message: `No movies found for year ${releaseYear} by actor ${actor}.` });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//2
async function fetchAwardWinningMovies() {
  let query = "SELECT id, title, rating FROM movies WHERE rating >= 4.5 ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies/awards", async (req, res) => {
  try {
      let results = await fetchAwardWinningMovies();

      if (results.movies.length === 0) {
          return res.status(404).json({ message: "No award-winning movies found." });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


//3
async function fetchBlockbusterMovies() {
  let query = "SELECT id, title, box_office_collection FROM movies WHERE box_office_collection >= 100 ORDER BY box_office_collection DESC";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies/blockbusters", async (req, res) => {
  try {
      let results = await fetchBlockbusterMovies();

      if (results.movies.length === 0) {
          return res.status(404).json({ message: "No blockbuster movies found." });
      }

      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port 3000`));