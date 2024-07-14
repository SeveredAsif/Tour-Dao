const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

// Connect to SQLite database
const db = new sqlite3.Database('tour.db'); // Adjusted database filename

// Function to drop and create hotels table
function createHotelsTable() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Drop the hotels table if it exists
            db.run('DROP TABLE IF EXISTS berlin_hotels', (err) => {
                if (err) {
                    console.error('Error dropping table', err);
                    reject(err);
                } else {
                    console.log('Dropped table if it existed');
                    // Create the hotels table
                    db.run(`CREATE TABLE IF NOT EXISTS berlin_hotels (
                        hotel_id INTEGER PRIMARY KEY,
                        accessibilityLabel TEXT,
                        name TEXT,
                        reviewScore REAL,
                        photoUrl TEXT
                    )`, (err) => {
                        if (err) {
                            console.error('Error creating table', err);
                            reject(err);
                        } else {
                            console.log('Created table');
                            resolve();
                        }
                    });
                }
            });
        });
    });
}

// Function to fetch hotels data from Booking.com API
async function fetchHotelsFromBookingAPI() {
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
        console.log('Data fetched successfully');
        return response.data; // Assuming response.data contains the hotels array
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
}

// Function to insert fetched hotels data into database
async function insertHotelsIntoDatabase(hotelsData) {
    try {
        if (!hotelsData || !hotelsData.data || !Array.isArray(hotelsData.data.hotels)) {
            throw new Error('Invalid hotels data received');
        }

        await Promise.all(hotelsData.data.hotels.map(async (hotel) => {
            const { hotel_id, accessibilityLabel, property } = hotel;
            const { name, reviewScore } = property;
            const photoUrl = property.photoUrls[0];
    

            // Insert hotel data into SQLite3 database
            await db.run(`INSERT INTO berlin_hotels (hotel_id, accessibilityLabel, name,reviewScore, photoUrl) 
                VALUES (?, ?, ?, ?, ?)`,
                [hotel_id, accessibilityLabel, name,reviewScore, photoUrl]);
        }));

        console.log('Hotels inserted into database successfully.');
    } catch (error) {
        console.error('Error inserting hotels into database:', error);
        throw error;
    }
}

// Function to handle the entire process
async function processData() {
    try {
        await createHotelsTable(); // Create the hotels table
        const hotelsData = await fetchHotelsFromBookingAPI();
        console.log(hotelsData) // Fetch hotels data from API
        await insertHotelsIntoDatabase(hotelsData); // Insert hotels data into database
    } catch (error) {
        console.error('Error processing data:', error);
    } finally {
        db.close(); // Close database connection
    }
}

// Start processing data
processData();
