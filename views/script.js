window.onload = initMap;

var map;
let marker;

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

var boundingCircle;
var schoolRad, schoolCentre;

var schoolMarkerIcon = {
    url: 'https://cdn4.iconfinder.com/data/icons/location-and-map-flat-1/512/locationandmap_school-education-location-map-marker-512.png', 
    scaledSize: new google.maps.Size(50, 50) // Scale the marker size (optional)
};

function initMap() {
    // Initialize the map centered at some default location
    fetch(`https://kawachapidev-dzdhebhvdqa6fyek.canadacentral-01.azurewebsites.net/api/Admin/GetSchoolDataByCode/${schoolCode}`, {
        method: 'GET',
        headers: { 'Accept': '*/*' }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
    })
    .then(data => {
        // console.log(JSON.parse(data.position));
        schoolCentre= JSON.parse(data.position);
        schoolRad= data.radius;

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: JSON.parse(data.position),
            // styles: nightStyle
        });
        marker = new google.maps.Marker({
            position:JSON.parse(data.position),
            map: map,
            title: `ManoJava Software Pvt. Ltd.`,
            icon: schoolMarkerIcon
        });
        boundingCircle = new google.maps.Circle({
            map: map,
            // center: { lat: 28.6158816212149, lng: 77.3748894152614 }, 
            center: JSON.parse(data.position),
            radius: data.radius*10, 
            strokeColor: "#c39d2c", 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
            fillColor: "#d7b82d",
            fillOpacity: 0.35, 
        });
    })
    .catch(error => console.error('Failed to fetch school code:', error));
}

function resetMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: schoolCentre,
        // styles: nightStyle
    });
    marker = new google.maps.Marker({
        position:schoolCentre,
        map: map,
        title: `ManoJava Software Pvt. Ltd.`,
        icon: schoolMarkerIcon
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
        var circleCenter = boundingCircle.getCenter();
        bounds.extend(circleCenter);
        const fetchPromises = imeiList.map(imei => {
            return fetch('/checkedCoordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imei: imei, schoolCode: schoolCode })
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
    // initMap();

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