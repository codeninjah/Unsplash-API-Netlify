const axios = require('axios');

exports.handler = async (event, context) => {
  const apiKey = process.env.API_KEY;  // Store the API key securely in environment variables
  const { url } = event.queryStringParameters;  // Get the query parameter 'url'

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'url' parameter" }),
    };
  }

  let apiUrl;

  // Determine the API URL based on the query parameter
  switch (url) {
    case 'randomPic':
      apiUrl = 'https://api.unsplash.com/photos/random';
      break;
    case `searchPerPage(${pageNr},${query})`:
      apiUrl = `https://api.unsplash.com/search/photos?per_page=15&page=${pageNr}&query=${query}`;
      break;
    case `searchPhotos(${pageNr}, ${query}})`:
      apiUrl = `https://api.unsplash.com/search/photos?page=${pageNr}&query=${query}`;
      break;
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid 'url' parameter" }),
      };
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),  // Return only the response data from the selected API
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from API' }),
    };
  }
};
