document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  
  // ***********************
  // Search Button Listener
  // ***********************
  // Elements
  const selectElement = document.getElementById('muscle-group'); // The select dropdown
  const searchButton = document.getElementById('search-button'); // The search button
  
  const heroUrl = 'https://informed-fixness-d570fbe159e8.herokuapp.com/'
  
  searchButton.addEventListener('click', () => {
    const muscleGroup = selectElement.value;
    axios.get(`${heroUrl}exercise/${muscleGroup}`)
      .then(response => {
        
        console.log(response.data);
      })
      .catch(error => {
        
        console.error('Error fetching exercises:', error);
      });
  });

// ***********************
// Logout Button Listener
// ***********************
  const logoutButton = document.getElementById('logout-button');
  
  logoutButton.addEventListener('click', () => {

    // Redirect to login page
    window.location.href = 'login.html';
  });
});
  
