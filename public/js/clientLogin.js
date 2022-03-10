const protocol = window.location.protocol;
const host = window.location.host;

//const errorMessages = document.querySelector("#errorMessages");

//let errors;
//errorMessages.textContent.length > 0 ? errors = true : errors = false;


console.log(protocol,host)
const loginSubmitButton = document.querySelector("#loginSubmitButton");
const loginUser = document.querySelector("#loginUser");
const loginPass = document.querySelector("#loginPass");
const loginForm=document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
})
let err=document.getElementById('error')
loginSubmitButton.addEventListener("click", () => {
    fetch(`${protocol}//${host}/login`, {
        "method": 'POST',
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify({username: loginUser.value, password: loginPass.value})})
    .then(resp => {
        console.log(`Our res code is ${resp.status}`)
        if (resp.status == 200) { 
            err.innerHTML=""
            localStorage.setItem('username', loginUser.value);
            localStorage.setItem('password', loginPass.value);
            window.location.href="/"
        }
        else if(resp.status ==403){ //Wrong password HTTP code
            err.innerHTML="Wrong password"

        }
        else if(resp.status ==401){//Unauthorized HTTP code
            err.innerHTML=`Username ${loginUser.value} does not exist. Go to register
            to create a user account`
        }
    
    })
});
