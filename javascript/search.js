document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  
  // ***********************
  // Search Button Listener
  // ***********************
  // Elements
  const selectElement = document.getElementById('muscle-group'); // select dropdown
  const searchButton = document.getElementById('search-button'); // search button
  const heroUrl = 'https://informed-fixness-d570fbe159e8.herokuapp.com/'
  
  searchButton.addEventListener('click', () => {
    const muscleGroup = selectElement.value;
    axios.get(`${heroUrl}exercise/${muscleGroup}`)
      .then(response => {
        console.log(response.data.exercise)
      
      // Hide the greeting and video
      document.getElementById('greeting').style.display = 'none';
      document.getElementById('background-video').style.display = 'none';

      // Create search results container
      const resultsContainer = document.createElement('div');
      resultsContainer.className = 'results-container';

      // Add the number of results found
      const resultsCount = document.createElement('p');
      resultsCount.textContent = `${response.data.exercise.length} results found`;
      resultsContainer.appendChild(resultsCount);

      // Iterate through the exercises and create cards for each
      response.data.exercise.forEach((exer) => {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'exercise-card';

        // Add image
        const exerciseImg = document.createElement('img');
        exerciseImg.src = exer.imageUrl; // Replace with your image property
        exerciseCard.appendChild(exerciseImg);

        // Add title
        const exerciseTitle = document.createElement('h2');
        exerciseTitle.textContent = exer.name; // Replace with your title property
        exerciseCard.appendChild(exerciseTitle);

        // Add description
        const exerciseDesc = document.createElement('p');
        exerciseDesc.textContent = exer.instructions; // Replace with your description property
        exerciseCard.appendChild(exerciseDesc);

        // Append the card to the results container
        resultsContainer.appendChild(exerciseCard);
      });

      // Append the results container to the body or a specific section
      document.body.appendChild(resultsContainer);
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

// ***********************
// Background Video Loop  
// ***********************
// const videos = [
//   '../assets/7C807E07-4311-4C06-BBDF-CA382E92AFD4.MOV',
//   '../assets/889F87B7-4CD3-47DE-871E-246050C2E7AA.MOV'
// ];

// let currentVideoIndex = 0;

// const videoElement = document.getElementById('background-video');
// const sourceElement = videoElement.querySelector('source');

// // Function to play the next video
// function playNextVideo() {
//   currentVideoIndex = (currentVideoIndex + 1) % videos.length; // Loop back to the first video
//   sourceElement.src = videos[currentVideoIndex];
//   videoElement.load();
//   videoElement.play();
// }

// videoElement.addEventListener('ended', playNextVideo);

// // Start the first video
// playNextVideo();