const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const initDb = require("./initDb");
const port = 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS


// Initialize the SQLite database
const dbFilePath = "./tour.db";
const db = initDb(dbFilePath);

// Route to get all destinations
app.get("/destinations", (req, res) => {
  const sql = "SELECT * FROM destinations";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Route to add a new destination
app.post("/destinations", (req, res) => {
  const { name, rating, picLink } = req.body;
  const sql =
    "INSERT INTO destinations (name, rating, picLink) VALUES (?, ?, ?)";
  const params = [name, rating, picLink];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: { id: this.lastID },
    });
  });
});

// Route to delete a destination
app.delete("/destinations/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM destinations WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: {
        id: id,
      },
    });
  });
});

// Route to update a destination
app.put("/destinations/:id", (req, res) => {
  const { id } = req.params;
  const { name, rating, picLink } = req.body;
  const sql =
    "UPDATE destinations SET name = ?, rating = ?, picLink = ? WHERE id = ?";
  const params = [name, rating, picLink, id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: {
        id: id,
        name: name,
        rating: rating,
        picLink: picLink,
      },
    });
  });
});













//hotels











// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
