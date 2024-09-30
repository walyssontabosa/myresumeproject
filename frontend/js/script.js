// GET visitor count from the API
async function get_visitors() {
    try {
        let response = await fetch('https://qyr4quqvc4.execute-api.us-east-1.amazonaws.com/prod/visitorcount', {
            method: 'GET',
        });
        let data = await response.json(); // Parse the JSON response
        document.getElementById("visitors").innerHTML = data['count']; // Display the visitor count in HTML
        console.log("Visitor Count:", data);
        return data;
    } catch (err) {
        console.error("Error fetching visitor count:", err);
    }
}

// POST request to increment the visitor count
async function post_visitor() {
    try {
        let response = await fetch('https://qyr4quqvc4.execute-api.us-east-1.amazonaws.com/prod/visitorcount', {
            method: 'POST', // POST request to update the count
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "increment": 1 }) // This sends a request to increment the count by 1
        });
        let data = await response.json(); // Parse the response
        console.log("Visitor count updated:", data);
        return data;
    } catch (err) {
        console.error("Error posting visitor count:", err);
    }
}

// Call both functions to first post (increment) and then get the visitor count
async function update_visitors() {
    await post_visitor(); // Increment the count first
    await get_visitors();  // Then fetch the updated count
}

// Call the update_visitors function on page load or user action
update_visitors();
