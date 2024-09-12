window.onload = initMap;

var map;
let marker;
// let imei = []; // IMEI to be fetched from input field
var imeiList= [];

var nightStyle = [
    { elementType: 'geometry', stylers: [{ color: '#212121' }] },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#757575' }]
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }]
    },
    {
        featureType: 'administrative.land_parcel',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#181818' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#1b1b1b' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#2c2c2c' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8a8a8a' }]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#373737' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#3c3c3c' }]
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{ color: '#4e4e4e' }]
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }]
    },
    {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#3d3d3d' }]
    }
];


function initMap() {
    // Initialize the map centered at some default location
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 28.6158816212149, lng: 77.3748894152614 },
        // styles: nightStyle
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
        center: { lat: 28.6158816212149, lng: 77.3748894152614 },
        // styles: nightStyle
    });
}

function updateMap(lat, lng, bounds) {
    console.log("Recieevd", lat, lng);
    if (!isNaN(lat) && !isNaN(lng)) {
        const position = { lat: lat, lng: lng };
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: `IMEI: ${location.imei}` 
        });
        bounds.extend(marker.position);
    } else {
        console.error("Invalid latitude or longitude values.");
    }
}

function fetchCoordinates() {
    if (imeiList) {
        const bounds = new google.maps.LatLngBounds();  
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
                // console.log("Data: ", data);

                if (data.lat && data.lng) {
                    const position = { lat: data.lat, lng: data.lng };
                    
                    var marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: `IMEI: ${data.lat}`  
                    });

                    bounds.extend(position);  
                } else {
                    console.error("No coordinates data received.");
                }
            })
            .catch(error => {
                console.error('Error fetching coordinates:', error);
            });
        });

        Promise.all(fetchPromises).then(() => {
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
        // console.log(data);
        resetMap();
        if(imeiList.length > 0)
            fetchCoordinates();
        else
            initMap();
        
        // startPolling();
    });
});

var addRow = document.getElementById('addFieldButton');

addRow.addEventListener('click', () => {

	// Create Data ID
	dataID = Math.round(Math.random()*(999999-100000)+100000);
		
	// Create Row
	row = document.createElement('div');
	document.getElementById('list').append(row);
	row.setAttribute('class', 'extended');

	// Create Label
	label = document.createElement('label');
	row.append(label);
	label.setAttribute('for', "data_" + dataID);

	// Create Input Field
	input = document.createElement('input');
	row.append(input);
	input.setAttribute('type','text');
	input.setAttribute('placeholder','M y K a w a c h   I D');
	input.setAttribute('id', "data_" + dataID);
	input.setAttribute('name', "imei");

	// Create Delete Button
	deleteBtn = document.createElement('button');
	row.append(deleteBtn);
	deleteBtn.setAttribute('class','delete');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark fa-l"></i>'; 
});

var list = document.getElementById('list');

list.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('button.delete');

    // Check if a button with class 'delete' was clicked or the <i> element within it
    if (deleteBtn) {
        const deleteRow = deleteBtn.parentNode; // Find the parent row (div) of the button
        deleteRow.remove(); // Remove the row from the DOM
    }
});