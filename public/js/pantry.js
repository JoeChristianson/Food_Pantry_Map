const pName = document.querySelector("#name")
const address = document.querySelector("#address")
const city = document.querySelector("#city")
const pantryReq = document.querySelector("#pantry_requests")


const getPantryData = async ()=>{
    const response = await fetch('api/pantry');
    console.log(response)
    const data = await response.json()
    console.log(data)
    console.log(data.requests[0].product_name);
    populateInfo(data)
}

getPantryData()

const populateInfo = (data)=>{
    // var item = 
    pName.innerHTML = data['pantry_name'];
    address.innerHTML = data['street_address'];
    city.innerHTML = data['city']
}