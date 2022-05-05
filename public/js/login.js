

const regForm = $(".register-form");

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
    const passwordConfirm = document.querySelector('#password-confirm').value.trim();
    console.log(passwordConfirm)
    const pantryName = document.querySelector("#pantry-name-register").value.trim();
    const pantryAddress = document.querySelector("#pantry-address-register").value.trim();
    const pantryCity = document.querySelector("#pantry-city-register").value.trim();
    const pantryPhone = document.querySelector("#pantry-phone-register").value.trim();
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pantryAddress},+${pantryCity}&key=AIzaSyBBdG5RsjMRgKRndDu3SAs1ri_ZtpDyx74`);
    const result = await response.json()
    if (!result.results[0]?.geometry){
      alert("Invalid Address and/or City");
      return
    }
    const pantryLatitude = result.results[0].geometry.location.lat;
    const pantryLongitude = result.results[0].geometry.location.lng;
    const fields = {username,email,password,pantryName,pantryAddress,pantryCity,pantryLatitude,pantryPhone,passwordConfirm};
    const check = validateInput(fields);
    console.log(pantryPhone)
    if (!check.valid){
      alert(check.message)
      return;
    }
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

function validateInput(fields){

  const check = {valid:false};
  if (fields.username.length<6){
    check.message = "User name must be six characters"
    return check;
  }
 
  if (fields.password!==fields.passwordConfirm){
    check.message = "Passwords do not match"
    return check;
  }
  if (!fields.email.includes("@")){
    check.message = "Must provide valid email"
    return check;
  }

  if (!fields.pantryLatitude){
    check.message = "Invalid Address and/or City provided"
    return check;
  }
  if (fields.pantryName == ""){
    check.message = "Pantry not provided"
    return check;
  }
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  console.log(fields.pantryPhone)
  if (!fields.pantryPhone.match(phoneno)){
    check.message = "Invalid Phone"
    return check;
  }
  else {
    check.valid = true;
    return check;
  }
}