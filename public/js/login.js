const regForm = $(".register-form");
let checker;

regForm.on('submit',(e)=>{
  e.preventDefault();
  console.log("working")
  signupFormHandler()
})

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response)
        document.location.replace('/pantry');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  const signupFormHandler = async () => {
    const username = document.querySelector('#username-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    const pantryName = document.querySelector("#pantry-name-register").value.trim();
    const pantryAddress = document.querySelector("#pantry-address-register").value.trim();
    const pantryCity = document.querySelector("#pantry-city-register").value.trim();
    const pantryPhone = document.querySelector("#pantry-phone-register").value.trim();
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pantryAddress},+${pantryCity}&key=AIzaSyCD4adZgZWDQxIUdGKvJcB8ArE42C-wegE`);
    const result = await response.json()
    checker = result;
    console.log(result)
    const pantryLatitude = result.results[0].geometry.location.lat;
    const pantryLongitude = result.results[0].geometry.location.lng;
    console.log(pantryLatitude)
    if (username && email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ userName:username, email, password,pantry_name:pantryName,street_address:pantryAddress,city:pantryCity,latitude:pantryLatitude,longitude:pantryLongitude,contact_phone:pantryPhone }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response.body)
        location.reload();
        // document.location.replace('/a');
      } else {
        console.log(response)
        alert('Failed to sign up.');
      }
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler); 