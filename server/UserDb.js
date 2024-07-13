const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tour.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )`, 
      (err) => {
        if (err) {
          console.error("Error creating table " + err.message);
        } else {
          // Insert a few users
          const users = [
            { username: 'Asif', password: '1', email: '1@.com' },
            { username: 'Othiya', password: '2', email: '2@.com' },
            { username: 'Megh', password: '3', email: '3@.com' }
          ];

          const insert = db.prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
          
          users.forEach(user => {
            insert.run(user.username, user.password, user.email, (err) => {
              if (err) {
                console.error("Error inserting user " + err.message);
              }
            });
          });

          insert.finalize();
        }
      });
  }
});
