const pName = document.querySelector("#name")
const address = document.querySelector("#address")
const city = document.querySelector("#city")
const pantryReq = document.querySelector("#pantry_requests")
const pantryReqEdit = $("#pantry_requests");

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
    pName.innerHTML = data['pantry_name'];
    address.innerHTML = data['street_address'];
    city.innerHTML = data['city'];
    data.requests.forEach(element => {
        
        addItem(element);
    });
}

const addItem = (reqItem) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Item: ${reqItem.product_name} - Requested Quantity:  <input type="text" id="amount-${reqItem.id}" name="request_amount" placeholder= "${reqItem.amount}"> <button data-id = ${reqItem.id} class="update" type ="submit"> Update </button> <button class="delete" type= "submit"> Delete </button>`;
    pantryReq.append(listItem);
} 


const updateRequest = async (event) => {
    const dataID = $(event.target).attr("data-id");
    const newAmount = document.querySelector(`#amount-${dataID}`).value.trim();
    const response = await fetch(`api/request/${dataID}`,{
        method: 'PUT',
        body: JSON.stringify({amount: newAmount}),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        showUpdatedReq(dataID)
    }else{
        console.log("could not update");
    }
}

const showUpdatedReq = async (reqID) => {
    const response = await fetch('api/pantry');
    const data = await response.json();
    data.requests.forEach(element => {
        if (element.id == reqID){
            const amount = document.querySelector(`#amount-${reqID}`)
            amount.placeholder = element.amount;
            amount.value = '';
        }
    });
}

pantryReqEdit.on("click", ".update", updateRequest);
