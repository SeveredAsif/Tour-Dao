const sqlite3 = require("sqlite3").verbose();

const normalDb = (dbFilePath) => {
  const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
      console.error("Error opening database " + err.message);
    }
  });

  return db;
};

module.exports = normalDb;
