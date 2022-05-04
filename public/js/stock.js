const pantryPage = $(".pantry_page");
const pName = document.querySelector("#name");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const closedReqTitle = document.querySelector(".closed_requests")
const closedReq = document.querySelector("#closed_requests");
const activateReq = $("#closed_requests")
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
    
    getClosedReq();
}

const getClosedReq = async ()=>{
    const response = await fetch('api/request/closed');
    //console.log(response)
    const data = await response.json()
    console.log(data)
    if(!data[0]){
        closedReqTitle.innerHTML = "No closed requests for this pantry."
    }else{
        closedReqTitle.innerHTML = "Closed Request List: ";
        data.forEach(element => {
        
        showItem(element);
    });
    }
}

const showItem = (reqItem) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Item: ${reqItem.product_name} - Requested Quantity: ${reqItem.amount} <button data-id=${reqItem.id} class="activate" type= "submit"> Activate </button>`;
    closedReq.append(listItem);
}

const activateRequest = async (event) =>{
    event.preventDefault();
    const reqID = $(event.target).attr("data-id");
    const response = await fetch(`api/request/${reqID}`,{
        method: 'PUT',
        body: JSON.stringify({open: true}),
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

const createRequest = async (event) => {
    event.preventDefault();

    const productName = document.querySelector('#item_name').value.trim();
    const amount = document.querySelector('#amount').value.trim();
        console.log(`${productName}, ${amount}`);
    if (productName && amount){
        const response = await fetch('/api/request', {
            method: 'POST',
            body: JSON.stringify({ productName, amount }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            console.log(response)
            alert('Request Successfully Created');
          } else {
            alert('Failed to create request');
          }
        }
    }


pantryPage.on("click", function(){
    //console.log("next page");
    document.location.replace('/pantry')
});

activateReq.on("click", ".activate", activateRequest);
document.querySelector('.request-form').addEventListener('submit', createRequest); 