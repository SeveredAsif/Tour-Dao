const axios = require('axios');

async function fetchHotelData() {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id: '-1746443',
      search_type: 'CITY',
      arrival_date: '2024-07-15',
    departure_date: '2024-07-19',
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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchHotelData();