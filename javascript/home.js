document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  
  // ***********************
  // Search Button Listener
  // ***********************
  // Elements
  const selectElement = document.getElementById('muscle-group'); // select dropdown
  const searchButton = document.getElementById('search-button'); // search button
  const greetParagraph = document.getElementById('greeting'); // h1
  
  const heroUrl = 'https://informed-fixness-d570fbe159e8.herokuapp.com/'
  
  searchButton.addEventListener('click', () => {
    const muscleGroup = selectElement.value;
    axios.get(`${heroUrl}exercise/${muscleGroup}`)
      .then(response => {
        
        console.log(response.data.exercise[0]);
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
  
// ***********************
// Mute Button
// *********************** 
const video = document.getElementById('background-video');
const volumeIcon = document.getElementById('volume-icon');

// Click event listener to the volume icon
volumeIcon.addEventListener('click', function() {
    // Toggle the 'muted' property of the video
    video.muted = !video.muted;

    // Change the icon based on the mute state
    volumeIcon.src = video.muted ? '../assets/mute volume icon.jpg' : '../assets/volume.jpg';
});