document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  
  // ***********************
  // Modal to add exercise
  // ***********************
  // Get the modal element
  const addExerciseModal = document.getElementById('addExerciseModal');

  // Get the button that opens the modal
  const postIcon = document.getElementById('post-icon');

  // Get the <span> element that closes the modal
  const closeModal = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  postIcon.onclick = function() {
    addExerciseModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  closeModal.onclick = function() {
    addExerciseModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === addExerciseModal) {
      addExerciseModal.style.display = "none";
    }
  }

  // Handle the add exercise form submission
  document.getElementById('addExerciseForm').onsubmit = function(event) {
    event.preventDefault();
    
  };

  // ***********************
  // Search Button Listener
  // ***********************
  // Elements
  const selectElement = document.getElementById('muscle-group'); // select dropdown
  const searchButton = document.getElementById('search-button'); // search button
  const heroUrl = 'https://informed-fixness-d570fbe159e8.herokuapp.com/'

  //Functions
  // Function to create the detail page
  function createDetailPage(exercise) {
    // Clear the current content
    document.body.innerHTML = '';

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'close-button';
    closeButton.onclick = function() {
      window.location.reload(); // Reload the page to go back to the search results
    };
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    document.body.appendChild(closeButton);

    // Function to delete an exercise
  function deleteExercise(exerciseId) {
    axios.delete(`${heroUrl}exercise/${exerciseId}`)
      .then(response => {
        console.log('Exercise deleted');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);
      });
  }

  // Add the event listener to the delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-button'
  deleteButton.onclick = function() {
    deleteExercise(exercise._id);
  };

  // Add the delete button to the DOM
  document.body.appendChild(deleteButton);

  // Create the title
  const title = document.createElement('h1');
  title.textContent = exercise.name;
  title.className = 'result-title';
  document.body.appendChild(title);

  // Create a container for the image and text overlay
  const imageContainer = document.createElement('div');
  imageContainer.className = 'result-image-container';
  
  // Add the image to the container
  const image = document.createElement('img');
  image.src = '../assets/1B050E86-1466-43F0-9524-5ADF8F8EFB49.jpg';
  image.className = 'result-image'; 
  imageContainer.appendChild(image);

  // Create a text element to overlay on the image
  const imageText = document.createElement('div');
  imageText.className = 'result-image-text';
  imageText.textContent = 'MESSAGE FROM THE CREATOR: There were way too many exercises to have an image for each, If only there was a search engine that allowed you to find one....'; // Replace with your text
  imageContainer.appendChild(imageText);

  // Append the image container to the body or a specific section
  document.body.appendChild(imageContainer);

  // Create the description
  const description = document.createElement('p');
  description.textContent = exercise.instructions;
  description.className = 'result-description';
  document.body.appendChild(description);
  }
  
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
          // exerciseImg.src = exer.imageUrl; // 
          // exerciseCard.appendChild(exerciseImg);
          
          // Add title
          const exerciseTitle = document.createElement('h2');
          exerciseTitle.className = 'exercise-title';
          exerciseTitle.textContent = exer.name;
          exerciseTitle.onclick = function() {
            createDetailPage(exer); 
          };
          exerciseCard.appendChild(exerciseTitle);
          
          // Add description
          const exerciseDesc = document.createElement('p');
          exerciseDesc.className = 'exercise-description';
          exerciseDesc.textContent = exer.instructions;
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

  function toggleMute() {
    const video = document.getElementById('background-video');
    if (video) {
        video.muted = !video.muted;
        document.getElementById('volume-icon').src = video.muted ? '../assets/mute volume icon.jpg' : '../assets/volume.jpg';
    }
  }

  // Initial setup for the mute button
  const initialVolumeIcon = document.getElementById('volume-icon');
  if (initialVolumeIcon) {
      initialVolumeIcon.addEventListener('click', toggleMute);
  }

  // When re-creating the volume icon
  if (!document.getElementById('volume-icon')) {
      const volumeIcon = document.createElement('img');
      volumeIcon.src = '../assets/volume.jpg';
      volumeIcon.alt = 'Volume Icon';
      volumeIcon.id = 'volume-icon';
      volumeIcon.addEventListener('click', toggleMute);
      document.body.appendChild(volumeIcon);
  }


    // Remove the search results
    const resultsContainer = document.querySelector('.results-container');
    if (resultsContainer) {
      resultsContainer.remove();
    }
  });
