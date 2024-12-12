const axios = require('axios');

exports.handler = async (event, context) => {
  const apiKey = process.env.API_KEY; // Din Unsplash API-nyckel
  const { url, pageNr, query } = event.queryStringParameters || {}; // Få query-parametrar

  console.log('Incoming request:', { url, pageNr, query }); // Logga inkommande förfrågningar

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing 'url' parameter" }),
    };
  }

  let apiUrl;

  try {
    // Hantera olika endpoints baserat på 'url'
    switch (url) {
      case 'randomPic':
        apiUrl = 'https://api.unsplash.com/photos/random';
        break;

      case 'searchPerPage':
        if (!pageNr || !query) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing 'pageNr' or 'query' parameter" }),
          };
        }
        apiUrl = `https://api.unsplash.com/search/photos?per_page=15&page=${pageNr}&query=${query}`;
        break;

      case 'searchPhotos':
        if (!pageNr || !query) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing 'pageNr' or 'query' parameter" }),
          };
        }
        apiUrl = `https://api.unsplash.com/search/photos?page=${pageNr}&query=${query}`;
        break;

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Invalid 'url' parameter" }),
        };
    }

    console.log('API request URL:', apiUrl); // Logga den faktiska Unsplash URL:en

    // Anropa Unsplash API
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Client-ID ${apiKey}`, // Använd rätt Unsplash-header
      },
    });

    console.log('API response status:', response.status); // Logga statuskod från Unsplash
    return {
      statusCode: 200,
      body: JSON.stringify(response.data), // Returnera data till frontend
    };
  } catch (error) {
    console.error('Error during API call:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to fetch data from API',
        status: error.response?.status,
        details: error.response?.data || error.message,
      }),
    };
  }
};
