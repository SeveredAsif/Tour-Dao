const axios = require('axios');

async function fetchHotelData() {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id: '-2092174',
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
      'x-rapidapi-key': 'dd4bd520e1msh1325e10e4e1803ap13bdf6jsn1aca0938f6d4',
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