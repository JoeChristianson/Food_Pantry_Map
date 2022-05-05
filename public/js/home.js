var image = "https://img.icons8.com/officexs/32/cherry.png";
const list = $("#pantry-list")

// Initialize and add the map

const initMap = async (query) => {
  let currentLocation = await getCoords();
  currentLocation?console.log(currentLocation):currentLocation = {lat:44.971829446,long: -93.233832398}

    const center = { lat: currentLocation.lat, lng: currentLocation.long };

    // The map, centered at user location.
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: center,
    });
      const foodStops = [];
      if (!query){
        query="all"
      }
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
      var stopContent = [position, title, address, needs,data[i].distance]

      foodStops.push(stopContent);
      }

    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();


    // Create the markers.
    
    foodStops.forEach(([position, title, address, needs,distance], i) => {
      const marker = new google.maps.Marker({
        position,
        map,
        title: `${title} ${address} ${needs}`,
         
        // label: `${i + 1}`,
        optimized: false,
        
        icon: image

        
      });
  
      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        // infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });

      const listItem = $("<div>");
      listItem.addClass("card")
      listItem.addClass("list-card")
      listItem.html(`<h3>${title} </h3>
      <h5>${Math.round(distance*10)/10} miles</h5>
      <h5>${address}</h5>
      <p>${needs}</p>`);
      list.append(listItem)
    });


  
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

function changeToOrangeColor(){
  document.getElementById("searchBtn").style.backgroundColor = "orange";
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

