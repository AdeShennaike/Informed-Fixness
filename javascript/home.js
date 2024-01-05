document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('muscle-group'); // The select dropdown
    const searchButton = document.getElementById('search-button'); // The search button
    const axios = require('axios').default; // Make sure to include Axios
    const heroUrl = 'https://informed-fixness-d570fbe159e8.herokuapp.com/'
  
    searchButton.addEventListener('click', () => {
        console.log("click")
      const muscleGroup = selectElement.value;
      const response = axios.get(`https://informed-fixness-d570fbe159e8.herokuapp.com/exercise/${muscleGroup}`)
        .then(response => {
          // Handle success
          console.log(response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching exercises:', error);
        });
    });
  });
  
