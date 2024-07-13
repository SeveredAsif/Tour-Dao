const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tour.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else{
    db.run( `
        CREATE TABLE IF NOT EXISTS destinations (
          dest_id TEXT PRIMARY KEY,
          search_type TEXT,
          city_ufi TEXT,
          label TEXT,
          dest_type TEXT,
          nr_hotels INTEGER,
          latitude REAL,
          longitude REAL,
          country TEXT,
          type TEXT,
          city_name TEXT,
          cc1 TEXT,
          region TEXT,
          name TEXT,
          lc TEXT,
          image_url TEXT,
          hotels INTEGER,
          roundtrip TEXT
      )
  `);
      
  }})
