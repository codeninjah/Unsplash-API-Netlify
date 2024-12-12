const axios = require('axios');

require('dotenv').config();


exports.handler = async (event, context) => {
  const apiKey = process.env.API_KEY;
  const { url } = event.queryStringParameters || {};
  
  console.log('Incoming request:', { url }); // Logga inkommande förfrågan

  if (!url) {
    console.error("Missing 'url' parameter");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing 'url' parameter", log: 'Check URL parameter' }),
    };
  }

  let apiUrl;

  try {
    switch (url) {
      case 'randomPic':
        apiUrl = 'https://api.unsplash.com/photos/random';
        console.log('Fetching random picture from Unsplash'); // Extra logg
        break;
      default:
        console.error("Invalid 'url' parameter:", url);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Invalid 'url' parameter", log: `Received url: ${url}` }),
        };
    }

    console.log('API request URL:', apiUrl);

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Client-ID ${apiKey}`, // OBS: "Client-ID" används här, inte "Bearer"
      },
    });

    console.log('API response received'); // Bekräftelse-logg
    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.data, log: 'API call successful' }),
    };
  } catch (error) {
    console.error('Error during API call:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch data from API', log: error.message }),
    };
  }
};
