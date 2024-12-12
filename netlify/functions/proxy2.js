exports.handler = async (event, context) => {
  const apiKey = process.env.API_KEY; // Store the API key securely in environment variables
  const { url, pageNr, query } = event.queryStringParameters || {}; // Extract query parameters

  console.log('Incoming request:', { url, pageNr, query }); // Log inkommande parametrar

  if (!url) {
    console.error("Missing 'url' parameter");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'url' parameter" }),
    };
  }

  let apiUrl;

  try {
    switch (url) {
      case 'randomPic':
        apiUrl = 'https://api.unsplash.com/photos/random';
        break;
      case 'searchPerPage':
        if (!pageNr || !query) {
          console.error("Missing 'pageNr' or 'query' parameter");
          return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing 'pageNr' or 'query' parameter" }),
          };
        }
        apiUrl = `https://api.unsplash.com/search/photos?per_page=15&page=${pageNr}&query=${query}`;
        break;
      case 'searchPhotos':
        if (!pageNr || !query) {
          console.error("Missing 'pageNr' or 'query' parameter");
          return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing 'pageNr' or 'query' parameter" }),
          };
        }
        apiUrl = `https://api.unsplash.com/search/photos?page=${pageNr}&query=${query}`;
        break;
      default:
        console.error("Invalid 'url' parameter:", url);
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid 'url' parameter" }),
        };
    }

    console.log('Fetching from API:', apiUrl); // Log vilken API URL som anropas

    const axios = require('axios');
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log('API response:', response.data); // Logga API-responsen (för felsökning)

    return {
      statusCode: 200,
      body: JSON.stringify(response.data), // Return only the response data from the selected API
    };
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from API', details: error.message }),
    };
  }
};
