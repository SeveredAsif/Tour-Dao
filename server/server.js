const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const axios = require("axios");
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

// Route to search for flights
app.post("/flights/search", (req, res) => {
  const rapidApiEndpoint =
    "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights";
  const rapidApiHeaders = {
    "x-rapidapi-key": "ef609bca72msha460ddd3d4261e7p12b5b7jsn3ef8a8dd62b2",
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
    nearby: 'yes',
    nonstop: 'yes',
    currencyCode: 'USD',
    region: 'USA',
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

      // Respond with the flights data
      res.json({ flights });
    })
    .catch((error) => {
      console.error("Error fetching flights from Rapid API:", error);
      res.status(500).json({ error: "Error fetching flights from Rapid API" });
    });
});

// Function to insert flight data into the database
// Route to search for flights
app.post("/flights/search", (req, res) => {
  const rapidApiEndpoint =
    "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights";
  const rapidApiHeaders = {
    "x-rapidapi-key": "ef609bca72msha460ddd3d4261e7p12b5b7jsn3ef8a8dd62b2",
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
    nearby: 'yes',
    nonstop: 'yes',
    currencyCode: 'USD',
    region: 'USA',
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

      // Respond with the flights data
      res.json({ flights });
    })
    .catch((error) => {
      console.error("Error fetching flights from Rapid API:", error);
      res.status(500).json({ error: "Error fetching flights from Rapid API" });
    });
});













//hotels











// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
