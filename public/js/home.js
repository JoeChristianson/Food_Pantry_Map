// Initialize and add the map

const initMap = async (query) => {
  let currentLocation = await getCoords();
  currentLocation?console.log(currentLocation):currentLocation = {lat:44.971829446,long: -93.233832398}

    const center = { lat: currentLocation.lat, lng: currentLocation.long };
    // const uOfMN = {lat: 44.971829446, lng: -93.233832398}
    // The map, centered at Minneapolis
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: center,
    });
      const foodStops = []
      let response;
        response = await fetch(`api/pantry/search/${query}/${currentLocation.lat}/${currentLocation.long}`)

      const data = await response.json()
      console.log(data)
      for (var i = 0; i < data.length; i++){
      const position = {
      lat: data[i].latitude,
      lng: data[i].longitude
      }
      const needsList = listNeeds(data[i].requests)
      const title = '<h5 id = "pantry">' + data[i].pantry_name + "</h5>"
      const address = '<h6 id = "address">' + data[i].street_address + "</h6>"
      const needs = '<div id ="content">' + "This location is currently in need of: " + "</div>"  + '<h6 id = "product">' +
                    needsList + "</h6>"
      var stopContent = [position, title, address, needs]
      // console.log(stopContent)
      foodStops.push(stopContent);
      }



  

    // const foodStops = [
    //   [{ lat: 44.971829446, lng: -93.233832398 }, "UofM", '<div id="content">' +
    //   '<div id="siteNotice">' +
    //   "</div>" +
    //   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    //   '<div id="bodyContent">' +
    //   "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    //   "sandstone rock formation in the southern part of the " +
    //   "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    //   "south west of the nearest large town, Alice Springs; 450&#160;km " +
    //   "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    //   "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    //   "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    //   "Aboriginal people of the area. It has many springs, waterholes, " +
    //   "rock caves and ancient paintings. Uluru is listed as a World " +
    //   "Heritage Site.</p>" +
    //   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    //   "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    //   "(last visited June 22, 2009).</p>" +
    //   "</div>" +
    //   "</div>"],
    //   [{ lat: 44.9725278, lng: -93.2620452 }, "HCMC", "pans, utensils, ointments"],
    //   // [{ lat: 34.832149, lng: -111.7695277 }, "Chapel of the Holy Cross"],
    //   // [{ lat: 34.823736, lng: -111.8001857 }, "Red Rock Crossing"],
    //   // [{ lat: 34.800326, lng: -111.7665047 }, "Bell Rock"],
    // ];
    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();
  
    // Create the markers.
    foodStops.forEach(([position, title, address, needs], i) => {
      const marker = new google.maps.Marker({
        position,
        map,
        title: `${title} ${address} ${needs}`,
         
        // label: `${i + 1}`,
        optimized: false,
        id: 1,
  
      });
  
      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        // infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });
    });
  // }
  
//   In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
// const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let labelIndex = 0;

// function initMap() {
//   const minneapolis = { lat: 44.986656, lng: -93.258133 };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 12,
//     center: minneapolis,
//   });

//   // This event listener calls addMarker() when the map is clicked.
//   google.maps.event.addListener(map, "click", (event) => {
//     addMarker(event.latLng, map);
//   });
//   // Add a marker at the center of the map.
//   addMarker(minneapolis, map);

// }

// // Adds a marker to the map.
// function addMarker(location, map) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   new google.maps.Marker({
//     position: location,
//     label: labels[labelIndex++ % labels.length],
//     map: map,
//   });
  
}



// const setUpPlaces = async () => {
//   const response = await fetch('api/pantry/all');
      
//   const data = await response.json()
  

//   for (var i = 0; i < foodStops.length; i++){
//     const position = {
//       latitude: "lat:" + data[i].latitude,
//       longitude: "lng:" + data[i].longitude
//     }
//     const title = data[i].pantry_name
//     const needs = data[i].product_name
//     var stopContent = [position, title, needs]
//     foodStops.push(stopContent);
//     console.log(foodStops)
//   }
// }


initMap();

const listNeeds = (list) => {
  const needsArray = list.map(need => `<br> ${need.product_name}: ${need.amount} `)
  return needsArray;
}

document.querySelector("#searchBtn").addEventListener("click",(event)=>{
  const searchTerm = document.querySelector("#searchBar").value
  initMap(searchTerm)
})

function changeToRedColor(){
  document.getElementById("searchBtn").style.backgroundColor = "red";
}
function changeToBlueColor(){
  document.getElementById("searchBtn").style.backgroundColor = "blue";
}

async function getCoords(){
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    long: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};