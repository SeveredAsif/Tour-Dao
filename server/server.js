const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const initDb = require("./initDb");
const fs = require("fs");
const csv = require("csv-parser");
const jwt = require("jsonwebtoken");

const port = 4000;
const secretKey = "your_secret_key"; // Define your secret key for JWT
// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS

// Configure session middleware
app.use(
  session({
    secret: "my-secret-key", // replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set secure: true if using HTTPS
  })
);

// Initialize the SQLite database
const dbFilePath = "./tour.db";
const db = initDb(dbFilePath);

let airports = [];

fs.createReadStream("iata-icao.csv")
  .pipe(csv())
  .on("data", (row) => {
    airports.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

app.get("/query", (req, res) => {
  const sql = "SELECT * FROM hotels";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      rows,
    });
  });
});

// Endpoint to search for airports
app.get("/airports/search", (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = airports.filter(
    (airport) =>
      airport.iata.toLowerCase().includes(query) ||
      airport.airport.toLowerCase().includes(query) ||
      airport.region_name.toLowerCase().includes(query)
  );
  res.json(results);
});

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

// Function to insert flight data into the database
const insertFlightData = (flights) => {
  flights.forEach((flight) => {
    const { segments } = flight;
    segments.forEach((segment) => {
      segment.legs.forEach((leg) => {
        const {
          originStationCode,
          isDifferentOriginStation,
          destinationStationCode,
          isDifferentDestinationStation,
          departureDateTime,
          arrivalDateTime,
          classOfService,
          flightNumber,
          numStops,
          distanceInKM,
          isInternational,
        } = leg;

        const { locationId, code, logoUrl, displayName } = leg.operatingCarrier;

        const sql = `
          INSERT INTO flights (
            originStationCode,
            isDifferentOriginStation,
            destinationStationCode,
            isDifferentDestinationStation,
            departureDateTime,
            arrivalDateTime,
            classOfService,
            flightNumber,
            numStops,
            distanceInKM,
            isInternational,
            operatingCarrier_locationId,
            operatingCarrier_code,
            operatingCarrier_logoUrl,
            operatingCarrier_displayName
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
          originStationCode,
          isDifferentOriginStation,
          destinationStationCode,
          isDifferentDestinationStation,
          departureDateTime,
          arrivalDateTime,
          classOfService,
          flightNumber,
          numStops,
          distanceInKM,
          isInternational,
          locationId,
          code,
          logoUrl,
          displayName,
        ];

        db.run(sql, params, (err) => {
          if (err) {
            console.error("Error inserting flight data: " + err.message);
          } else {
            console.log("Flight data inserted successfully");
          }
        });
      });
    });
  });
};

// Route to search for flights from the database
app.post("/flights/search", (req, res) => {
  const {
    from,
    to,
    departureDate,
    returnDate,
    classOfService,
    numAdults,
    numChildren,
  } = req.body;

  // Validate and parse the departureDate and returnDate

  // Construct the SQL query to search for flights based on the given parameters
  let sql = `
    SELECT * FROM flights 
    WHERE originStationCode = ? 
      AND destinationStationCode = ? 
      AND classOfService = ?
  `;

  const params = [from, to, classOfService];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const filteredRows = rows.filter((row) => {
      const rowDepartureDate = new Date(row.departureDateTime)
        .toISOString()
        .split("T")[0];
      return rowDepartureDate === departureDate;
    });

    let filter = filteredRows;

    if (returnDate) {
      filter = rows.filter((row) => {
        const rowArrivalDate = new Date(row.arrivalDateTime)
          .toISOString()
          .split("T")[0];
        console.log(
          returnDate + " " + rowArrivalDate + " " + row.arrivalDateTime
        );
        return rowArrivalDate === returnDate;
      });
    }

    console.log(filter);
    res.json({ flights: filter });
  });
});

// Route to search for flights
app.post("/flights/searchh", (req, res) => {
  const rapidApiEndpoint =
    "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights";
  const rapidApiHeaders = {
    "x-rapidapi-key": "d76dc60036msh0cbf83ab768fa61p17d7dcjsne50e065a42c4",
    "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
  };
  const {
    from,
    to,
    departureDate,
    returnDate,
    classOfService,
    numAdults,
    numChildren,
  } = req.body;

  const params = {
    sourceAirportCode: from,
    destinationAirportCode: to,
    date: departureDate,
    itineraryType: returnDate ? "ROUND_TRIP" : "ONE_WAY",
    sortOrder: "ML_BEST_VALUE",
    numAdults,
    numSeniors: 0,
    classOfService,
    returnDate: returnDate || undefined,
    pageNumber: 1,
    nearby: "yes",
    nonstop: "yes",
    currencyCode: "USD",
    region: "USA",
  };

  // Make a request to RapidAPI
  axios
    .get(rapidApiEndpoint, {
      headers: rapidApiHeaders,
      params: params,
    })
    .then((response) => {
      const flights = response.data.data.flights;

      // Insert the fetched flight data into the database
      insertFlightData(flights);
      console.log("everything ok");

      // Respond with the flights data
      res.json({ flights });
    })
    .catch((error) => {
      console.error("Error fetching flights from Rapid API:", error);
      res.status(500).json({ error: "Error fetching flights from Rapid API" });
    });
});

//hotels













/*let hotelsData = [];

// Path to your CSV file
const csvFilePath = 'hotels.csv';

// Read CSV file and parse its data
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        // Assuming row contains: Name, Amenities, Stars, City, Country, Photo, Price, Website
        hotelsData.push({
            name: row.Name,
            amenities: row['*Amenities*'], // Note: Column names are case-sensitive
            stars: row.Stars,
            city: row.City,
            country: row.Country,
            photo: row.Photo,
            price: row.Price,
            website: row.WebSite
        });
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
        // Now hotelsData array contains all parsed data from the CSV file
    
    })
    .on('error', (err) => {
        console.error('Error encountered while processing CSV:', err);
    });*/


// API endpoint to fetch all hotels data
app.get("/hotels", (req, res) => {
  const sql = "SELECT * FROM hotels";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: rows,
    });
  });
});


// API endpoint to fetch all hotels data
app.get("/hotels/search/details", (req, res) => {
  const sql = "SELECT * FROM berlin_hotels";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
   
    res.json({
      data: rows,
    });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
