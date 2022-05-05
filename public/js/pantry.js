const pName = document.querySelector("#name")
const address = document.querySelector("#address")
const city = document.querySelector("#city")
const reqListTitle = document.querySelector(".req_list")
const pantryReq = document.querySelector("#pantry_requests")
const editDelMessage = document.querySelector(".editDeleteMessage");
const pantryReqEdit = $("#pantry_requests");
const supplyPage = $(".supply_list");
var timer;

const getPantryData = async ()=>{
    pantryReqEdit.children('li').remove();
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
    listItem.innerHTML = `<div class = "requestItemList"><span class = "reqPadding" >Item: ${reqItem.product_name} - Requested Quantity:  <input type="text" id="amount-${reqItem.id}" name="request_amount" placeholder= "${reqItem.amount}"></span> <span><button data-id = ${reqItem.id} class="update update-btn" type ="submit"> Update </button> <button data-id=${reqItem.id} class="remove remove-btn" type= "submit"> Remove </button></span></div>`;
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
        editDelMessage.innerHTML = 'Requested amount successfully updated.';
        showUpdatedReq(dataID);
        startTimer();
    }else{
        editDelMessage.innerHTML = 'ERROR: cannot update when amount field is empty.'
        startTimer();
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
        editDelMessage.innerHTML = 'Request successfully removed.';
        getPantryData();
        startTimer();
      } else {
        console.log(response)
        alert('Failed to sign up.');
      }
}

const startTimer = () => {
    let timerCount = 3;
    clearInterval(timer);
    timer = setInterval(function(){
        timerCount --;
        console.log(timerCount);
        if (timerCount <= 0){
            editDelMessage.innerHTML = '';
            clearInterval(timer);
        }
    }, 1000);
}

pantryReqEdit.on("click", ".update", updateRequest);
pantryReqEdit.on("click", ".remove", removeRequest);
supplyPage.on("click", function(){
    console.log("next page");
    document.location.replace('/stocks')
} );