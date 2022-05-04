const pName = document.querySelector("#name")
const address = document.querySelector("#address")
const city = document.querySelector("#city")
const reqListTitle = document.querySelector(".req_list")
const pantryReq = document.querySelector("#pantry_requests")
const pantryReqEdit = $("#pantry_requests");
const supplyPage = $(".supply_list");

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
    if(!data.requests[0]){
        reqListTitle.innerHTML = "No active request items for this pantry."
    }else{
        reqListTitle.innerHTML = "Requested Items: "
        data.requests.forEach(element => {
        
        addItem(element);
    });
    }
}

const addItem = (reqItem) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Item: ${reqItem.product_name} - Requested Quantity:  <input type="text" id="amount-${reqItem.id}" name="request_amount" placeholder= "${reqItem.amount}"> <button data-id = ${reqItem.id} class="update" type ="submit"> Update </button> <button data-id=${reqItem.id} class="delete" type= "submit"> Delete </button>`;
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

const removeRequest = async (event) => {
    const dataID = $(event.target).attr("data-id");
    const response = await fetch(`api/request/${dataID}`,{
        method: 'PUT',
        body: JSON.stringify({open: false}),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        console.log(response.body)
        location.reload();
      } else {
        console.log(response)
        alert('Failed to sign up.');
      }
}

pantryReqEdit.on("click", ".update", updateRequest);
pantryReqEdit.on("click", ".delete", removeRequest);
supplyPage.on("click", function(){
    console.log("next page");
    document.location.replace('/stocks')
} );