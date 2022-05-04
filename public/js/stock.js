const pantryPage = $(".pantry_page");
const pName = document.querySelector("#name")
const address = document.querySelector("#address")
const city = document.querySelector("#city")

const getPantryData = async ()=>{
    const response = await fetch('api/pantry');
    console.log(response)
    const data = await response.json()
    console.log(data)
    populateInfo(data)
}

getPantryData()

const populateInfo = (data)=>{
    pName.innerHTML = data['pantry_name'];
    address.innerHTML = data['street_address'];
    city.innerHTML = data['city'];
    // data.requests.forEach(element => {
        
    //     addItem(element);
    // });
}

pantryPage.on("click", function(){
    console.log("next page");
    document.location.replace('/pantry')
});