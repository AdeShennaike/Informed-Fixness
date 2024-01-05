// ***********************
// Volume Button
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

// Redirects to home page after login
const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    const usernameInput = document.getElementById('username');
    if (usernameInput.value.trim()) { 
        // Redirect to home.html
        window.location.href = 'home.html';
    }
});