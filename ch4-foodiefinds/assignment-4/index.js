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

async function fetchAllRestaurants() {
  let query = "SELECT * FROM restaurants";
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get("/restaurants", async (req, res) => {
  try {
      let results = await fetchAllRestaurants();
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchRestaurantById(id) {
  let query = "SELECT * FROM restaurants WHERE id = ?";
  let response = await db.get(query, [id]);
  return { restaurant: response };
}

app.get("/restaurants/details/:id", async (req, res) => {
  try {
      let results = await fetchRestaurantById(req.params.id);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchRestaurantsByCuisine(cuisine) {
  let query = "SELECT * FROM restaurants WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
      let results = await fetchRestaurantsByCuisine(req.params.cuisine);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchRestaurantsByFilter(filters) {
  let query = "SELECT * FROM restaurants WHERE 1=1";
  let params = [];
  
  for (let key in filters) {
      query += ` AND ${key} = ?`;
      params.push(filters[key]);
  }
  
  let response = await db.all(query, params);
  return { restaurants: response };
}

app.get("/restaurants/filter", async (req, res) => {
  try {
      let results = await fetchRestaurantsByFilter(req.query);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchRestaurantsSortedByRating() {
  let query = "SELECT * FROM restaurants ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get("/restaurants/sort-by-rating", async (req, res) => {
  try {
      let results = await fetchRestaurantsSortedByRating();
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchAllDishes() {
  let query = "SELECT * FROM dishes";
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get("/dishes", async (req, res) => {
  try {
      let results = await fetchAllDishes();
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchDishById(id) {
  let query = "SELECT * FROM dishes WHERE id = ?";
  let response = await db.get(query, [id]);
  return { dish: response };
}

app.get("/dishes/details/:id", async (req, res) => {
  try {
      let results = await fetchDishById(req.params.id);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchDishesByFilter(filters) {
  let query = "SELECT * FROM dishes WHERE 1=1";
  let params = [];
  
  for (let key in filters) {
      query += ` AND ${key} = ?`;
      params.push(filters[key]);
  }
  
  let response = await db.all(query, params);
  return { dishes: response };
}

app.get("/dishes/filter", async (req, res) => {
  try {
      let results = await fetchDishesByFilter(req.query);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

async function fetchDishesSortedByPrice() {
  let query = "SELECT * FROM dishes ORDER BY price ASC";
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get("/dishes/sort-by-price", async (req, res) => {
  try {
      let results = await fetchDishesSortedByPrice();
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port 3000`));
