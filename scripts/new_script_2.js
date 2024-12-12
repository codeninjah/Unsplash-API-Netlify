// Exempel: Anropa randomPic
/*
fetch('/.netlify/functions/proxy2?url=randomPic')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Random picture data:', data);
  })
  .catch((error) => {
    console.error('Error fetching randomPic:', error);
  });
  */

// Exempel: Anropa searchPerPage med parametrar
/*
fetch('/.netlify/functions/proxy2?url=searchPerPage&pageNr=1&query=nature')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Search results:', data);
  })
  .catch((error) => {
    console.error('Error fetching search results:', error);
  });
  */

  // Exempel: Anropa randomPic
fetch('/.netlify/functions/proxy2')
.then((response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then((data) => {
  console.log('Random picture data:', data);
})
.catch((error) => {
  console.error('Error fetching randomPic:', error);
});
