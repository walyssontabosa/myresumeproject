// script.js

// Function to get the current count from local storage
function getAccessCount() {
    return localStorage.getItem('accessCount') || 0;
}

// Function to increment the count and update local storage
function incrementAccessCount() {
    let count = parseInt(getAccessCount());
    count++;
    localStorage.setItem('accessCount', count);
    return count;
}

// Function to display the count on the page
function displayAccessCount() {
    const count = incrementAccessCount();
    const accessCountElement = document.getElementById('access-count');
    accessCountElement.textContent = `This resume has been accessed ${count} times.`;
}

// Call the function to display the count when the page loads
window.onload = displayAccessCount;
