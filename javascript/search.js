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
    // Clear existing results if they exist
    let existingResultsContainer = document.querySelector('.results-container');
    if (existingResultsContainer) {
      existingResultsContainer.remove();
    }

    const muscleGroup = selectElement.value;
    const greetingElement = document.getElementById('greeting');
    const backgroundVideo = document.getElementById('background-video');
    const volumeIcon = document.getElementById('volume-icon');

    axios.get(`${heroUrl}exercise/${muscleGroup}`)
      .then(response => {
        console.log(response.data.exercise)
        
        
        // remove the greeting and video and mute button
        // check if it exists before trying to remove an element
        if (greetingElement) {
          greetingElement.remove();
        }
        if (backgroundVideo) {
          backgroundVideo.remove();
        }
        if (volumeIcon) {
          volumeIcon.remove();
        }        
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
          
          // // Add image
          // const exerciseImg = document.createElement('img');
          // exerciseImg.src = exer.imageUrl; // Replace with your image property
          // exerciseCard.appendChild(exerciseImg);
          
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
      
      // Redirect to index page
      window.location.href = 'index.html';
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
  // Search Icon event
  // *********************** 
  // Event listener for the search icon in the bottom nav
document.getElementById('search-icon').addEventListener('click', () => {
  // Check if the greeting exist then Recreate and add the greeting
  if (!document.getElementById('greeting')) {
    const greeting = document.createElement('h1');
    greeting.id = 'greeting';
    greeting.textContent = 'Greetings potential meathead, what muscle would you like to work in hopes of being less puny?';
    document.body.insertBefore(greeting, document.body.firstChild);
  }

  // Check if the video exist then Recreate and add the video
  if (!document.getElementById('background-video')) {
    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.id = 'background-video';
    const source = document.createElement('source');
    source.src = '../assets/889F87B7-4CD3-47DE-871E-246050C2E7AA.MOV';
    source.type = 'video/mp4';
    video.appendChild(source);
    document.body.insertBefore(video, document.body.firstChild);
  }

  // Check if the icon exist then Recreate and add the icon
  if (!document.getElementById('volume-icon')) {
    const volumeIcon = document.createElement('img');
    volumeIcon.src = '../assets/volume.jpg';
    volumeIcon.alt = 'Volume Icon';
    volumeIcon.id = 'volume-icon';
    document.body.appendChild(volumeIcon);
  }

  // Add event listener to new volume icon (similar to previous one)
  volumeIcon.addEventListener('click', function() {
    video.muted = !video.muted;
    volumeIcon.src = video.muted ? '../assets/mute volume icon.jpg' : '../assets/volume.jpg';
  });

  // Remove the search results
  const resultsContainer = document.querySelector('.results-container');
  if (resultsContainer) {
    resultsContainer.remove();
  }
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