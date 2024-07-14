const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tour.db", (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        db.run(`
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    flightId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
      `);
    }
});
