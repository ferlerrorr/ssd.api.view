
 let em = document.getElementById('apiemail');
 let ps = document.getElementById('apipassword');
 let apitoken = $("#apitoken");

 
function generate(){

    let email = em.value;
    let password = ps.value;
   
    var url = "http://127.0.0.1:8000/api/auth/login";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          data = (xhr.responseText);
          localStorage.setItem ("apitoken",data)
          setText();

      }};

    var data = `{
      "email":"${email}",
      "password":"${password}"
    }`;

    xhr.send(data);
}

function setText(){
  let data = localStorage.getItem("apitoken");
  var firstKey = JSON.parse(data);
  let dtt = (firstKey.access_token).toString();
  apitoken.val(dtt);
  // console.log(dtt);
  // apitoken.innerText = dtt;
  
}


