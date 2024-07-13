const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 4000; // Replace with your desired port

const db = new sqlite3.Database('tour.db'); // Replace with your SQLite database file

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS berlin_hotels (
    hotel_id INTEGER ,
    accessibilityLabel TEXT,
    name TEXT,
    latitude REAL,
    longitude REAL,
    reviewScore REAL,
    reviewCount INTEGER,
    photoUrls TEXT,
    priceBreakdown TEXT,
    currency TEXT,
    countryCode TEXT
  )`);
});

app.use(express.json());

// Function to fetch data from API and store in SQLite database
const fetchDataAndStore = async () => {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id: '-1746443',
      search_type: 'CITY',
      arrival_date: '2024-12-11',
      departure_date: '2024-12-19',
      adults: '1',
      children_age: '0,17',
      room_qty: '1',
      page_number: '1',
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      currency_code: 'AED'
    },
    headers: {
      'x-rapidapi-key': '66e2e46ac6mshe555a4b68d8963cp1038c6jsna47473769351',
      'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const { data } = response.data;
    console.log(response.data)

    // Insert fetched hotel data into SQLite database
    for (let hotel of data.hotels) {
      const {
        hotel_id,
        accessibilityLabel,
        name,
        latitude,
        longitude,
        reviewScore,
        reviewCount,
        photoUrls,
        priceBreakdown,
        currency,
        countryCode
        // Add more fields as needed
      } = hotel;

      // Example SQL query to insert into SQLite table 'hotels'
      const sql = `INSERT INTO hotels (hotel_id,accessibilityLabel, name, latitude, longitude, reviewScore, reviewCount, photoUrls, priceBreakdown, currency, countryCode)
                   VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      // Execute the insert query
      await db.run(sql, [
        hotel_id,
        accessibilityLabel,
        name,
        latitude,
        longitude,
        reviewScore,
        reviewCount,
        JSON.stringify(photoUrls), // Store photoUrls as JSON string
        JSON.stringify(priceBreakdown), // Store priceBreakdown as JSON string
        currency,
        countryCode
        // Add corresponding values as needed
      ], function(err) {
        if (err) {
          console.error('Error inserting hotel data:', err);
        } else {
          console.log(`Inserted hotel ${name} into database`);
        }
      });
    }

    console.log('Data inserted into database successfully');

  } catch (error) {
    console.error('Error fetching or inserting data:', error);
  }
};

fetchDataAndStore();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


