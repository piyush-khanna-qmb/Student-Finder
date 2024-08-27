// let map;
// let marker;

// function initMap() {
//     // Initialize the map centered at some default location
//     map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 8,
//         center: { lat: 28.6158816212149, lng: 77.3748894152614 }
//     });
//     marker = new google.maps.Marker({
//         position: { lat: 28.6158816212149, lng: 77.3748894152614 },
//         map: map
//     });
// }

// // function updateMap() {
// //     const lat = parseFloat(document.getElementById('latitude').value);
// //     const lng = parseFloat(document.getElementById('longitude').value);

// //     if (!isNaN(lat) && !isNaN(lng)) {
// //         const position = { lat: lat, lng: lng };
// //         map.setCenter(position);
// //         marker.setPosition(position);
// //     } else {
// //         alert("Please enter valid latitude and longitude values.");
// //     }
// // }

// function updateMap(lat, lng) 
// {
//     if (!isNaN(lat) && !isNaN(lng)) {
//         const position = { lat: lat, lng: lng };
//         map.setCenter(position);
//         marker.setPosition(position);
//     } else {
//         console.error("Invalid latitude or longitude values.");
//     }
// }

// function fetchCoordinates() {
//     fetch('/coordinates')
//         .then(response => response.json())
//         .then(data => {
//             const { latitude, longitude } = data;
//             updateMap(latitude, longitude);
//         })
//         .catch(error => {
//             console.error('Error fetching coordinates:', error);
//         });
// }

// setInterval(fetchCoordinates, 5000);

// // document.getElementById('updateMap').addEventListener('click', updateMap);

// // Load the map
window.onload = initMap;

let map;
        let marker;
        let imei = ''; // IMEI to be fetched from input field

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

        function updateMap(lat, lng) {
            console.log("Recieevd", lat, lng);
            
            if (!isNaN(lat) && !isNaN(lng)) {
                const position = { lat: lat, lng: lng };
                map.setCenter(position);
                marker.setPosition(position);
            } else {
                console.error("Invalid latitude or longitude values.");
            }
        }

        function fetchCoordinates() {
            if (imei) {
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
                })
                .catch(error => {
                    console.error('Error fetching coordinates:', error);
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
                imei = document.getElementById('imei').value;
                fetchCoordinates();
                startPolling(); // Start polling after setting IMEI
            });
        });