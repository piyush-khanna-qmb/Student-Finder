var map;
let marker;

var imeiList= [];
var schoolMarker;
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
    scaledSize: new google.maps.Size(50, 50) // Scale the marker size (optional)
};

var markerMap= new Map();
var markersList= [];

function showLoading() {
    // document.getElementById('overlay-container').style.display = 'block';
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
        // styles: lightTheme
      });
    await fetch(`https://kawachapidev-dzdhebhvdqa6fyek.canadacentral-01.azurewebsites.net/api/Admin/GetSchoolDataByCode/${schoolCode}`, {
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
            strokeColor: "#c39d2c", 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
            fillColor: "#d7b82d",
            fillOpacity: 0.35, 
        });
        hideLoading();
    })
    .catch(error => {
        console.error('Failed to fetch school code:', error);
        console.log("Uncomment lines beneath to initiate with default data:");

        // schoolCentre= { lat: 28.6158816212149, lng: 77.3748894152614 };
        // schoolRad= 1000;
        // schoolName= "Manojava Software";

        // marker = new google.maps.Marker({
        //     position:{ lat: 28.6158816212149, lng: 77.3748894152614 },
        //     map: map,
        //     title: `${schoolName}`,
        //     icon: schoolMarkerIcon
        // });
        // boundingCircle = new google.maps.Circle({
        //     map: map,
        //     // center: { lat: 28.6158816212149, lng: 77.3748894152614 }, 
        //     center: { lat: 28.6158816212149, lng: 77.3748894152614 },
        //     radius: schoolRad, 
        //     strokeColor: "#c39d2c", 
        //     strokeOpacity: 0.8, 
        //     strokeWeight: 2, 
        //     fillColor: "#d7b82d",
        //     fillOpacity: 0.35, 
        // });
        // toastsFactory.createToast({
        //     type: "error",
        //     icon: "exclamation-triangle",
        //     message: "Angular Server Not Up",
        //     duration: 5000
        //   })
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
                console.log("Data: ", data);
                
                if (data.lat && data.lng) {
                    const position = { lat: data.lat, lng: data.lng };
                    var dataset= { lastPos: position, currPos: position}

                    markersList.push(marker);
                    markerMap.set(imei, dataset);
                    bounds.extend(position);  
                } else {
                    if(String(data.error) == ("Trying to access kawachID of another school")) {
                      // console.error("", data);
                      toastsFactory.createToast({
                        type: "warning",
                        icon: "info-circle",
                        message: `KawachID ${imei} Is Not Allocated To Your School!`,
                        duration: 5000
                      })
                    } 
                    else {  // KawachID not found at all
                      // console.error("", data);
                      toastsFactory.createToast({
                        type: "error",
                        icon: "info-circle",
                        message: `Kawach ID ${imei} Doesn't Exist!`,
                        duration: 5000
                      })
                    }
                }
            })
            .catch(error => {
                console.error('Internal server error. Angular server down');
            });
        });

        Promise.all(fetchPromises).then(() => {
            map.fitBounds(bounds);
            for (let [imei, dataset] of markerMap) {
                var marker = new google.maps.Marker({
                    position: dataset.currPos,
                    map: map,
                    // title: `IMEI: ${data.lat}`
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
            return fetch('/coordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imei: imei, schoolCode: schoolCode })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data: ", data);
                
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
        // console.log(data);
        resetMap();
        if(imeiList.length > 0)
            fetchCoordinates();
        else {
          toastsFactory.createToast({
            type: "success",
            icon: "info-circle",
            message: `Kindly Enter Atleast 1 KawachID to Start Tracking!`,
            duration: 5000
          })
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


class SwipeHandler {
    getSwipeDirection({ touchstartX, touchstartY, touchendX, touchendY }) {
      const delx = touchendX - touchstartX
      const dely = touchendY - touchstartY
  
      if (Math.abs(delx) > Math.abs(dely)) {
        return delx > 0 ? "right" : "left"
      }
      if (Math.abs(delx) < Math.abs(dely)) {
        return dely > 0 ? "down" : "up"
      }
  
      return "tap"
    }
  }
  
  const svgIcons = [
    {
      name: "check-circle",
      svg: `
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
          <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/>
        </svg>
      `
    },
    {
      name: "info-circle",
      svg: `
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
          <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/>
        </svg>
      `
    },
    {
      name: "exclamation-circle",
      svg: `
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
          <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'/>
        </svg>
      `
    },
    {
      name: "exclamation-triangle",
      svg: `
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
          <path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'/>
        </svg>
      `
    },
    {
      name: "x-lg",
      svg: `
        <svg xmlns='http://www.w3.org/2000/svg' class='t-close' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
          <path d='M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z'/>
        </svg>
      `
    }
  ]
  
  class ToastsFactory {
    constructor(swipeHandler) {
      this.swipeHandler = swipeHandler
      this.createToastsContainer()
      // below line enable toasts creation from buttons; can be removed if useless
      this.createToastsFromButtons()
    }
  
    createToastsContainer() {
      const toastsContainer = document.createElement("div")
      toastsContainer.classList.add("toasts-container")
      this.toastsContainer = toastsContainer
      document.body.appendChild(toastsContainer)
    }
  
    createToastsFromButtons() {
      document.addEventListener(
        "click",
        e => {
          // check is the right element clicked
          if (!e.target.matches(".btn-toas")) return
  
          const dataset = e.target.dataset
          const config = {
            type: dataset.type,
            icon: dataset.icon,
            message: dataset.message,
            duration: dataset.duration
              ? parseInt(dataset.duration, 10)
              : undefined
          }
          this.createToast(config)
        },
        false
      )
    }
  
    createToast({ type, icon, message, duration }) {
      const toast = this.createToastContainer(type)
      this.addToastElement(
        toast,
        "t-icon",
        svgIcons.find(item => item.name === icon).svg
      )
      this.addToastElement(toast, "t-message", message)
      this.addCloseButton(toast)
      const progressBar = this.getProgressBar(duration)
      progressBar && toast.appendChild(progressBar)
  
      // toasts can be closed on right swipe, comment this line if it's useless in your case
      this.observeSwipe(toast, "right")
  
      this.toastsContainer.appendChild(toast)
  
      // if duration is 0, toast message will not be closed automatically
      if (!progressBar) return
  
      progressBar.onanimationend = () => this.removeToast(toast)
    }
  
    createToastContainer(type) {
      const toast = document.createElement("div")
      toast.classList.add("toast", type, "active")
      return toast
    }
  
    addToastElement(toast, className, content) {
      const element = document.createElement("div")
      element.classList.add(className)
      element.innerHTML = content
      toast.appendChild(element)
      return element
    }
  
    addCloseButton(toast) {
      const closeButton = this.addToastElement(
        toast,
        "t-close",
        svgIcons.find(icon => icon.name === "x-lg").svg
      )
      closeButton.onclick = () => this.removeToast(toast)
    }
  
    getProgressBar(duration) {
      // duration is infinite => no progress bar
      if (duration === 0) return
  
      const progressBar = document.createElement("div")
      progressBar.classList.add("t-progress-bar")
      duration &&
        progressBar.style.setProperty("--toast-duration", `${duration}ms`)
      return progressBar
    }
  
    removeToast(toast) {
      toast.classList.remove("active")
      // we wait for the end of the animation to remove the element from the DOM
      toast.onanimationend = evt => {
        // needed to filter progressBar animation
        evt.target === toast && toast.remove()
      }
    }
  
    observeSwipe(toast, direction) {
      let touchstartX = 0,
        touchstartY = 0,
        touchendX = 0,
        touchendY = 0
  
      toast.addEventListener(
        "touchstart",
        event => {
          // needed to avoid weird behavior on swipe
          window.document.body.style.overflow = "hidden"
          touchstartX = event.changedTouches[0].screenX
          touchstartY = event.changedTouches[0].screenY
        },
        { passive: true }
      )
  
      toast.addEventListener(
        "touchend",
        event => {
          window.document.body.style.overflow = "unset"
          touchendX = event.changedTouches[0].screenX
          touchendY = event.changedTouches[0].screenY
          const swipeConfig = {
            touchstartX,
            touchstartY,
            touchendX,
            touchendY
          }
  
          this.swipeHandler.getSwipeDirection(swipeConfig) === direction &&
            this.removeToast(toast)
        },
        { passive: true }
      )
    }
  }
  
  const swipeHandler = new SwipeHandler()
  const toastsFactory = new ToastsFactory(swipeHandler)
  