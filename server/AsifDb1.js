const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tour.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else{
    db.run(`
        CREATE TABLE IF NOT EXISTS flights (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          originStationCode TEXT,
          isDifferentOriginStation BOOLEAN,
          destinationStationCode TEXT,
          isDifferentDestinationStation BOOLEAN,
          departureDateTime TEXT,
          arrivalDateTime TEXT,
          classOfService TEXT,
          flightNumber INTEGER,
          numStops INTEGER,
          distanceInKM REAL,
          isInternational BOOLEAN,
          operatingCarrier_locationId INTEGER,
          operatingCarrier_code TEXT,
          operatingCarrier_logoUrl TEXT,
          operatingCarrier_displayName TEXT
        )
      `);
      
  }})
