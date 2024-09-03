window.onload = initMap;

let map;
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
        map: map
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
        bounds.extend(position);
    } else {
        console.error("Invalid latitude or longitude values.");
    }
}

function fetchCoordinates() {
    if (imeiList) {
        const bounds = new google.maps.LatLngBounds();

        imeiList.forEach(imei => {
            fetch('/coordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imei: imei })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data: ", data);
                
                if (data.latitude && data.longitude) {
                    updateMap(data.latitude, data.longitude);
                } else {
                    console.error("No coordinates data received.");
                }
                if (imeiList.indexOf(imei) === imeiList.length - 1) {
                    map.fitBounds(bounds);  // Auto-adjusts the map to fit all markers
                }
            })
            .catch(error => {
                console.error('Error fetching coordinates:', error);
            });
        });
    }
}

function startPolling() {
    // Poll the server every 5 seconds
    setInterval(fetchCoordinates, 5000);
}

// document.addEventListener('DOMContentLoaded', () => {
//     initMap();

//     // Setup event listeners for form submission
//     document.getElementById('updateMap').addEventListener('click', (event) => {
//         event.preventDefault(); // Prevent default form submission
//         imei = document.getElementById('imei').value;
//         fetchCoordinates();
//         startPolling(); // Start polling after setting IMEI
//     });
// });

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