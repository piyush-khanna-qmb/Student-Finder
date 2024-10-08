var map;
let marker;
var imeiList= [];
var boundingCircle;
let currentInfoWindow = null;
let currentMarker = null;
currentInfoBut= null;
var schoolRad, schoolCentre;
var schoolMarkerIcon;

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

const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ];
  
const iMapsStyle= [ // Replace with your custom style JSON
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            { "visibility": "on" },
            { "saturation": -100 }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f2f2f2" }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#a2c2e0" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            { "color": "#ffffff" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            { "visibility": "off" }
        ]
    }
]

const iMapsDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];
  
const googleDark = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

async function initMap() {
    // Initialize the map centered at some default location
    schoolMarkerIcon = {
      url: 'https://cdn4.iconfinder.com/data/icons/location-and-map-flat-1/512/locationandmap_school-education-location-map-marker-512.png', 
      scaledSize: new google.maps.Size(50, 50) // Scale the marker size (optional)
    };
    await fetch(`https://kawachapidev-dzdhebhvdqa6fyek.canadacentral-01.azurewebsites.net/api/Admin/GetSchoolDataByCode/${schoolCode}`, {
      method: 'GET',
      headers: { 'Accept': '*/*' }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
    })
    .then(data => {
        console.log(JSON.parse(data.position));
        schoolCentre= JSON.parse(data.position);
        schoolRad= data.radius;

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: JSON.parse(data.position),
            styles: nightStyle
        });
        marker = new google.maps.Marker({
            position:schoolCentre,
            map: map,
            title: `ManoJava Software Pvt. Ltd.`,
            icon: schoolMarkerIcon
        });
        boundingCircle = new google.maps.Circle({
            map: map, 
            center: schoolCentre,
            radius: data.radius*1000, 
            strokeColor: "#c39d2c", 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
            fillColor: "#d7b82d",
            fillOpacity: 0.35, 
        });
    })
    .catch(error => console.error('Failed to fetch school code:', error));
    await placeMarkers();
}

function isInsideCircle(position, center, radius) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(position.lat, position.lng),
        center
    );
    return distance <= radius;
}

var initialSetup= true;

async function getStudentsData1() {  
  var schoolId1;
  try {
    const url = `https://kawachapidev-dzdhebhvdqa6fyek.canadacentral-01.azurewebsites.net/api/Admin/GetSchoolDataByCode/${schoolCode}`;
  
      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      schoolId1= data.schoolId; // Extract schoolId from the response
  } catch (error) {
      console.error('Failed to fetch school data:', error);
  }

  const response = await fetch(`https://kawachapidev-dzdhebhvdqa6fyek.canadacentral-01.azurewebsites.net/api/Admin/GetAllStudentInfoData/${schoolId1}`);
  return await response.json();
}

// Function to post and get location data for a specific student by kawachID
async function getLocation1(kawachID) {
  console.log(kawachID);
  
  const response = await fetch('/api/v1/getCoordinatesByKawachID', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ kawachID }) // Send the kawachID in the body
  });
  return await response.json();
}

async function placeMarkers() {
    let safeKidsCount= 0, unsafeKidsCount= 0;

    const bounds = new google.maps.LatLngBounds(); 
    var circleCenter = boundingCircle.getCenter();
    var circleRadius = boundingCircle.getRadius();
    bounds.extend(circleCenter);

    const safeChildIcon= {
        url: 'https://static.vecteezy.com/system/resources/previews/023/652/060/original/green-map-pointer-icon-on-a-transparent-background-free-png.png', 
        scaledSize: new google.maps.Size(50, 50) // marker size bancho
    };
    const unsafeChildIcon= {
        url: 'https://cdn-icons-png.flaticon.com/512/7334/7334593.png', 
        scaledSize: new google.maps.Size(40, 40) 
    };
    var dataObjectList; 
    try {
        const students = await getStudentsData1();
        
        // Loop through each student and fetch their location data
        dataObjectList = await Promise.all(students.map(async student => {
            const locData = await getLocation1(student.kawachId);
            return {
                ...student,
                position: locData.position 
            };
        }));
        dataObjectList.forEach(function(data) {
          // console.log(data);
          
          const isSafe= isInsideCircle(data.position, schoolCentre, schoolRad);
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
          const studentsClass= data.className.replace(/^class/i, '');
          const safePopupContent = `
          <table class="mainTable">
                  <tr>
                      <td>
                          <div class="custom-popup safeKid">
                              <button class="infoBut"><i class="fa-solid fa-info"></i></button>
                              <img src="${data.imageUrl}" alt="Image"/>
                              <h3>${data.studentName}</h3>
                              <p style="margin-bottom: 3px">Latitude: ${data.position.lat}</p>
                              <p style="margin-top: 0px">Longitude: ${data.position.lng}</p>
                          </div>
                      </td>
  
                      <td>
                          <div class="excessInfo">
                              <h4>Academic Details</h4>
                              <p> Class: ${studentsClass} - ${data.sectionName}<br>
                                  Roll No: ${data.classRollNo} <br>
                                  Kawach ID: ${data.kawachId}</p>
                              <h4>Parent's Details</h4>
                              <p>Father's Name: ${data.fatherName}  <br>
                                 Mother's Name: ${data.motherName}</p>
                              <h4>Contact Details</h4>
                              <p>Mobile No.: ${data.mobileNo} </br>
                              Alternate No.: ${data.alternateNo} </br> </p>
                              <p>Address: ${data.address} <br>
                              Email: ${data.emailId} </p>
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
                              <img src="${data.imageUrl}" alt="Image"/>
                              <h3>${data.studentName}</h3>
                              <p style="margin-bottom: 3px">Latitude: ${data.position.lat}</p>
                              <p style="margin-top: 0px">Longitude: ${data.position.lng}</p>
                          </div>
                      </td>
  
                      <td>
                          <div class="excessInfo">
                              <h4>Academic Details</h4>
                              <p> Class: ${studentsClass} - ${data.sectionName}<br>
                                  Roll No: ${data.classRollNo} <br>
                                  Kawach ID: ${data.kawachId}</p>
                              <h4>Parent's Details</h4>
                              <p>Father's Name: ${data.fatherName}  <br>
                                 Mother's Name: ${data.motherName}</p>
                              <h4>Contact Details</h4>
                              <p>Mobile No.: ${data.mobileNo} </br>
                              Alternate No.: ${data.alternateNo} </br> </p>
                              <p>Address: ${data.address} <br>
                              Email: ${data.emailId} </p>
                          </div>
                      </td>
                  </tr>
              </table>
              `;
  
          const infoWindow = new google.maps.InfoWindow({
              content: isSafe ? safePopupContent : unsafePopupContent,
          });
  
          marker.addListener('click', function () {
              if (currentMarker === marker) {
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
                      currentInfoWindow.close(); 
                  }
          
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
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

