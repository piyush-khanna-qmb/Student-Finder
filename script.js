let map;
let marker;

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

function updateMap() {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lng = parseFloat(document.getElementById('longitude').value);

    if (!isNaN(lat) && !isNaN(lng)) {
        const position = { lat: lat, lng: lng };
        map.setCenter(position);
        marker.setPosition(position);
    } else {
        alert("Please enter valid latitude and longitude values.");
    }
}

document.getElementById('updateMap').addEventListener('click', updateMap);

// Load the map
window.onload = initMap;
