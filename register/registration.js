
let nameinput = document.getElementById('name');
let emailinput = document.getElementById('email');
let passwordinput = document.getElementById('password');
let repasswordinput = document.getElementById('password_confirmation');



async function register(){
let name = nameinput.value
let email = emailinput.value
let password = passwordinput.value
let password_confirmation = repasswordinput.value


let headersList = {
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify({
     "name":name,
     "email":email,
     "password":password,
     "password_confirmation":password_confirmation
   });
   
   let response = await fetch("http://127.0.0.1:8000/api/auth/register", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.text();
   localStorage.setItem("response",data)
   setText();
}


function setText(){
    let res = document.getElementById('res');
    let res1 = document.getElementById('res1');
    let res2 = document.getElementById('res2');
    data = localStorage.getItem("response");
    json = JSON.parse(data);
    resdata = json;

    var myArray = [];
    for(var i = 0, len = json.length; i < len; i++){
      myArray.push(json[i][0]+"\n");
    }



    if(myArray[0] == undefined){
      res.classList.remove("actv");
    }else{
      res.classList.add("actv");
      res.innerText = myArray[0];
    }

    if(myArray[1] == undefined){
      res1.classList.remove("actv");
    }else{
      res1.classList.add("actv");
      res1.innerText = myArray[0];
    }


    if(myArray[2] == undefined){
      res2.classList.remove("actv");
    }else{
      res2.classList.add("actv");
      res2.innerText = myArray[2];}
    
}