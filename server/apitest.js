const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tour.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    db.run(`
        DELETE FROM destinations
      `, (err) => {
      if (err) {
        console.error("Error executing query " + err.message);
      } else {
        console.log("All rows deleted from destinations table.");
      }
    });
  }
});
