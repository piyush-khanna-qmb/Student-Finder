var map;
let marker;
var imeiList= [];
var boundingCircle;
let currentInfoWindow = null;
let currentMarker = null;
currentInfoBut= null;
var schoolRad, schoolCentre;
var schoolMarkerIcon;
var lastZoom, lastCenter;

// const toggleButton = document.getElementById('toggleButton');
const listContainer = document.getElementById('listContainer');
let isOn = false;

var markersArray= [];
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

window.onload= initMap;

function showLoading() {
  document.getElementById('overlay-container').style.display = 'block';
}

function hideLoading() {
  document.getElementById('overlay-container').style.display = 'none';
}

async function initMap() {
    // Initialize the map centered at some default location
    showLoading();

    // toggleButton.addEventListener('click', () => {
    //   isOn = !isOn;
      
    //   toggleButton.classList.toggle('on', isOn);
    //   if (isOn) {
    //       listContainer.classList.remove('hidden');
    //   } else {
    //       listContainer.classList.add('hidden');
    //   }
    // });

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: {lat: 28.615816, lng: 77.3748894},
      styles: nightStyle,
      
    });
    
    schoolMarkerIcon = {
      url: 'https://cdn4.iconfinder.com/data/icons/location-and-map-flat-1/512/locationandmap_school-education-location-map-marker-512.png', 
      scaledSize: new google.maps.Size(50, 50) // Scale the marker size (optional)
    };
    await fetch(`http://49.50.119.238:3000/api/Admin/GetSchoolDataByCode/${schoolCode}`, {
      method: 'GET',
      headers: { 'Accept': '*/*' }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
    })
    .then(async data => {
        // console.log(JSON.parse(data.position));
        schoolCentre= JSON.parse(data.position);
        schoolRad= data.radius;

        marker = new google.maps.Marker({
            position:schoolCentre,
            map: map,
            title: data.schoolName,
            icon: schoolMarkerIcon
        });
        boundingCircle = new google.maps.Circle({
            map: map, 
            center: schoolCentre,
            radius: data.radius, 
            strokeColor: "#c39d2c", 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
            fillColor: "#d7b82d",
            fillOpacity: 0.35, 
        });
        await placeMarkers(true);
        hideLoading();

        setInterval(() => {          
          placeMarkers(false);  // No autobound
        }, 20000);
    })
    .catch(error => console.error('Failed to fetch school code:', error));
    
}

function clearMarkers() {
  for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null); 
  }
  markersArray = []; 
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
    const url = `http://49.50.119.238:3000/api/Admin/GetSchoolDataByCode/${schoolCode}`;
  
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    schoolId1 = data.schoolId;
  } catch (error) {
    console.error('Failed to fetch school data:', error);
    throw error;
  }

  const response = await fetch(`http://49.50.119.238:3000/api/Admin/GetAllStudentInfoData/${schoolId1}`);
  return await response.json();
}

// Updated function to get locations for multiple students at once
async function getLocationsInBulk(students) {
  const kawachIDs = students.map(student => student.kawachId);
  
  const response = await fetch('/internal/api/v1/getCoordinatesInBundle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ kawachID: kawachIDs })
  });
  
  const data = await response.json();
  return data.returnBundle;
}

var items= []; 
function renderList(items) {
  listContainer.innerHTML = ''; // Clear previous content

  if (items.length === 0) {
      // Show default message when no items are in the list
      const message = document.createElement('div');
      message.className = 'empty-message';
      message.textContent = "Everything's good!";
      listContainer.appendChild(message);
  } else {
      items.forEach(item => {
          const listItem = document.createElement('div');
          listItem.textContent = item;
          listContainer.appendChild(listItem);
      });
  }
}

async function getStudentByKawachID(kawachID) {
  try {
      const response = await fetch(`http://49.50.119.238:3000/api/Admin/getStudentByKawachID/${kawachID}`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching student details:', error);
      throw error;
  }
}

async function updatePopupWithImage(marker, kawachID) {
  try {
    
      const imageContainer = document.getElementById(`student-image-${kawachID}`);
      if (!imageContainer) {
          console.error('Image container not found');
          return;
      }

      const existingImage = imageContainer.querySelector('img');
      if (existingImage && existingImage.src.includes('pngtree')) { // Check if it's still the placeholder
          const studentDetails = await getStudentByKawachID(kawachID);
          console.log("Mil gya: ", studentDetails);
          
          if (studentDetails.imageUrl) {
              existingImage.src = studentDetails.imageUrl;
              existingImage.onerror = function() {
                  existingImage.src = "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png";
              };
          }
      }
      else {
        console.log("Already photo lagi hai");
      }
  } catch (error) {
      console.error('Error loading student image:', error);
  }
}

async function placeMarkers(shouldBound) {

  const loadingSpinnerHtml = `
        <div class="loading-spinner" style="
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 10px auto;
        ">
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    let safeKidsCount= 0, unsafeKidsCount= 0;

    const bounds = new google.maps.LatLngBounds(); 
    var circleCenter = boundingCircle.getCenter();
    var circleRadius = boundingCircle.getRadius();
    if(shouldBound) {
      bounds.extend(circleCenter);
    }

    const safeChildIcon= {
        url: 'https://static.vecteezy.com/system/resources/previews/023/652/060/original/green-map-pointer-icon-on-a-transparent-background-free-png.png', 
        scaledSize: new google.maps.Size(50, 50) // marker size bancho
    };
    const unsafeChildIcon= {
        url: 'https://cdn-icons-png.flaticon.com/512/7334/7334593.png', 
        scaledSize: new google.maps.Size(40, 40) 
    };
    try {
        // Get all students
        const students = await getStudentsData1();
        
        // Get locations for all students in one request
        const locations = await getLocationsInBulk(students);
        
        // Combine student data with their locations
        const dataObjectList = students.map((student, index) => ({
          ...student,
          position: locations[index].position
        }));
        
        if(!currentInfoWindow) {
          // console.log("Nothing's open");
          clearMarkers();
        } else {
          // console.log("SOmething open. Not re-rendering");
        }
        dataObjectList.forEach(function(data) {
          // // console.log(`Data print karwa re: ${data} \n`);
          if(data.position.lat == "0.0") { 
            if(isOn) {
              // show list of unassigned IDs
              // console.log(`Ye pakda gaya: ${data.kawachId}`); 
              renderList();             
              }
          }
          else {
            const isSafe= isInsideCircle(data.position, schoolCentre, schoolRad);
            if(isSafe)
                safeKidsCount++;
            else
                unsafeKidsCount++;
            var marker = new google.maps.Marker({
                position: data.position,
                map: map,
                title: data.kawachId,
                icon: isSafe ? safeChildIcon : unsafeChildIcon,
            });
            markersArray.push(marker);
            if(shouldBound)
              bounds.extend(data.position);
  
            const finalDataImg = data.imageUrl ? data.imageUrl : "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png";
            const studentsClass= data.className.replace(/^class/i, '');
            const createPopupContent = (imageUrl, isLoading = false) => `
            <table class="mainTable">
                <tr>
                    <td>
                        <div id="student-image-${data.kawachId}" class="custom-popup ${isSafe ? 'safeKid' : 'unsafeKid'}">
                            <button class="infoBut"><i class="fa-solid fa-info"></i></button>
                            ${isLoading ? loadingSpinnerHtml : `<img src="${imageUrl}" alt="Student Photo" class="student-photo"/>`}
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
              content: createPopupContent("https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png", true)
          });

          marker.addListener('click', async function () {
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

                  // Open info window with loading spinner
                  infoWindow.open(map, marker);
                  currentInfoWindow = infoWindow;
                  currentMarker = marker;

                  try {
                      // Fetch student details while showing loading spinner
                      const studentDetails = await getStudentByKawachID(data.kawachId);
                      const imageUrl = studentDetails.imageUrl || "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png";
                      
                      // Update content with actual image
                      infoWindow.setContent(createPopupContent(imageUrl, false));

                      // Reattach event listeners after content update
                      google.maps.event.addListenerOnce(infoWindow, 'domready', function() {
                          const infoButton = document.querySelector('.infoBut');
                          const excessInfoDiv = document.querySelector('.excessInfo');

                          if (infoButton && excessInfoDiv) {
                              infoButton.addEventListener('click', function() {
                                  if (excessInfoDiv.style.display == "block") {
                                      excessInfoDiv.style.display = "none";
                                      if (currentInfoWindow) {
                                          google.maps.event.clearListeners(currentInfoWindow, 'domready');
                                          currentInfoWindow.close();
                                          currentInfoWindow = null;
                                          currentMarker = null;
                                      }
                                  } else {
                                      excessInfoDiv.style.display = "block";
                                  }
                                  currentInfoBut = infoButton;
                              });
                          }
                      });
                  } catch (error) {
                      console.error('Error loading student image:', error);
                      infoWindow.setContent(createPopupContent("https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png", false));
                  }

                  google.maps.event.addListener(infoWindow, 'closeclick', function() {
                      currentInfoWindow = null;
                      currentMarker = null;
                  });
              }
          });
        }
        if(shouldBound)
          map.fitBounds(bounds); 
    });

      // console.log(`Safe Kids: ${safeKidsCount}\nUnsafe Kids: ${unsafeKidsCount}`);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const slider = document.getElementById("distanceSlider");
const display = document.getElementById("sliderValue");

function handleSliderChange(event) {
    const value = event.target.value;
    display.textContent = value;
    
    // Update slider background based on value
    const percentage = (value / 4000) * 100;
    slider.style.background = `linear-gradient(to right, 
        var(--highlight-green) 0%, 
        var(--highlight-green) ${percentage}%, 
        var(--light-military-green) ${percentage}%, 
        var(--light-military-green) 100%)`;
    
    updateDistance(value);
}

function updateDistance(distance) {
    console.log(`Distance changed to: ${distance} meters`);
    // Add your custom logic here
}

slider.addEventListener('input', handleSliderChange);

// Initialize slider background
handleSliderChange({ target: { value: slider.value } });