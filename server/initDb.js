const sqlite3 = require("sqlite3").verbose();

const initDb = (dbFilePath) => {
  const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
      console.error("Error opening database " + err.message);
    } else {
      db.run(
        `CREATE TABLE IF NOT EXISTS destinations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          rating INTEGER,
          picLink TEXT
        )`,
        (err) => {
          if (err) {
            console.error("Error creating table " + err.message);
          } else {
            // Insert dummy data
            const insert =
              "INSERT INTO destinations (name, rating, picLink) VALUES (?, ?, ?)";
            db.run(insert, [
              "Paris",
              5,
              "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ]);
            db.run(insert, [
              "New York",
              4,
              "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ]);
            db.run(insert, [
              "Tokyo",
              5,
              "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ]);
            db.run(insert, [
              "Sydney",
              4,
              "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ]);
            db.run(insert, [
              "Rome",
              4,
              "https://plus.unsplash.com/premium_photo-1672082110907-6d4106ee9e4d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ]);
            console.log("Dummy data inserted into destinations table.");
          }
        }
      );
    }
  }
  
  
  
  );

  return db;
};

module.exports = initDb;
