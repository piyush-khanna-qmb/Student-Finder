window.onload = initMap;

var map;
let marker;
// let imei = []; // IMEI to be fetched from input field
var imeiList= [];

function initMap() {
    // Initialize the map centered at some default location
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 28.6158816212149, lng: 77.3748894152614 }
    });
    marker = new google.maps.Marker({
        position: { lat: 28.6158816212149, lng: 77.3748894152614 },
        map: map,
        title: `ManoJava Software Pvt. Ltd.`
    });
}

function resetMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 28.6158816212149, lng: 77.3748894152614 }
    });
}

function updateMap(lat, lng, bounds) {
    console.log("Recieevd", lat, lng);
    if (!isNaN(lat) && !isNaN(lng)) {
        const position = { lat: lat, lng: lng };
        // map.setCenter(position);
        // marker.setPosition(position);
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: `IMEI: ${location.imei}`  // Optional: Title when hovering over the marker
        });
        bounds.extend(marker.position);
    } else {
        console.error("Invalid latitude or longitude values.");
    }
}

// function fetchCoordinates() {
//     if (imeiList) {
//         const bounds = new google.maps.LatLngBounds();

//         imeiList.forEach(async imei => {
//             await fetch('/coordinates', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ imei: imei })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Data: ", data);
                
//                 if (data.lat && data.lng) {
//                     var marker = new google.maps.Marker({
//                         position: data,
//                         map: map,
//                         title: `IMEI: ${data.lat}`  // Optional: Title when hovering over the marker
//                     });
//                     bounds.extend(data);
//                 } else {
//                     console.error("No coordinates data received.");
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching coordinates:', error);
//             });
//         });
        
//         map.fitBounds(bounds); 
//     }
// }

function fetchCoordinates() {
    if (imeiList) {
        const bounds = new google.maps.LatLngBounds();  // Initialize bounds

        // Create an array of promises for each fetch call
        const fetchPromises = imeiList.map(imei => {
            return fetch('/coordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imei: imei })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data: ", data);

                if (data.lat && data.lng) {
                    const position = { lat: data.lat, lng: data.lng };
                    
                    var marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: `IMEI: ${data.lat}`  // Optional: Title when hovering over the marker
                    });

                    bounds.extend(position);  // Add marker position to bounds
                } else {
                    console.error("No coordinates data received.");
                }
            })
            .catch(error => {
                console.error('Error fetching coordinates:', error);
            });
        });

        // Wait for all fetch calls to complete
        Promise.all(fetchPromises).then(() => {
            // Now that all markers have been added, fit the bounds
            map.fitBounds(bounds);
        });
    }
}

function startPolling() {
    // Poll the server every 5 seconds
    setInterval(fetchCoordinates, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();

    // Setup event listeners for form submission
    document.getElementById('updateMap').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission
        const inputElements = document.querySelectorAll('input[name="imei"]');
        // const imeiList = [];
        imeiList= [];

        // Iterate over each input element and get its value
        inputElements.forEach(input => {
            if (input.value.trim() !== "") {  // Check if the input is not empty or null
                imeiList.push(input.value);
            }
        });
        const data = JSON.stringify({ imeiList });
        console.log(data);
        resetMap();
        fetchCoordinates();
        // startPolling();
    });
});

function addInputField()
{
    console.log("Add button clicked");
    const form = document.querySelector('.input-column form');

    // Create a new input element
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'imei'; // Adjust the name attribute as needed
    newInput.placeholder = 'M y K a w a c h  I D';

    const submitButton = document.getElementById('updateMap');

    form.insertBefore(newInput, submitButton);
}