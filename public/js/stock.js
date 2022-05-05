const pantryPage = $(".pantry_page");
const closedReqTitle = document.querySelector(".closed_requests")
const closedReq = document.querySelector("#closed_requests");
const addedMessage = document.querySelector(".isAddedMessage");
const isActive = document.querySelector(".isActivated");
const activateReq = $("#closed_requests");
var timer;

const getClosedReq = async ()=>{
    // addedMessage.innerHTML = '';
    activateReq.children('li').remove();
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
    listItem.innerHTML = `<div class="closedReqItem"><span class = "reqPadding">Item: ${reqItem.product_name} - Requested Quantity: ${reqItem.amount}</span> <button data-id=${reqItem.id} class="activate activate-btn" type= "submit"> Activate </button></div>`;
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
        isActive.innerHTML = 'Successfully activated request item.'
        getClosedReq();
        startTimer();
      } else {
        console.log(response)
       //add span to show request not activated
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
            addedMessage.innerHTML = `Successfully added the following request: Item - ${productName}, Amount - ${amount}.`;
            document.querySelector('#item_name').value = '';
            document.querySelector('#amount').value = '';
            startTimer();
        } else {
            addedMessage.innerHTML = "Failed to create request.";
            startTimer();
        }
    }else{
        addedMessage.innerHTML = "Failed to create request. Verify both fields are filled in.";
        startTimer();
    }
}

const startTimer = () => {
    let timerCount = 3;
    clearInterval(timer);
    timer = setInterval(function(){
        timerCount --;
        console.log(timerCount);
        if (timerCount <= 0){
            addedMessage.innerHTML = '';
            isActive.innerHTML = '';
            clearInterval(timer);
        }
    }, 1000);
}

pantryPage.on("click", function(){
    document.location.replace('/pantry')
});

activateReq.on("click", ".activate", activateRequest);
document.querySelector('.request-form').addEventListener('submit', createRequest); 
getClosedReq();