const express = require('express');
const sqlite3 = require('sqlite3').verbose();



// Create or open the SQLite database
const db = new sqlite3.Database('tour.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Drop the hotels table if it exists
db.run('DROP TABLE IF EXISTS hotel_bookings', (err) => {
    if (err) {
        console.error('Error dropping table', err);
    } else {
        console.log('Dropped table if it existed');
        // Create the hotels table
        db.run(`CREATE TABLE hotel_bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  destination VARCHAR(255) NOT NULL,
  checkIn DATE NOT NULL,
  checkOut DATE NOT NULL,
  guests INTEGER NOT NULL,
  hotelName VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`, (err) => {
            if (err) {
                console.error('Error creating table', err);
            } else {
                console.log('Created table');
                
            }
        });
    }
});