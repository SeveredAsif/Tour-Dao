const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const initDb = require("./initDb");
const fs = require('fs');
const csv = require('csv-parser');
const port = 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS

// Configure session middleware
app.use(session({
  secret: 'my-secret-key', // replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set secure: true if using HTTPS
}));

// Initialize the SQLite database
const dbFilePath = "./tour.db";
const db = initDb(dbFilePath);


let airports = [];

fs.createReadStream('iata-icao.csv')
  .pipe(csv())
  .on('data', (row) => {
    airports.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Endpoint to search for airports
app.get('/airports/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = airports.filter(airport => 
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

// Route to search for flights
app.post("/flights/search", (req, res) => {
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

      // Respond with the flights data
      res.json({ flights });
    })
    .catch((error) => {
      console.error("Error fetching flights from Rapid API:", error);
      res.status(500).json({ error: "Error fetching flights from Rapid API" });
    });
});















//hotels



const insertHotelData = (hotels) => {
  // Check if 'hotels' is an array
  if (Array.isArray(hotels)) {
    hotels.forEach((hotel) => {
      const {
        dest_id,
        search_type,
        city_ufi,
        label,
        dest_type,
        nr_hotels,
        latitude,
        longitude,
        country,
        type,
        city_name,
        cc1,
        region,
        name,
        lc,
        image_url,
        roundtrip
      } = hotel;

      const sql = `
        INSERT INTO hotel_destinations (
          dest_id, search_type, city_ufi, label, dest_type, nr_hotels,
          latitude, longitude, country, type, city_name, cc1, region,
          name, lc, image_url, roundtrip
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        dest_id, search_type, city_ufi, label, dest_type, nr_hotels,
        latitude, longitude, country, type, city_name, cc1, region,
        name, lc, image_url, roundtrip
      ];

      db.run(sql, params, (err) => {
        if (err) {
          console.error('Error inserting hotel data:', err.message);
        } else {
          console.log('Hotel data inserted successfully');
        }
      });
    });
  } else {
    console.error('Expected an array of hotels but received:', typeof hotels);
  }
};

app.post('/hotels/search', (req, res) => {
  const rapidApiEndpoint = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination';
  const rapidApiHeaders = {
    'x-rapidapi-key': '29f1d01d4amsh1d2dc3fd2105c82p1daf85jsnd41e8362f913',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
  };

  const { destination, checkIn, checkOut, guests } = req.body;
  req.session.checkIn = checkIn;
  req.session.checkOut = checkOut;
  req.session.guests = guests;

  console.log(req.session)

  const params = {
    query: destination
  };

  axios.get(rapidApiEndpoint, {
    headers: rapidApiHeaders,
    params: params,
  })
  .then((response) => {
    const hotels = response.data.data;

    // Insert the fetched hotel data into the database
    /*insertHotelData(hotels);*/

    // Respond with the hotels data
    res.json({ hotels });
  })
  .catch((error) => {
    console.error('Error fetching hotels from Rapid API:', error);
    res.status(500).json({ error: 'Error fetching hotels from Rapid API' });
  });
});


app.post('/hotels/search/details', (req, res) => {
  const rapidApiEndpoint = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels';
  const rapidApiHeaders = {
   'x-rapidapi-key': '29f1d01d4amsh1d2dc3fd2105c82p1daf85jsnd41e8362f913',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
  };


  const {
    dest_id,
    search_type,
    destination,
    checkIn,
    checkOut,
    guests
  } = req.body;

  const params = {
    dest_id: dest_id,
    search_type: search_type,
    arrival_date: checkIn,
    departure_date: checkOut,
    adults: guests,
    children_age: '0,17',
    room_qty: '1',
    page_number: '1',
    units: 'metric',
    temperature_unit: 'c',
    languagecode: 'en-us',
    currency_code: 'AED'
  }

  axios.get(rapidApiEndpoint, {
    headers: rapidApiHeaders,
    params: params,
  })
  .then((response) => {
    console.log(response)
    const hotels = response.data.data;

    // Insert the fetched hotel data into the database
    /*insertHotelData(hotels);*/

    // Respond with the hotels data
    
    res.json({ hotels });
  })
  .catch((error) => {
    console.error('Error fetching hotels from Rapid API:', error);
    res.status(500).json({ error: 'Error fetching hotels from Rapid API' });
  });
});




// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
