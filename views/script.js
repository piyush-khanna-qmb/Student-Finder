var map;
let marker;

var imeiList= [];
var schoolMarker;

const kawachLightThemeMap= [
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]


const kawachDarkThemeMap = [
  // Base styling for dark theme
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  // Water styling
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d'
      }
    ]
  },
  // Road styling
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c2c2c'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737'
      }
    ]
  },
  // Keeping original visibility settings
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  // Additional dark theme elements
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
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

const newiMapsDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
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
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
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
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
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


const nightStyle = [
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

const lightTheme = [
    {
      "elementType": "geometry",
      "stylers": [
        { "color": "#d5d5d5" }  // Default silver/grey for the general map background
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#523735" }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        { "color": "#f5f1e6" }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "color": "#d5d5d5" }  // Grey for other POIs
      ]
    },
    {
      "featureType": "poi.business",  // Generic business POI
    //   "stylers": [
    //     { "visibility": "off" }  // Hiding business POIs to declutter
    //   ]
    },
    {
      "featureType": "poi.apartment",
      "elementType": "geometry",
      "stylers": [
        { "color": "#ebe3cd" }  // Beige color specifically for apartments
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        { "color": "#ffffff" }  // Light grey for roads
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        { "color": "#fdfcf8" }  // Slightly lighter roads for arterials
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        { "color": "#f8c967" }  // Yellowish for highways
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#e9bc62" }  // Slightly darker stroke for highways
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        { "color": "#e98d58" }  // Controlled access highways
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#db8555" }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
        { "color": "#eaeaea" }  // Slightly lighter grey for man-made landscapes
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#b9d3c2" }  // Light blue for water bodies
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#92998d" }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#a5b076" }  // Green for parks
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        { "color": "#447530" }
      ]
    }
  ];  
   

var boundingCircle;
var schoolRad, schoolCentre, schoolName;

var schoolMarkerIcon = {
    url: 'https://cdn4.iconfinder.com/data/icons/location-and-map-flat-1/512/locationandmap_school-education-location-map-marker-512.png', 
    // url: '../views/sch.png', 
    scaledSize: new google.maps.Size(50, 50) // Scale the marker size (optional)
};

var markerMap= new Map();
var markersList= [];

function showLoading() {
    document.getElementById('overlay-container').style.display = 'block';
  }
  
  function hideLoading() {
    document.getElementById('overlay-container').style.display = 'none';
  }

async function initMap() {
    // Initialize the map centered at some default location
    showLoading();
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4.5,
        center: {lat: 22.9734, lng: 78.6569},
        styles: kawachDarkThemeMap
      });
    await fetch(`http://49.50.119.238:3000/api/Admin/GetSchoolDataByCode/${schoolCode}`, {
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
        schoolName= data.schoolName;

        marker = new google.maps.Marker({
            position:JSON.parse(data.position),
            map: map,
            title: `${schoolName}`,
            icon: schoolMarkerIcon
        });
        boundingCircle = new google.maps.Circle({
            map: map,
            // center: { lat: 28.6158816212149, lng: 77.3748894152614 }, 
            center: JSON.parse(data.position),
            radius: data.radius, 
            strokeColor: "#ccccc5", 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
            fillColor: "#ccccc5",
            fillOpacity: 0.35, 
        });
        hideLoading();
    })
    .catch(error => {
        console.error('Failed to fetch school code:', error);
        console.log("Uncomment lines beneath to initiate with default data:");

        schoolCentre= { lat: 28.6158816212149, lng: 77.3748894152614 };
        schoolRad= 1000;
        schoolName= "Manojava Software";

        marker = new google.maps.Marker({
            position:{ lat: 28.6158816212149, lng: 77.3748894152614 },
            map: map,
            title: `${schoolName}`,
            icon: schoolMarkerIcon
        });
        boundingCircle = new google.maps.Circle({
            map: map,
            // center: { lat: 28.6158816212149, lng: 77.3748894152614 }, 
            center: { lat: 28.6158816212149, lng: 77.3748894152614 },
            radius: schoolRad, 
            // strokeColor: "#000000", 
            strokeColor: "#035755", 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
            // fillColor: "#ccccc5",
            // fillColor: "#035755",
            fillOpacity: 0.35, 
            icons: [{
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#00FF00",
                fillOpacity: 1,
                scale: 1,
                strokeWeight: 0,
                gradient: [
                  'rgba(0, 255, 0, 0.6)',    // Center: Bright green
                  'rgba(0, 255, 0, 0.45)',   // Inner: Slightly less opaque
                  'rgba(0, 255, 0, 0.3)',    // Middle: More transparent
                  'rgba(0, 255, 0, 0.15)',   // Outer: Very transparent
                  'rgba(0, 255, 0, 0)'       // Edge: Fully transparent
                ]
              },
              repeat: '25%'
            }]
          });
        createToast({
          type: "error",
          headline: "Angular Server Down!",
          text: "Sorry for the inconvinience. Please try again after some time."
        });
    });
}

function resetMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4.5,
        center: schoolCentre,
        // styles: nightStyle
    });
    marker = new google.maps.Marker({
        position:schoolCentre,
        map: map,
        title: `${schoolName}`,
        icon: schoolMarkerIcon
    });
    boundingCircle = new google.maps.Circle({
        map: map,
        // center: { lat: 28.6158816212149, lng: 77.3748894152614 }, 
        center: schoolCentre,
        radius: schoolRad, 
        strokeColor: "#c39d2c", 
        strokeOpacity: 0.8, 
        strokeWeight: 2, 
        fillColor: "#d7b82d",
        fillOpacity: 0.35, 
    });
    markerMap.clear();
    // clearMarkers();
}

function clearMarkers() {
    for (let i = 0; i < markersList.length; i++) {
        markersList[i].setMap(null); 
    }
    markersList = []; 
  }

function fetchCoordinates() {
    showLoading();
    if (imeiList) {
        const bounds = new google.maps.LatLngBounds();  
        var circleCenter = boundingCircle.getCenter();
        bounds.extend(circleCenter);
        const fetchPromises = imeiList.map(async imei => {
            return fetch('/checkedCoordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imei: imei, schoolCode: schoolCode })
            })
            .then(response => {
              if(response.ok)
                return response.json();
              else
                throw new Error(`HTTP error! Status: ${response.status}`);
            })
            .then(data => {
                if (data.lat && data.lng) {
                    const position = { lat: data.lat, lng: data.lng };
                    var dataset= { lastPos: position, currPos: position}

                    markersList.push(marker);
                    markerMap.set(imei, dataset);
                    bounds.extend(position);  
                }
            })
            .catch(error => {
                if(String(error).includes("Status: 401")) {
                  createToast({
                    type: "warning",
                    headline: "Kawach ID Error!",
                    text: `The KawachID ${imei} you entered is not allocated to your school.`
                  });
                } 
                else if (String(error).includes("Status: 404")) {  // KawachID not found at all
                  createToast({
                    type: "error",
                    headline: "Kawach ID Error!",
                    text: `The KawachID ${imei} doesn't exist.`
                  });
                }
            });
        });

        Promise.all(fetchPromises).then(() => {
            map.fitBounds(bounds);
            for (let [imei, dataset] of markerMap) {
                var marker = new google.maps.Marker({
                    position: dataset.currPos,
                    map: map,
                    title: `KawachID: ${imei}`  
                });
                markersList.push(marker);
            }
            hideLoading();
        });
        console.log(markerMap);
        
    }
}

function relaodMap() {
    if (imeiList) {
        // const bounds = new google.maps.LatLngBounds();  
        var circleCenter = boundingCircle.getCenter();
        // bounds.extend(circleCenter);
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
                
                if (data.lat && data.lng) {
                    const position = { lat: data.lat, lng: data.lng };
                    const tt= markerMap.get(imei);
                    markerMap.set(imei, {lastPos: tt.currPos, currPos: position});
                    // bounds.extend(position);  
                } else {
                    // console.error("No coordinates data received.");
                }
            })
            .catch(error => {
                console.error('Error fetching coordinates:', error);
            });
        });

        Promise.all(fetchPromises).then(() => {
            clearMarkers();
            // if (!schoolMarker) {
                schoolMarker = new google.maps.Marker({
                    position: schoolCentre,
                    map: map,
                    title: schoolName,
                    icon: schoolMarkerIcon
                });
            // }
            for (let [imei, dataset] of markerMap) {
                var markerHere = new google.maps.Marker({
                    position: dataset.lastPos,
                    map: map,
                    title: `KawachID: ${imei}`  
                });
                markersList.push(markerHere);
                const startLocation = new google.maps.LatLng(dataset.lastPos.lat, dataset.lastPos.lng);
                const endLocation = new google.maps.LatLng(dataset.currPos.lat, dataset.lastPos.lng);
                const duration = 5000;
                animateMarker(markerHere, startLocation, endLocation, duration);
                console.log(`Moving ${imei}`);
                
            }
            // map.fitBounds(bounds);
            // for (let key of markerMap.keys()) {
            //     const startLocation = key.lastPos;
            //     const endLocation = key.currPos;
            //     const duration = 5000;
            //     animateMarker(key.marker, startLocation, endLocation, duration);
            // }
        });
    }
}

function startPolling() {
    // Poll the server every 10 seconds
    setInterval(relaodMap, 10000);
}

document.addEventListener('DOMContentLoaded', async () => {
    
    await initMap();
    let startedPoll= false;
    document.getElementById('updateMap').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission
        const inputElements = document.querySelectorAll('input[name="imei"]');
        // const imeiList = [];
        imeiList= [];
        // todo     CHANGE WHERE REQUIRED: IMEI LIST EMPTY ALREADY.
        // todo     CHANGE WHERE REQUIRED: OUT OF AUKAAT SCHOOL ENTERED.

        // Iterate over each input element and get its value
        inputElements.forEach(input => {
            if (input.value.trim() !== "") {  // Check if the input is not empty or null
                imeiList.push(input.value);
            }
        });
        const data = JSON.stringify({ imeiList });
        resetMap();
        if(imeiList.length > 0)
            fetchCoordinates();
        else {
          createToast({
            type: "success",
            headline: "Kawach ID List Empty!",
            text: `Kindly enter atleast 1 KawachID to start tracking.`
          });
          initMap();
        }
        
        if(!startedPoll) {
            startedPoll= true;
            startPolling();
        }
        
    });
});

function animateMarker(marker, startLocation, endLocation, duration) {
    let startTime = null;

    // Linear interpolation between start and end locations
    function lerp(start, end, t) {
        return start + (end - start) * t;
    }

    // The animation function
    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / duration, 1); // Ensure progress doesn't go beyond 1

        // Calculate the new latitude and longitude for the marker
        const newLat = lerp(startLocation.lat(), endLocation.lat(), progress);
        const newLng = lerp(startLocation.lng(), endLocation.lng(), progress);

        const newPosition = new google.maps.LatLng(newLat, newLng);
        marker.setPosition(newPosition); // Update the marker's position on the map

        if (progress < 1) {
            // Continue animating if progress hasn't reached 1 (100%)
            requestAnimationFrame(animationStep);
        }
    }

    // Start the animation
    requestAnimationFrame(animationStep);
}


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



// ============= TOAST =================

const buttons = document.querySelectorAll(".button");
const container = document.querySelector(".tcontainer");

const toastOptions = {
	info: {
		headline: "Toast Tidbit!",
		text: "Your profile update is in the toaster. It’ll pop out in 24 hours!"
	},
	success: {
		headline: "Toast-tastic!",
		text: "Your changes are saved! Time to butter up that success."
	},
	error: {
		headline: "Burnt Toast!",
		text: "Something went wrong! Try again later before it gets crispy."
	},
	warning: {
		headline: "Crumbs Alert!",
		text: "Looks like you missed a spot. Fill in all the fields, or it’s toast!"
	}
};

container.addEventListener("click", (e) => {
	if (!e.target.closest(".notification__close")) return;
	e.target.closest(".notification").remove();
});

function createToast({ type = "regular", headline = "", text = "" }) {
	const html = `
<div class="notification --${type}">
	<div class="notification__icon"><img src= "/views/shico.ico" width="35px" style="margin-top: 10px; margin-right: 20px;"></img></div>
	<div class="notification__content">
		<h3 class="notification__headline">${
			headline ? headline : toastOptions[type].headline
		}</h3>
		<p class="notification__text">${text ? text : toastOptions[type].text}</p>
	</div>
	<button class="notification__close"></button>
</div>
`;
	container.insertAdjacentHTML("beforeend", html);

	const toast = container.lastElementChild;

  const tune = document.getElementById('tune');
  tune.currentTime = 0;
  tune.play();

	toast.addEventListener("animationend", () => toast.remove());
}
