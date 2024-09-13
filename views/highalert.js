var map;
let marker;
var imeiList= [];
var boundingCircle;
let currentInfoWindow = null;
let currentMarker = null;
currentInfoBut= null;

var markerDataList = [
    { 
        kawachID: 'STA00101', 
        position: { lat: 28.600000, lng: 77.255000 },
        name: "Piyush Khanna",
        class: "8B",
        roll: 38,
        fatherName: "Mukesh Khanna",
        fatherContact: "+91 7669956656",
        motherName: "Pooja Khanna",
        motherContact: "+91 95489445863",
        address: "D-1, Gali no. 4, Gurunanakpura, Modinagar, Ghaziabad"
    },
    { 
        kawachID: 'STA00102', 
        position: { lat: 29.600000, lng: 77.255000 },
        name: "Arjun Gaur",
        class: "8B",
        roll: 38,
        fatherName: "Amit Gaur",
        fatherContact: "+91 7669956656",
        motherName: "Sonia Gaur",
        motherContact: "+91 95489445863",
        address: "C-111, Gurunanakpura, Modinagar, Ghaziabad"
    },
    { 
        kawachID: 'STA00103', 
        position: { lat: 28.800000, lng: 77.255000 },
        name: "Anant Aggarwal",
        class: "8B",
        roll: 38,
        fatherName: "Lala aggarwal",
        fatherContact: "+91 7669956656",
        motherName: "aunty aggarwal",
        motherContact: "+91 95489445863",
        address: "D-1, Gali no. 4, gurunanakpura, Modinagar, Ghaziabad"
    },
    { 
        kawachID: 'STA00104', 
        position: { lat: 28.600000, lng: 77.455000 },
        name: "Sunny Shamra",
        class: "8B",
        roll: 38,
        fatherName: "Set Sharma",
        fatherContact: "+91 7669956656",
        motherName: "Indu Sharma",
        motherContact: "+91 95489445863",
        address: "D-1, Gali no. 4, gurunanakpura, Modinagar, Ghaziabad"
    },
];


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

var electricBlueStyle = [
    { elementType: 'geometry', stylers: [{ color: '#1d1d2c' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#1c1c1c' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] }, // Electric blue text color
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#4d4d5e' }]
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#4b70ff' }] // Electric blue for country borders
    },
    {
        featureType: 'administrative.land_parcel',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#334e87' }]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#2e2e4a' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#181833' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#30304f' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1b2b5a' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#4b70ff' }] // Electric blue for road labels
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#1b233d' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#4b70ff' }] // Electric blue highway borders
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#000d33' }] // Deep blue water
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#4b70ff' }] // Electric blue water labels
    }
];

var earthBlueStyle = [
    { elementType: 'geometry', stylers: [{ color: '#1f2a35' }] }, // Dark gray-blue background
    { elementType: 'labels.text.stroke', stylers: [{ color: '#1f1f1f' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#a0c4c7' }] }, // Earth blue text color
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#465d73' }] // Muted earth blue for borders
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6a8491' }] // Soft blue for country labels
    },
    {
        featureType: 'administrative.land_parcel',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#2d4452' }] // Dark muted blue for strokes
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#263947' }] // Darker landscape for places of interest
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#1c3745' }] // Soft dark blue for parks
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#2a3e51' }] // Earthy blue for roads
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#314b5f' }] // Darker blue strokes for roads
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6a8491' }] // Soft blue for road labels
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#2c475f' }] // Muted earth blue for highways
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#6a8491' }] // Earth blue stroke for highways
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#0b3d51' }] // Deep earth blue water
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#5b899a' }] // Muted blue labels for water bodies
    }
];


async function initMap() {
    // Initialize the map centered at some default location
   
    var schoolMarkerIcon = {
        url: 'https://cdn4.iconfinder.com/data/icons/location-and-map-flat-1/512/locationandmap_school-education-location-map-marker-512.png', 
        scaledSize: new google.maps.Size(50, 50) // Scale the marker size (optional)
    };
    map = await new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 28.6158816212149, lng: 77.3748894152614 },
        styles: nightStyle
    });
    marker = new google.maps.Marker({
        position: { lat: 28.6158816212149, lng: 77.3748894152614 },
        map: map,
        title: `ManoJava Software Pvt. Ltd.`,
        icon: schoolMarkerIcon
    });
    boundingCircle = new google.maps.Circle({
        map: map,
        center: { lat: 28.6158816212149, lng: 77.3748894152614 }, 
        radius: 10000, 
        strokeColor: "#c39d2c", 
        strokeOpacity: 0.8, 
        strokeWeight: 2, 
        fillColor: "#d7b82d", 
        // fillColor: "#81d05c", 
        fillOpacity: 0.35, 
    });

    // Place the markers
    placeMarkers(markerDataList);
}

function isInsideCircle(position, center, radius) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(position.lat, position.lng),
        center
    );
    return distance <= radius;
}

var initialSetup= true;

function placeMarkers(dataList) {
    let safeKidsCount= 0, unsafeKidsCount= 0;

    const bounds = new google.maps.LatLngBounds(); 
    var circleCenter = boundingCircle.getCenter();
    var circleRadius = boundingCircle.getRadius();
    bounds.extend(circleCenter);

    const safeChildIcon= {
        url: 'https://static.vecteezy.com/system/resources/previews/023/652/060/original/green-map-pointer-icon-on-a-transparent-background-free-png.png', 
        scaledSize: new google.maps.Size(50, 50) // Optionally scale the marker size
    };
    const unsafeChildIcon= {
        url: 'https://cdn-icons-png.flaticon.com/512/7334/7334593.png', 
        scaledSize: new google.maps.Size(40, 40) // Optionally scale the marker size
    };
    
    
    dataList.forEach(function(data) {
        // Create a marker
        const isSafe= isInsideCircle(data.position, circleCenter, circleRadius);
        if(isSafe)
            safeKidsCount++;
        else
            unsafeKidsCount++;
        var marker = new google.maps.Marker({
            position: data.position,
            map: map,
            title: data.kawachID,
            icon: isSafe ? safeChildIcon : unsafeChildIcon,
        });
        bounds.extend(data.position);  
        const safePopupContent = `
        <table class="mainTable">
                <tr>
                    <td>
                        <div class="custom-popup safeKid">
                            <button class="infoBut"><i class="fa-solid fa-info"></i></button>
                            <img src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png" alt="Image"/>
                            <h3>${data.name}</h3>
                            <p>Latitude: ${data.position.lat} <br/> Longitude: ${data.position.lng}</p>
                        </div>
                    </td>

                    <td>
                        <div class="excessInfo">
                            <h4>Academic Details</h4>
                            <p> Class: ${data.class} <br>
                                Roll No: ${data.roll} <br>
                                Kawach ID: ${data.kawachID}</p>
                            <h4>Father's Details</h4>
                            <p>Name: ${data.fatherName}  <br>
                                Contact: ${data.fatherContact}</p>
                            <h4>Mother's Details</h4>
                            <p>Name: ${data.motherName} <br>
                            Contact: ${data.motherContact} </p>
                            <h4>Address</h4>
                            <p style="margin-bottom: 0;">${data.address} </p>
                        </div>
                    </td>
                </tr>
            </table>
        `;
    
        const unsafePopupContent = `
            <table class="mainTable">
                <tr>
                    <td>
                        <div class="custom-popup unsafeKid">
                            <button class="infoBut"><i class="fa-solid fa-info"></i></button>
                            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/thief-3d-icon-download-in-png-blend-fbx-gltf-file-formats--theft-robber-criminal-avatar-professions-pack-avatars-icons-5250873.png?f=webp" alt="Image"/>
                            <h3>${data.name}</h3>
                            <p>Latitude: ${data.position.lat} <br/> Longitude: ${data.position.lng}</p>
                        </div>
                    </td>

                    <td>
                        <div class="excessInfo">
                            <h4>Academic Details</h4>
                            <p> Class: ${data.class} <br>
                                Roll No: ${data.roll} <br>
                                Kawach ID: ${data.kawachID}</p>
                            <h4>Father's Details</h4>
                            <p>Name: ${data.fatherName}  <br>
                                Contact: ${data.fatherContact}</p>
                            <h4>Mother's Details</h4>
                            <p>Name: ${data.motherName} <br>
                            Contact: ${data.motherContact} </p>
                            <h4>Address</h4>
                            <p style="margin-bottom: 0;">${data.address} </p>
                        </div>
                    </td>
                </tr>
            </table>
            `;

        // Create the InfoWindow
        const infoWindow = new google.maps.InfoWindow({
            content: isSafe ? safePopupContent : unsafePopupContent,
        });

        // infoWindow.open(map, marker);

        marker.addListener('click', function () {
            if (currentMarker === marker) {
                // If the same marker is clicked again
                if (currentInfoWindow) {
                    removeEventListener('click', currentInfoBut);
                    currentInfoBut = null;
                    currentInfoWindow.close();
                    currentInfoWindow = null;
                    currentMarker = null;
                }
            } else {
            
                if (currentInfoWindow) {
                    removeEventListener('click', currentInfoBut);
                    currentInfoBut = null;
                    currentInfoWindow.close(); // Close the currently open InfoWindow if exists
                }
        
                // Toggle InfoWindow visibility on marker click
                infoWindow.open(map, marker);
                currentInfoWindow = infoWindow;
                currentMarker = marker;
            }
        });
        google.maps.event.addListenerOnce(infoWindow, 'domready', function() {
            const infoButton = document.querySelector('.infoBut');
            const excessInfoDiv = document.querySelector('.excessInfo');

            if (infoButton && excessInfoDiv) {
                infoButton.addEventListener('click', function() {                    
                    if (excessInfoDiv.style.display === "block") {
                        excessInfoDiv.style.display = "none";
                    } else {
                        excessInfoDiv.style.display = "block";
                    }
                    currentInfoBut= infoButton;
                });
            }
        });
    });
    map.fitBounds(bounds); 
    console.log(`Safe Kids: ${safeKidsCount}\nUnsafe Kids: ${unsafeKidsCount}`);
}
