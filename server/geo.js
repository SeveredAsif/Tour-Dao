const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
  params: { query: 'berlin' },
  headers: {
    'x-rapidapi-key': '9339cf7a9amshefe5ad25556e91bp133a8ejsna241101b6824',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
  }
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();





