const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;  // Choose your desired port

// Array to store parsed CSV data
let hotelsData = [];

// Path to your CSV file
const csvFilePath = 'hotels.csv';

// Create or open the SQLite database
const db = new sqlite3.Database('tour.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Drop the hotels table if it exists
db.run('DROP TABLE IF EXISTS hotels', (err) => {
    if (err) {
        console.error('Error dropping table', err);
    } else {
        console.log('Dropped table if it existed');
        // Create the hotels table
        db.run(`CREATE TABLE IF NOT EXISTS hotels (
            name TEXT,
            amenities TEXT,
            stars INTEGER,
            city TEXT,
            country TEXT,
            photo TEXT,
            price REAL,
            website TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table', err);
            } else {
                console.log('Created table');
                // Read and parse CSV file only after creating the table
                readCSVAndInsertData();
            }
        });
    }
});

function readCSVAndInsertData() {
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
            insertDataToDatabase(hotelsData);
        })
        .on('error', (err) => {
            console.error('Error encountered while processing CSV:', err);
        });
}

// Function to insert data into the database
function insertDataToDatabase(data) {
    const insert = db.prepare(`INSERT INTO hotels (name, amenities, stars, city, country, photo, price, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    data.forEach((hotel) => {
        insert.run(hotel.name, hotel.amenities, hotel.stars, hotel.city, hotel.country, hotel.photo, hotel.price, hotel.website);
    });
    insert.finalize();

    console.log('Data inserted into database');
}

// API endpoint to fetch all hotels data
app.get('/api/hotels', (req, res) => {
    db.all("SELECT * FROM hotels", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
