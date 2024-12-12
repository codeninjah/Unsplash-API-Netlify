// Anropar proxy2.js med fetch
fetch('/.netlify/functions/proxy2?url=randomPic')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Skriv ut backend-loggar och data
    console.log('Backend log:', data.log); // Här visas loggar från backend
    console.log('Response data:', data.data); // Här visas Unsplash-data
  })
  .catch((error) => {
    console.error('Error fetching randomPic:', error.message);
  });
